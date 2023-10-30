import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import Dexie from 'dexie';

import { AppComponent, HttpLoaderFactory } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinosViajesEffects, intializeDnsVsState, DnsVsReducers, FeatureDnsVs, InitMyDataAction } from './models/destinos-viajes-state.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinoViaje } from './models/destino-viaje.model';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspiameDirective } from './directivas/espiame.directive';
import { TrackearClickDirective } from './directivas/trackear-click.directive';

@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinos: any|Dexie.Table<DestinoViaje, number>;
  constructor () {
    super('MyDataBase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });
  }
}
export const db = new MyDataBase();






export interface AppConfig {
  apiEndPoint: string;
}
export const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');



export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
export class AppLoadService {
  constructor(private store: Store<FeatureDnsVs>, private http: HttpClient) {}
  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}



@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgRxStoreModule.forRoot(DnsVsReducers, {
      initialState: {
        destinos: intializeDnsVsState()
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10, // numero de cambios de estado que deben conservarse
    }),
    ReservasModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app,
      deps: [ AppLoadService ], multi: true },

    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },

    MyDataBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
