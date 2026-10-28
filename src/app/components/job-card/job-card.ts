import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStage, JobPosting } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.html'
})
export class JobCardComponent {
  public jobService = inject(JobService);

  @Input({ required: true }) job!: JobPosting;
  @Output() viewDetails = new EventEmitter<JobPosting>();

  public getApplicationStage(): ApplicationStage | null {
    const item = this.jobService.applications().find((a) => a.jobId === this.job.id);
    return item ? item.stage : null;
  }

  public toggleWishlist(e: Event) {
    e.stopPropagation();
    const current = this.getApplicationStage();
    if (current) {
      const item = this.jobService.applications().find((a) => a.jobId === this.job.id);
      if (item) this.jobService.removeApplication(item.id);
    } else {
      this.jobService.setJobApplicationStage(this.job, 'Wishlist');
    }
  }

  public setStage(stage: ApplicationStage, e: Event) {
    e.stopPropagation();
    this.jobService.setJobApplicationStage(this.job, stage);
  }

  public getScoreBadgeColor(score: number): { bg: string; text: string; border: string } {
    if (score >= 85) {
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    }
    if (score >= 70) {
      return { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' };
    }
    if (score >= 50) {
      return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' };
    }
    return { bg: 'bg-slate-700/20', text: 'text-slate-400', border: 'border-slate-700' };
  }
}
