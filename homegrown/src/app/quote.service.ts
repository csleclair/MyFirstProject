import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { response } from 'express';

export interface Quote {
  text: string;
}

interface QuotableResponse {
  _id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quotableApiUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

  constructor(private http: HttpClient) {}

getRandomQuote(): Observable<Quote> {
  return this.http.get<QuotableResponse>(this.quotableApiUrl).pipe(
    map(text => ({
      text: text.text
    })),
    catchError(error => {
      console.error('Error fetching quote', error);
      return throwError(() => new Error('Failed to fetch quote'));
    })
  );
}
}
