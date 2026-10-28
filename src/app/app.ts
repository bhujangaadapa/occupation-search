import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPosting } from './models/job.model';
import { JobService } from './services/job.service';
import { NavbarComponent } from './components/navbar/navbar';
import { JobCardComponent } from './components/job-card/job-card';
import { JobDetailModalComponent } from './components/job-detail-modal/job-detail-modal';
import { SkillsProfileComponent } from './components/skills-profile/skills-profile';
import { CustomJobAnalyzerComponent } from './components/custom-job-analyzer/custom-job-analyzer';
import { ApplicationsTrackerComponent } from './components/applications-tracker/applications-tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    JobCardComponent,
    JobDetailModalComponent,
    SkillsProfileComponent,
    CustomJobAnalyzerComponent,
    ApplicationsTrackerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public jobService = inject(JobService);

  public currentView: 'jobs' | 'skills' | 'analyzer' | 'applications' = 'jobs';
  public selectedJobForModal: JobPosting | null = null;

  // Categories & Quick Skill Filter Tags
  public categories: string[] = [
    'All',
    'Crash & LS-DYNA',
    'AI + Simulation',
    'OMSA Analytics & Optimization',
    'Data Science & ML'
  ];

  public quickSkillTags: string[] = [
    'LS-DYNA',
    'Crash Safety',
    'OMSA',
    'AI',
    'PyTorch',
    'Python',
    'Optimization',
    'HyperMesh',
    'HPC'
  ];

  public toggleSkillTag(tag: string) {
    const current = this.jobService.selectedSkillTags();
    if (current.includes(tag)) {
      this.jobService.selectedSkillTags.set(current.filter((t) => t !== tag));
    } else {
      this.jobService.selectedSkillTags.set([...current, tag]);
    }
  }

  public isSkillTagSelected(tag: string): boolean {
    return this.jobService.selectedSkillTags().includes(tag);
  }

  public openJobModal(job: JobPosting) {
    this.selectedJobForModal = job;
  }

  public closeJobModal() {
    this.selectedJobForModal = null;
  }
}
