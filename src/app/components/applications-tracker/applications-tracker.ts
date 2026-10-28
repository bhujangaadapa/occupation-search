import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationStage, ApplicationTrackerItem, JobPosting } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-applications-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications-tracker.html'
})
export class ApplicationsTrackerComponent {
  public jobService = inject(JobService);
  public firebaseService = inject(FirebaseService);

  @Output() viewJob = new EventEmitter<JobPosting>();

  public stages: ApplicationStage[] = ['Wishlist', 'Applied', 'Interviewing', 'Offer'];

  public getItemsByStage(stage: ApplicationStage): ApplicationTrackerItem[] {
    return this.jobService.applications().filter((a) => a.stage === stage);
  }

  public moveStage(item: ApplicationTrackerItem, stage: ApplicationStage) {
    const job = this.jobService.allJobs().find((j) => j.id === item.jobId);
    if (job) {
      this.jobService.setJobApplicationStage(job, stage, item.notes);
    } else {
      this.firebaseService.updateApplicationStatus(item.id, stage, item.notes);
      this.jobService.refreshApplications();
    }
  }

  public remove(id: string) {
    this.jobService.removeApplication(id);
  }

  public openJob(item: ApplicationTrackerItem) {
    const job = this.jobService.allJobs().find((j) => j.id === item.jobId);
    if (job) {
      this.viewJob.emit(job);
    }
  }
}
