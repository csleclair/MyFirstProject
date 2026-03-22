import { Component, inject, signal, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { JokeModalComponent } from './joke-modal/joke-modal';
import { JokeHistoryModalComponent } from './joke-history-modal/joke-history-modal';
import { QuoteService, Quote } from './quote.service';

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: string;
}

interface ChartData {
  month: string;
  value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule]
})
export class App implements OnInit {
  private dialog = inject(MatDialog);
  private quoteService = inject(QuoteService);
  
  quote = signal<Quote | null>(null);

  ngOnInit(): void {
    this.loadQuote();
  }

  private loadQuote(): void {
    this.quoteService.getRandomQuote().subscribe({
      next: (quote) => {
        console.log('Quote loaded:', quote);
        this.quote.set(quote);
      },
      error: (error) => {
        console.error('Failed to fetch quote:', error);
      }
    });
  }

  metrics: Metric[] = [
    { label: 'Total Requests', value: '2.4M', change: '+12.5%', icon: 'trending_up' },
    { label: 'Active Users', value: '847K', change: '+8.2%', icon: 'people' },
    { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', icon: 'insights' },
    { label: 'Avg Response Time', value: '234ms', change: '-5.3%', icon: 'speed' }
  ];

  chartData: ChartData[] = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 92 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 155 }
  ];

  openJokeModal(): void {
    this.dialog.open(JokeModalComponent, {
      width: '650px',
      maxHeight: '85vh',
      panelClass: 'analytics-modal',
      backdropClass: 'analytics-modal-backdrop',
      ariaLabel: 'Performance insights report'
    });
  }

  openHistoryModal(): void {
    this.dialog.open(JokeHistoryModalComponent, {
      width: '750px',
      maxHeight: '85vh',
      panelClass: 'analytics-modal',
      backdropClass: 'analytics-modal-backdrop',
      ariaLabel: 'Joke history'
    });
  }
}
