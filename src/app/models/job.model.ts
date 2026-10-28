export interface Skill {
  id: string;
  name: string;
  category: 'crash_safety' | 'ls_dyna' | 'omsa_analytics' | 'ai_ml' | 'engineering_tools';
  weight: number; // importance weight 1-5
}

export interface UserSkillProficiency {
  skillId: string;
  name: string;
  category: 'crash_safety' | 'ls_dyna' | 'omsa_analytics' | 'ai_ml' | 'engineering_tools';
  level: number; // 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  experienceLevel: 'Entry' | 'Mid-Level' | 'Senior' | 'Staff/Principal';
  salaryRange: string;
  postedDate: string;
  applyUrl: string;
  category: 'Crash & LS-DYNA' | 'AI + Simulation' | 'OMSA Analytics & Optimization' | 'Data Science & ML';
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  hybridAdvantage: string; // Strategic pitch on why LS-DYNA + OMSA + AI is a killer combo for this job
  logoUrl?: string;
  matchScore?: number; // Calculated dynamically
  matchedSkills?: string[];
  missingSkills?: string[];
  resumeTalkingPoints?: string[];
}

export type ApplicationStage = 'Wishlist' | 'Applied' | 'Interviewing' | 'Offer' | 'Archived';

export interface ApplicationTrackerItem {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  stage: ApplicationStage;
  appliedDate?: string;
  notes?: string;
  salary?: string;
  matchScore: number;
  updatedAt: string;
}

export interface FirebaseConfigOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
