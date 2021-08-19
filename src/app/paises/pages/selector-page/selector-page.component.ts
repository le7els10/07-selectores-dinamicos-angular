import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';
import { RegionResponse, BordersResponse } from '../../interfaces/interfaces';

import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  myForm: FormGroup = this._fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  regions: string[] = [];
  countries: RegionResponse[] = [];
  borders: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.regions = this._paisesService.regions;

    //cambie selector
    // this.myForm.get('region')?.valueChanges.subscribe((region) => {
    //   this._paisesService.getCountriesByRegion(region).subscribe((paises) => {
    //     this.countries = paises;
    //   });
    // });

    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.reset('');
        }),
        switchMap((region) => this._paisesService.getCountriesByRegion(region))
      )
      .subscribe((countries) => {
        this.countries = countries;
      });

    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('borders')?.reset('');
        }),
        switchMap((code) => this._paisesService.getBorders(code))
      )
      .subscribe((country) => {
        this.borders = country?.borders || [];
      });
  }

  save = () => {
    console.log(this.myForm.value);
  };
}
