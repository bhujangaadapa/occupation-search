import { Injectable, signal } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ApplicationTrackerItem, FirebaseConfigOptions, JobPosting } from '../models/job.model';

const STORAGE_KEY_FIREBASE_CONFIG = 'occupation_search_firebase_config';
const STORAGE_KEY_APPLICATIONS = 'occupation_search_local_apps';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;

  public isConnected = signal<boolean>(false);
  public isUsingLocalMode = signal<boolean>(true);
  public currentConfig = signal<FirebaseConfigOptions | null>(null);
  public statusMessage = signal<string>('Operating in Local Mode (Ready to link Firebase)');

  constructor() {
    this.loadSavedConfig();
  }

  private loadSavedConfig() {
    try {
      const savedConfig = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
      if (savedConfig) {
        const config: FirebaseConfigOptions = JSON.parse(savedConfig);
        this.currentConfig.set(config);
        this.initFirebase(config);
      } else {
        this.isUsingLocalMode.set(true);
        this.isConnected.set(false);
      }
    } catch (err) {
      console.warn('Failed to parse saved Firebase config, using local mode:', err);
      this.isUsingLocalMode.set(true);
    }
  }

  public async initFirebase(config: FirebaseConfigOptions): Promise<{ success: boolean; message: string }> {
    try {
      if (!config.apiKey || !config.projectId) {
        throw new Error('API Key and Project ID are required');
      }

      this.app = initializeApp(config);
      this.db = getFirestore(this.app);

      // Verify connection by attempting to read or ping collection
      localStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, JSON.stringify(config));
      this.currentConfig.set(config);
      this.isConnected.set(true);
      this.isUsingLocalMode.set(false);
      this.statusMessage.set(`Connected to Firebase project: ${config.projectId}`);

      return { success: true, message: `Successfully connected to Firebase project: ${config.projectId}` };
    } catch (error: any) {
      this.isConnected.set(false);
      this.isUsingLocalMode.set(true);
      this.statusMessage.set(`Firebase connection failed: ${error.message || error}`);
      return { success: false, message: error.message || 'Firebase initialization failed' };
    }
  }

  public disconnectFirebase() {
    localStorage.removeItem(STORAGE_KEY_FIREBASE_CONFIG);
    this.app = null;
    this.db = null;
    this.currentConfig.set(null);
    this.isConnected.set(false);
    this.isUsingLocalMode.set(true);
    this.statusMessage.set('Switched back to Local Mode');
  }

  // Application tracker persistence (Firestore or LocalStorage)
  public async getApplications(): Promise<ApplicationTrackerItem[]> {
    if (this.isConnected() && this.db) {
      try {
        const appsCol = collection(this.db, 'applications');
        const q = query(appsCol, orderBy('updatedAt', 'desc'));
        const snapshot = await getDocs(q);
        const list: ApplicationTrackerItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ApplicationTrackerItem, 'id'>) });
        });
        return list;
      } catch (err) {
        console.warn('Error reading from Firestore, falling back to local storage:', err);
      }
    }

    // Local fallback
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public async saveApplication(item: Omit<ApplicationTrackerItem, 'id'>): Promise<ApplicationTrackerItem> {
    const newItem: ApplicationTrackerItem = {
      ...item,
      id: 'app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      updatedAt: new Date().toISOString()
    };

    if (this.isConnected() && this.db) {
      try {
        const appsCol = collection(this.db, 'applications');
        const docRef = await addDoc(appsCol, {
          ...item,
          updatedAt: Timestamp.now()
        });
        return { ...item, id: docRef.id, updatedAt: new Date().toISOString() };
      } catch (err) {
        console.warn('Firestore write failed, saving locally:', err);
      }
    }

    // Save locally
    const existing = await this.getApplications();
    const updated = [newItem, ...existing.filter((a) => a.jobId !== item.jobId)];
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
    return newItem;
  }

  public async updateApplicationStatus(id: string, stage: ApplicationTrackerItem['stage'], notes?: string): Promise<void> {
    if (this.isConnected() && this.db) {
      try {
        const docRef = doc(this.db, 'applications', id);
        const updates: any = { stage, updatedAt: Timestamp.now() };
        if (notes !== undefined) updates.notes = notes;
        await updateDoc(docRef, updates);
        return;
      } catch (err) {
        console.warn('Firestore update failed, updating locally:', err);
      }
    }

    const existing = await this.getApplications();
    const idx = existing.findIndex((a) => a.id === id);
    if (idx !== -1) {
      existing[idx].stage = stage;
      if (notes !== undefined) existing[idx].notes = notes;
      existing[idx].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(existing));
    }
  }

  public async deleteApplication(id: string): Promise<void> {
    if (this.isConnected() && this.db) {
      try {
        const docRef = doc(this.db, 'applications', id);
        await deleteDoc(docRef);
        return;
      } catch (err) {
        console.warn('Firestore delete failed, updating locally:', err);
      }
    }

    const existing = await this.getApplications();
    const filtered = existing.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(filtered));
  }
}
