import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { JokeService, Joke } from '../joke.service';
import { Subject, startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-joke-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './joke-modal.html',
  styleUrls: ['./joke-modal.scss']
})
export class JokeModalComponent implements OnInit, OnDestroy {
  private readonly refreshSubject = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  readonly loading$ = this.refreshSubject.pipe(
    startWith(undefined),
    switchMap(() => this.jokeService.loadRandomJoke().pipe(
      map(() => false),
      startWith(true)
    ))
  );

  readonly joke$ = this.refreshSubject.pipe(
    startWith(undefined),
    switchMap(() => this.jokeService.loadRandomJoke().pipe(
      startWith(null as Joke | null)
    ))
  );

  constructor(
    public dialogRef: MatDialogRef<JokeModalComponent>,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.refreshJoke();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.refreshSubject.complete();
  }

  refreshJoke(): void {
    this.refreshSubject.next();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
