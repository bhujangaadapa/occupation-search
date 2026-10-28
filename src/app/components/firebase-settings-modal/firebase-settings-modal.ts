import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseConfigOptions } from '../../models/job.model';

@Component({
  selector: 'app-firebase-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firebase-settings-modal.html'
})
export class FirebaseSettingsModalComponent {
  public firebaseService = inject(FirebaseService);

  @Output() close = new EventEmitter<void>();

  public config: FirebaseConfigOptions = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  };

  public isTesting = false;
  public testResultMessage: string | null = null;
  public testSuccess = false;

  constructor() {
    const current = this.firebaseService.currentConfig();
    if (current) {
      this.config = { ...current };
    }
  }

  public async saveAndConnect() {
    this.isTesting = true;
    this.testResultMessage = null;

    const res = await this.firebaseService.initFirebase(this.config);
    this.isTesting = false;
    this.testSuccess = res.success;
    this.testResultMessage = res.message;

    if (res.success) {
      setTimeout(() => {
        this.close.emit();
      }, 1200);
    }
  }

  public disconnect() {
    this.firebaseService.disconnectFirebase();
    this.config = {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    };
    this.testResultMessage = 'Disconnected. App will now use local browser storage.';
    this.testSuccess = true;
  }

  public loadDemoPreset() {
    this.config = {
      apiKey: 'AIzaSyDemoSampleKeyForOccupationSearch',
      authDomain: 'occupation-search-omsa.firebaseapp.com',
      projectId: 'occupation-search-omsa',
      storageBucket: 'occupation-search-omsa.appspot.com',
      messagingSenderId: '123456789012',
      appId: '1:123456789012:web:abcdef123456789'
    };
  }
}
