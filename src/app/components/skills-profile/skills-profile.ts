import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { UserSkillProficiency } from '../../models/job.model';

@Component({
  selector: 'app-skills-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills-profile.html'
})
export class SkillsProfileComponent {
  public jobService = inject(JobService);

  public newSkillName = '';
  public newSkillCategory: UserSkillProficiency['category'] = 'ls_dyna';

  public setLevel(skillId: string, level: number) {
    this.jobService.updateSkillLevel(skillId, level);
  }

  public getCategorySkills(category: UserSkillProficiency['category']): UserSkillProficiency[] {
    return this.jobService.userSkills().filter((s) => s.category === category);
  }

  public getLevelLabel(level: number): string {
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      case 4:
        return 'Expert';
      default:
        return 'Intermediate';
    }
  }

  public getCategoryLabel(category: string): string {
    switch (category) {
      case 'ls_dyna':
        return 'LS-DYNA & Explicit Non-Linear Dynamics';
      case 'crash_safety':
        return 'Crashworthiness & Vehicle Safety Standards';
      case 'omsa_analytics':
        return 'Georgia Tech OMSA & Operations Research';
      case 'ai_ml':
        return 'AI, Deep Learning & Physics Surrogates (PINNs)';
      case 'engineering_tools':
        return 'CAE Tooling, Meshing & HPC Computing';
      default:
        return category;
    }
  }

  public addCustomSkill() {
    if (!this.newSkillName.trim()) return;
    const current = this.jobService.userSkills();
    const id = 'skill-' + Date.now();
    const updated: UserSkillProficiency[] = [
      ...current,
      {
        skillId: id,
        name: this.newSkillName.trim(),
        category: this.newSkillCategory,
        level: 3
      }
    ];
    this.jobService.saveUserSkills(updated);
    this.newSkillName = '';
  }

  public removeSkill(skillId: string) {
    const current = this.jobService.userSkills();
    const updated = current.filter((s) => s.skillId !== skillId);
    this.jobService.saveUserSkills(updated);
  }
}
