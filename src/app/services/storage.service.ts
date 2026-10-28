import { Injectable } from '@angular/core';
import { ApplicationTrackerItem, JobPosting, UserSkillProficiency } from '../models/job.model';
import { DEFAULT_USER_SKILLS } from '../data/sample-jobs';

const STORAGE_KEY_USER_SKILLS = 'occupation_search_user_skills';
const STORAGE_KEY_APPLICATIONS = 'occupation_search_applications';
const STORAGE_KEY_CUSTOM_JOBS = 'occupation_search_custom_jobs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // User Skills Persistence
  public loadUserSkills(): UserSkillProficiency[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER_SKILLS);
      return data ? JSON.parse(data) : DEFAULT_USER_SKILLS;
    } catch {
      return DEFAULT_USER_SKILLS;
    }
  }

  public saveUserSkills(skills: UserSkillProficiency[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_USER_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.warn('Failed to save user skills to localStorage:', e);
    }
  }

  // Applications Tracker Persistence
  public loadApplications(): ApplicationTrackerItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveApplications(applications: ApplicationTrackerItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.warn('Failed to save applications to localStorage:', e);
    }
  }

  // Custom Analyzed Jobs Persistence
  public loadCustomJobs(): JobPosting[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CUSTOM_JOBS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveCustomJobs(jobs: JobPosting[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_JOBS, JSON.stringify(jobs));
    } catch (e) {
      console.warn('Failed to save custom jobs to localStorage:', e);
    }
  }
}
