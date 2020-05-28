import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage,
} from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-model-upload',
  templateUrl: './model-upload.component.html',
  styleUrls: ['./model-upload.component.scss'],
})
export class ModelUploadComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private afStorage: AngularFireStorage) {}

  ngOnInit(): void {}
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map((s) => s.state));
    this.uploadProgress = this.task.percentageChanges();
  }
}
