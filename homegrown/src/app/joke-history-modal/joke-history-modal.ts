import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { JokeService } from '../joke.service';

@Component({
  selector: 'app-joke-history-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './joke-history-modal.html',
  styleUrls: ['./joke-history-modal.scss']
})
export class JokeHistoryModalComponent {
  history$: any;

  constructor(
    public dialogRef: MatDialogRef<JokeHistoryModalComponent>,
    private jokeService: JokeService
  ) {
    this.history$ = this.jokeService.historySignal;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear all joke history?')) {
      this.jokeService.clearHistory();
    }
  }

  formatDate(timestamp: number | undefined): string {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  }
}
