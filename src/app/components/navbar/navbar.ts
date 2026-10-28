import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  public jobService = inject(JobService);

  @Output() viewChange = new EventEmitter<'jobs' | 'skills' | 'analyzer' | 'applications'>();

  public currentView: 'jobs' | 'skills' | 'analyzer' | 'applications' = 'jobs';

  public selectView(view: 'jobs' | 'skills' | 'analyzer' | 'applications') {
    this.currentView = view;
    this.viewChange.emit(view);
  }
}
