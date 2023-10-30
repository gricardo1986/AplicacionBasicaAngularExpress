import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, filter, switchMap, catchError, of } from 'rxjs';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})

export class FormDestinoViajeComponent implements OnInit {
  fg:FormGroup;
  minLonguitud:number = 3;
  @Output() onItemAdded_FromForm:EventEmitter<DestinoViaje>;
  searchResults: string[] = [];
  http: HttpClient;

  constructor(fb:FormBuilder, http: HttpClient,
      @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.fg = fb.group({
      nombre: ['Algún lugar',
        Validators.compose([
          Validators.required,
          this.nombreValidatorSimple,
          this.nombreValidatorParametrizable(this.minLonguitud)
        ])
      ],
      imageUrl: ['https://wallpaperforu.com/wp-content/uploads/2021/04/Wallpaper-Building-Anime-City-1920x1080px-1080p-Free-D8.jpg']
    });
    this.http = http;
    this.onItemAdded_FromForm = new EventEmitter();
    // Esto es un OBSERVABLE
    // this.fg.valueChanges.subscribe((form: any) => { console.log('Cambio el formulario: ', form); });
  }
  ngOnInit(): void {
    // Tomar instancia HTML de un elemento
    const elemNom:HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('nombre');
    fromEvent<HTMLIFrameElement>(elemNom, 'input')
      .pipe(
        // Para cada ElemNom, se leeran los eventos de tecleado
        map((e:any): string =>
          // Por cada evento de tecleado devolvera el valor del TAG-HTML
          // Se interpreta como un Return
          (e.target as HTMLInputElement).value),
        // Filter resive el resultado de Map
        filter((text:string):boolean => text.length >= 4),
        // Lo anterior los revise cada Milisegundos
        debounceTime(200 /*Milisegundos*/),
        // Valida que solo analize el string si hay cambios
        distinctUntilChanged(),
        // Se consultaria un webservice o archivo local
        // switchMap(() => Ajax('/assets/datos.json'))
         switchMap((s:string):any => {
          // return this.http.get('/assets/datos.json', {responseType:'json'})
          return this.http
            .get(this.config.apiEndPoint + '/ciudades?q=' + s, {responseType:'json'})
            .pipe(
              map((res:any): any => {
                let rcc: any = [];
                Object.keys(res).map((key:string):void => {
                  rcc.push(res[key]);
                });
                return rcc.reduce((r: any, v: string, i: number) => {
                  if(v.toLocaleUpperCase().includes(s.toLocaleUpperCase())){
                    r.push(v);
                  }
                  return r;
                }, []);
              }),
              catchError((err:string) => {
                throw err;
              }));
        }),
        catchError((err:string) => {
          console.error('ERROR: ', err);
          return of(null);
        })
      ).subscribe((res:any) => {
        console.log('DATOS: ', res);
        this.searchResults = res;
      });
  }
  guardar(n:string, u:string):boolean {
    let d = new DestinoViaje(n, u);
    this.onItemAdded_FromForm.emit(d);
    return false;
  }
  nombreValidatorSimple(control: FormControl): { [s: string]: boolean } | null {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      // Codigo de Error: boolean
      return { invalidNombre: true };
    }
    return null;
  }
  nombreValidatorParametrizable(minLong:number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        // Codigo de Error: boolean
        return { minLongNombre: true };
      }
      return null;
    };
  }

}
