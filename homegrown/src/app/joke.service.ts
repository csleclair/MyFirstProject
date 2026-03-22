import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

export interface Joke {
  id?: number;
  type?: string;
  setup: string;
  punchline: string;
  timestamp?: number;
}

const FALLBACK_JOKE: Joke = {
  setup: 'Why did the network fail?',
  punchline: 'Because it forgot to refresh the cache!'
};

const STORAGE_KEY = 'joke_history';
const MAX_HISTORY = 50;

@Injectable({ providedIn: 'root' })
export class JokeService {
  private _joke = signal<Joke | null>(null);
  private _history = signal<Joke[]>(this.loadHistoryFromStorage());
  
  readonly jokeSignal: Signal<Joke | null> = this._joke.asReadonly();
  readonly historySignal: Signal<Joke[]> = this._history.asReadonly();

  constructor(private http: HttpClient) {}

  loadRandomJoke(): Observable<Joke> {
    const url = 'https://official-joke-api.appspot.com/jokes/random';

    return this.http.get<Joke>(url).pipe(
      tap((joke: Joke) => {
        joke.timestamp = Date.now();
        this._joke.set(joke);
        this.addToHistory(joke);
      }),
      catchError((error) => {
        console.error('JokeService: API fetch failed, using fallback', error);
        const fallback = { ...FALLBACK_JOKE, timestamp: Date.now() };
        this._joke.set(fallback);
        this.addToHistory(fallback);
        return of(fallback);
      })
    );
  }

  refreshJoke(): void {
    this.loadRandomJoke().subscribe();
  }

  clearJoke(): void {
    this._joke.set(null);
  }

  private addToHistory(joke: Joke): void {
    const currentHistory = this._history();
    const updated = [joke, ...currentHistory].slice(0, MAX_HISTORY);
    this._history.set(updated);
    this.saveHistoryToStorage(updated);
  }

  private loadHistoryFromStorage(): Joke[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveHistoryToStorage(history: Joke[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      console.warn('Failed to save joke history to localStorage');
    }
  }

  clearHistory(): void {
    this._history.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }
}
