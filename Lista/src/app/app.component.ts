import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import Dexie from 'dexie';
import { flatMap, from, Observable } from 'rxjs';
import { APP_CONFIG_VALUE } from './app.module';
import { DestinoViaje } from './models/destino-viaje.model';







export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>|any;
  translations: Dexie.Table<Translation, number>|any;
  constructor () {
    super('MyDataBase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });
    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lang, key, value'
    });
  }
}

export const db = new MyDataBase();

export class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then((results:any) => {
        if(results.length === 0) {
          return this.http
          .get<Translation[]>(APP_CONFIG_VALUE.apiEndPoint + '/api/translation?lang=' + lang)
          .toPromise()
          .then(apiResults => {
            db.translations.bulkAdd(apiResults);
            return apiResults;
          });
        }
        return results;
      }).then((traducciones:any) => {
        console.log('traducciones cargadas: ');
        console.log(traducciones);
        return traducciones;
      }).then((traducciones:any) => {
        return traducciones.map((t:any) => ({ [t.key]: [t.value] }));
      });
    return from(promise).pipe(flatMap((elems:any) => from(elems)));
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}








@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lista de deseos';
  tiempo = new Observable(observador => {
    setInterval(() => {
      observador.next((new Date).toString());
    }, 1000);
  });

  constructor(public translate: TranslateService) {
    console.log('*************** Get Translation');
    translate.getTranslation('en').subscribe(x => console.log('x: ' + JSON.stringify(x)));
    translate.setDefaultLang('es');
  }
}
