import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegionResponse, BordersResponse } from '../interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _baseUrl = 'https://restcountries.eu/rest/v2';

  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions() {
    return [...this._regions];
  }

  constructor(private _http: HttpClient) {}

  getCountriesByRegion = (region: string) => {
    return this._http.get<RegionResponse[]>(
      `${this._baseUrl}/region/${region}?fields=alpha3Code;name`
    );
  };

  getBorders = (code: string) => {
    if (!code) {
      return of(null);
    }
    return this._http.get<BordersResponse>(`${this._baseUrl}/alpha/${code}`);
  };
}
