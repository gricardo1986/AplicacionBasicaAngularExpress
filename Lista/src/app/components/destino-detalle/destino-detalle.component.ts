import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { FeatureDnsVs } from 'src/app/models/destinos-viajes-state.model';
import { Injectable } from '@angular/core';

/*
@Injectable({
  providedIn: 'root'
})
export class OTRO_DestinosApiClient {
  private destinos:DestinoViaje[] = [];
  constructor(private store: Store<FeatureDnsVs>) { }
  add(d: DestinoViaje): void {
  }
  elegir(d: DestinoViaje): void {
  }
  getById(id: string): DestinoViaje {
      return new DestinoViaje('Por Get By ID de OTRA CLASE', id);
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClientDecoreated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<FeatureDnsVs>) {
    super(store);
  }
  override getById(id: string): DestinoViaje {
    console.log('Llamado por clase decorada!');
    console.log('Config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}
*/

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.scss'],
  providers: [
    DestinosApiClient
    // * Funciona, pero se reemplazo por el avance del curso
    // { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    // { provide: DestinosApiClient, useClass: DestinosApiClientDecoreated },
    // { provide: OTRO_DestinosApiClient, useExisting: DestinosApiClient }
  ]
})
export class DestinoDetalleComponent implements OnInit {

  destino:DestinoViaje = new DestinoViaje('', '');
  stilo:any = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };  

  constructor(
    private route: ActivatedRoute,
    private destinosApiClient: DestinosApiClient) { }
    // private destinosApiClient: OTRO_DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.destino = this.destinosApiClient.getById(id);
  }

}
