import { Injectable, computed, inject, signal } from '@angular/core';
import { ApplicationStage, ApplicationTrackerItem, JobPosting, UserSkillProficiency } from '../models/job.model';
import { DEFAULT_USER_SKILLS, SAMPLE_JOBS } from '../data/sample-jobs';
import { FirebaseService } from './firebase.service';

const STORAGE_KEY_USER_SKILLS = 'occupation_search_user_skills';
const STORAGE_KEY_CUSTOM_JOBS = 'occupation_search_custom_jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private firebaseService = inject(FirebaseService);

  // User Skills
  public userSkills = signal<UserSkillProficiency[]>(this.loadUserSkills());

  // Jobs
  public allJobs = signal<JobPosting[]>(this.loadInitialJobs());

  // Active Filters
  public searchQuery = signal<string>('');
  public selectedCategory = signal<string>('All');
  public selectedWorkplace = signal<string>('All');
  public selectedExperience = signal<string>('All');
  public minMatchScore = signal<number>(0);
  public selectedSkillTags = signal<string[]>([]);
  public sortBy = signal<'match' | 'salary' | 'recent'>('match');

  // Applications
  public applications = signal<ApplicationTrackerItem[]>([]);
  public selectedJob = signal<JobPosting | null>(null);

  constructor() {
    this.refreshApplications();
  }

  private loadUserSkills(): UserSkillProficiency[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER_SKILLS);
      return saved ? JSON.parse(saved) : DEFAULT_USER_SKILLS;
    } catch {
      return DEFAULT_USER_SKILLS;
    }
  }

  public saveUserSkills(skills: UserSkillProficiency[]) {
    this.userSkills.set(skills);
    try {
      localStorage.setItem(STORAGE_KEY_USER_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
  }

  public updateSkillLevel(skillId: string, level: number) {
    const updated = this.userSkills().map((s) => (s.skillId === skillId ? { ...s, level } : s));
    this.saveUserSkills(updated);
  }

  private loadInitialJobs(): JobPosting[] {
    let customJobs: JobPosting[] = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_JOBS);
      if (saved) customJobs = JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [...customJobs, ...SAMPLE_JOBS];
  }

  public async refreshApplications() {
    const apps = await this.firebaseService.getApplications();
    this.applications.set(apps);
  }

  // Calculate Match Score for a job given current user skills
  public calculateJobMatch(job: JobPosting, userSkillsList: UserSkillProficiency[]): {
    score: number;
    matched: string[];
    missing: string[];
  } {
    const userSkillMap = new Map<string, number>();
    for (const s of userSkillsList) {
      userSkillMap.set(s.name.toLowerCase(), s.level);
    }

    const matched: string[] = [];
    const missing: string[] = [];

    let totalWeight = 0;
    let earnedWeight = 0;

    // Evaluate required skills (weight = 3 each)
    for (const req of job.requiredSkills) {
      totalWeight += 3;
      const userLevel = this.findMatchingUserLevel(req, userSkillMap);
      if (userLevel > 0) {
        matched.push(req);
        // Level 1: 50%, Level 2: 75%, Level 3: 95%, Level 4: 100%
        const multiplier = userLevel === 4 ? 1.0 : userLevel === 3 ? 0.95 : userLevel === 2 ? 0.75 : 0.5;
        earnedWeight += 3 * multiplier;
      } else {
        missing.push(req);
      }
    }

    // Evaluate preferred skills (weight = 1.5 each)
    for (const pref of job.preferredSkills) {
      totalWeight += 1.5;
      const userLevel = this.findMatchingUserLevel(pref, userSkillMap);
      if (userLevel > 0) {
        matched.push(pref);
        const multiplier = userLevel === 4 ? 1.0 : userLevel === 3 ? 0.95 : userLevel === 2 ? 0.75 : 0.5;
        earnedWeight += 1.5 * multiplier;
      } else {
        missing.push(pref);
      }
    }

    // Hybrid Bonus calculation: if user has both LS-DYNA/Crash safety AND OMSA/AI skills
    const hasCrash = userSkillsList.some(
      (s) => (s.category === 'ls_dyna' || s.category === 'crash_safety') && s.level >= 3
    );
    const hasAnalyticsAI = userSkillsList.some(
      (s) => (s.category === 'omsa_analytics' || s.category === 'ai_ml') && s.level >= 3
    );
    let hybridBonus = 0;
    if (hasCrash && hasAnalyticsAI) {
      hybridBonus = 5; // +5% synergy bonus
    }

    const baseScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 70;
    const finalScore = Math.min(100, Math.round(baseScore + hybridBonus));

    return {
      score: Math.max(25, finalScore),
      matched,
      missing
    };
  }

  private findMatchingUserLevel(skillName: string, map: Map<string, number>): number {
    const target = skillName.toLowerCase();
    for (const [key, level] of map.entries()) {
      if (
        key === target ||
        key.includes(target) ||
        target.includes(key) ||
        this.fuzzyMatch(key, target)
      ) {
        return level;
      }
    }
    return 0;
  }

  private fuzzyMatch(a: string, b: string): boolean {
    if (a.includes('ls-dyna') && b.includes('ls-dyna')) return true;
    if (a.includes('crash') && b.includes('crash')) return true;
    if (a.includes('omsa') && b.includes('omsa')) return true;
    if (a.includes('analytics') && (b.includes('statistics') || b.includes('data science') || b.includes('analytics'))) return true;
    if (a.includes('ai') && (b.includes('machine learning') || b.includes('deep learning') || b.includes('ai'))) return true;
    if (a.includes('pytorch') && b.includes('pytorch')) return true;
    if (a.includes('surrogate') && b.includes('surrogate')) return true;
    if (a.includes('hypermesh') && (b.includes('ansa') || b.includes('hypermesh') || b.includes('primer'))) return true;
    if (a.includes('optimization') && b.includes('optimization')) return true;
    return false;
  }

  // Filtered & Scored Jobs computed signal
  public filteredJobs = computed(() => {
    const jobs = this.allJobs();
    const skills = this.userSkills();
    const queryText = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    const workplace = this.selectedWorkplace();
    const experience = this.selectedExperience();
    const minScore = this.minMatchScore();
    const skillTags = this.selectedSkillTags();
    const sort = this.sortBy();

    const scoredJobs: JobPosting[] = jobs.map((job) => {
      const matchResult = this.calculateJobMatch(job, skills);
      return {
        ...job,
        matchScore: matchResult.score,
        matchedSkills: matchResult.matched,
        missingSkills: matchResult.missing
      };
    });

    return scoredJobs
      .filter((job) => {
        // Search text
        if (queryText) {
          const matchTitle = job.title.toLowerCase().includes(queryText);
          const matchCompany = job.company.toLowerCase().includes(queryText);
          const matchLocation = job.location.toLowerCase().includes(queryText);
          const matchDesc = job.description.toLowerCase().includes(queryText);
          const matchSkills = [...job.requiredSkills, ...job.preferredSkills].some((s) =>
            s.toLowerCase().includes(queryText)
          );
          if (!matchTitle && !matchCompany && !matchLocation && !matchDesc && !matchSkills) {
            return false;
          }
        }

        // Category
        if (category !== 'All' && job.category !== category) {
          return false;
        }

        // Workplace
        if (workplace !== 'All' && job.workplaceType !== workplace) {
          return false;
        }

        // Experience
        if (experience !== 'All' && job.experienceLevel !== experience) {
          return false;
        }

        // Min Match Score
        if ((job.matchScore || 0) < minScore) {
          return false;
        }

        // Skill Tags
        if (skillTags.length > 0) {
          const allJobSkills = [...job.requiredSkills, ...job.preferredSkills].map((s) => s.toLowerCase());
          const hasAllTags = skillTags.every((tag) =>
            allJobSkills.some((s) => s.includes(tag.toLowerCase()))
          );
          if (!hasAllTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sort === 'match') {
          return (b.matchScore || 0) - (a.matchScore || 0);
        }
        if (sort === 'salary') {
          return this.extractMaxSalary(b.salaryRange) - this.extractMaxSalary(a.salaryRange);
        }
        // recent
        return 0;
      });
  });

  private extractMaxSalary(range: string): number {
    const matches = range.match(/\$([0-9,]+)/g);
    if (!matches || matches.length === 0) return 0;
    const nums = matches.map((m) => parseInt(m.replace(/[$,]/g, ''), 10));
    return Math.max(...nums);
  }

  // Custom Job Analyzer (User pastes any job posting)
  public analyzeJobText(rawText: string, companyInput?: string, titleInput?: string): JobPosting {
    const textLower = rawText.toLowerCase();

    // Detect skills in pasted text
    const detectedRequired: string[] = [];
    const detectedPreferred: string[] = [];

    const skillKeywords: { skill: string; aliases: string[] }[] = [
      { skill: 'LS-DYNA Explicit FEA', aliases: ['ls-dyna', 'lsdyna', 'dyna', 'explicit dynamic', 'explicit fea'] },
      { skill: 'Crash Safety & FMVSS/NCAP', aliases: ['crash', 'fmvss', 'ncap', 'passive safety', 'crashworthiness', 'impact safety'] },
      { skill: 'Nonlinear Finite Element Analysis', aliases: ['nonlinear fea', 'non-linear finite element', 'structural non-linear'] },
      { skill: 'OMSA / Applied Statistics & Modeling', aliases: ['omsa', 'analytics', 'statistics', 'operations research', 'predictive modeling'] },
      { skill: 'Machine Learning & Deep Learning', aliases: ['machine learning', 'deep learning', 'ml', 'neural networks', 'transformers', 'ai'] },
      { skill: 'Physics-Informed ML & Surrogate Modeling', aliases: ['surrogate', 'pinn', 'physics-informed', 'reduced order model', 'rom', 'geometric deep learning'] },
      { skill: 'PyTorch / Neural Networks', aliases: ['pytorch', 'tensorflow', 'keras'] },
      { skill: 'Python & Data Analysis (NumPy/Pandas)', aliases: ['python', 'pandas', 'numpy', 'scipy', 'scikit-learn'] },
      { skill: 'Mathematical Optimization & Simulation', aliases: ['optimization', 'gurobi', 'doe', 'design of experiments', 'mdo', 'monte carlo'] },
      { skill: 'HyperMesh / ANSA / Primer / D3PLOT', aliases: ['hypermesh', 'ansa', 'primer', 'd3plot', 'metapost', 'altair'] },
      { skill: 'HPC & Linux Shell Scripting', aliases: ['linux', 'hpc', 'bash', 'slurm', 'high performance computing', 'cluster'] },
      { skill: 'ATD Occupant Safety & Biomechanics', aliases: ['atd', 'dummy', 'occupant', 'injury', 'hic', 'biomechanics', 'thor', 'hybird iii'] },
    ];

    for (const item of skillKeywords) {
      if (item.aliases.some((alias) => textLower.includes(alias))) {
        if (detectedRequired.length < 5) {
          detectedRequired.push(item.skill);
        } else {
          detectedPreferred.push(item.skill);
        }
      }
    }

    if (detectedRequired.length === 0) {
      detectedRequired.push('Python & Data Analysis (NumPy/Pandas)', 'Machine Learning & Deep Learning');
    }

    // Determine category
    let category: JobPosting['category'] = 'Crash & LS-DYNA';
    if (textLower.includes('surrogate') || (textLower.includes('pinn') || (textLower.includes('ai') && textLower.includes('simulation')))) {
      category = 'AI + Simulation';
    } else if (textLower.includes('omsa') || textLower.includes('optimization') || textLower.includes('operations research')) {
      category = 'OMSA Analytics & Optimization';
    } else if (textLower.includes('machine learning') && !textLower.includes('dyna') && !textLower.includes('crash')) {
      category = 'Data Science & ML';
    }

    const company = companyInput?.trim() || this.extractCompany(rawText) || 'Target Employer';
    const title = titleInput?.trim() || this.extractTitle(rawText) || 'Engineering Specialist';

    const newJob: JobPosting = {
      id: 'custom-' + Date.now(),
      title,
      company,
      location: 'Identified from Description',
      workplaceType: textLower.includes('remote') ? 'Remote' : textLower.includes('hybrid') ? 'Hybrid' : 'On-site',
      experienceLevel: textLower.includes('principal') || textLower.includes('staff') ? 'Staff/Principal' : textLower.includes('senior') ? 'Senior' : 'Mid-Level',
      salaryRange: '$140,000 - $195,000 (Estimated)',
      postedDate: 'Custom Analyzed',
      applyUrl: '#',
      category,
      description: rawText.slice(0, 500) + '...',
      responsibilities: [
        'Apply high-fidelity analytical modeling and simulation to key engineering challenges.',
        'Collaborate across cross-functional teams to integrate physical test data and predictive models.',
        'Deliver robust technical insights and recommendations to accelerate product cycle.'
      ],
      requiredSkills: detectedRequired,
      preferredSkills: detectedPreferred.length > 0 ? detectedPreferred : ['Python & Data Analysis (NumPy/Pandas)'],
      hybridAdvantage: 'Leverage your rare combination of LS-DYNA non-linear physics expertise and Georgia Tech OMSA data analytics to outshine candidates who only know one side.',
      resumeTalkingPoints: [
        `Explicitly highlight your work with ${detectedRequired.slice(0, 2).join(' and ')} on your resume header.`,
        'Demonstrate how your OMSA analytics background bridges simulation data pipelines with predictive modeling.',
        'Quantify past project impact (e.g. simulation runtime reduction, crash correlation accuracy improvement).'
      ]
    };

    return newJob;
  }

  private extractCompany(text: string): string | null {
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    for (let i = 0; i < Math.min(lines.length, 5); i++) {
      if (lines[i].toLowerCase().includes('company:') || lines[i].toLowerCase().includes('employer:')) {
        return lines[i].replace(/company:|employer:/i, '').trim();
      }
    }
    return null;
  }

  private extractTitle(text: string): string | null {
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length > 0 && lines[0].length < 70) {
      return lines[0];
    }
    return null;
  }

  public saveCustomJob(job: JobPosting) {
    const current = this.allJobs();
    const updated = [job, ...current];
    this.allJobs.set(updated);

    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_JOBS);
      const customList = saved ? JSON.parse(saved) : [];
      customList.unshift(job);
      localStorage.setItem(STORAGE_KEY_CUSTOM_JOBS, JSON.stringify(customList));
    } catch (e) {
      console.warn(e);
    }
  }

  // Application tracker operations
  public async setJobApplicationStage(job: JobPosting, stage: ApplicationStage, notes?: string) {
    const match = this.calculateJobMatch(job, this.userSkills());
    const existing = this.applications().find((a) => a.jobId === job.id);

    if (existing) {
      await this.firebaseService.updateApplicationStatus(existing.id, stage, notes);
    } else {
      await this.firebaseService.saveApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        stage,
        matchScore: match.score,
        notes: notes || '',
        salary: job.salaryRange,
        updatedAt: new Date().toISOString()
      });
    }

    await this.refreshApplications();
  }

  public async removeApplication(id: string) {
    await this.firebaseService.deleteApplication(id);
    await this.refreshApplications();
  }
}
