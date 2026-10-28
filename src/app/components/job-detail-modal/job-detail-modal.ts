import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationStage, JobPosting } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-detail-modal.html'
})
export class JobDetailModalComponent {
  public jobService = inject(JobService);

  @Input({ required: true }) job!: JobPosting;
  @Output() close = new EventEmitter<void>();

  public activeTab: 'overview' | 'match_analysis' | 'talking_points' | 'tracker' = 'overview';
  public userNotes = '';
  public copiedIndex: number | null = null;

  public stages: ApplicationStage[] = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Archived'];

  public get currentApplication() {
    return this.jobService.applications().find((a) => a.jobId === this.job.id);
  }

  constructor() {
    // initialize user notes if exists
    setTimeout(() => {
      const app = this.currentApplication;
      if (app && app.notes) {
        this.userNotes = app.notes;
      }
    }, 0);
  }

  public setStage(stage: ApplicationStage) {
    this.jobService.setJobApplicationStage(this.job, stage, this.userNotes);
  }

  public saveNotes() {
    const stage = this.currentApplication ? this.currentApplication.stage : 'Wishlist';
    this.jobService.setJobApplicationStage(this.job, stage, this.userNotes);
  }

  public copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text);
    this.copiedIndex = index;
    setTimeout(() => {
      this.copiedIndex = null;
    }, 2000);
  }
}
