import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { JobPosting } from '../../models/job.model';

@Component({
  selector: 'app-custom-job-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-job-analyzer.html'
})
export class CustomJobAnalyzerComponent {
  public jobService = inject(JobService);

  @Output() viewSavedJob = new EventEmitter<JobPosting>();

  public rawJobText = '';
  public companyInput = '';
  public titleInput = '';

  public analyzedJob: JobPosting | null = null;
  public isAnalyzing = false;
  public savedNotification = false;

  public sampleJD = `Senior Safety CAE Engineer - Crash Simulation & Data Analytics
Company: Zoox / Amazon
Location: Foster City, CA (Hybrid)

Responsibilities:
- Perform full vehicle dynamic crash simulations using LS-DYNA to meet FMVSS and US-NCAP safety targets.
- Develop Python analytics pipelines for processing crash pulses, barrier intrusion, and accelerometer time-series.
- Apply machine learning and optimization algorithms to automate CAE mesh morphing and surrogate impact predictions.
- Integrate Anthropomorphic Test Devices (ATD dummies: THOR, Hybrid III) to evaluate passenger kinematics.

Requirements:
- Strong experience with LS-DYNA explicit solver, HyperMesh/ANSA, and non-linear dynamic FEA.
- Master's in Analytics, Data Science (such as Georgia Tech OMSA), Mechanical Engineering, or related field.
- Proficiency in Python, Pandas, PyTorch or Scikit-learn for engineering data analysis.`;

  public loadSampleJD() {
    this.rawJobText = this.sampleJD;
    this.companyInput = 'Zoox';
    this.titleInput = 'Senior Safety CAE Engineer - Crash Simulation';
    this.analyze();
  }

  public analyze() {
    if (!this.rawJobText.trim()) return;
    this.isAnalyzing = true;
    this.savedNotification = false;

    setTimeout(() => {
      const parsed = this.jobService.analyzeJobText(this.rawJobText, this.companyInput, this.titleInput);
      const match = this.jobService.calculateJobMatch(parsed, this.jobService.userSkills());
      this.analyzedJob = {
        ...parsed,
        matchScore: match.score,
        matchedSkills: match.matched,
        missingSkills: match.missing
      };
      this.isAnalyzing = false;
    }, 400);
  }

  public saveToMyJobs() {
    if (!this.analyzedJob) return;
    this.jobService.saveCustomJob(this.analyzedJob);
    this.savedNotification = true;
    setTimeout(() => {
      this.savedNotification = false;
    }, 3000);
  }
}
