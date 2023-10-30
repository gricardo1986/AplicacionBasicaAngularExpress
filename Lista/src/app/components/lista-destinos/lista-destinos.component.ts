import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureDnsVs } from 'src/app/models/destinos-viajes-state.model';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  // @Output() onItemAdded_FromList:EventEmitter<DestinoViaje>;
  // lista:string[] = ['México', 'España', 'Argentina', 'Brazil'];
  // destinos:DestinoViaje[] = [];
  // destinosApiClient:DestinosApiClient;
  updates:string[] = [];
  all:DestinoViaje[] = [];
  constructor(
    private store: Store<FeatureDnsVs>,
    private destinosApiClient: DestinosApiClient) {

    this.store.select((state:any) => state.destinos.favorito)
      .subscribe((d:DestinoViaje|null) => {
        if (d != null && d.isSelected()) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
    this.store.select(state => state.destinos.items)
      .subscribe(items => {
        this.all = items;
      });
    // this.destinosApiClient = new DestinosApiClient(store);
    // *** this.onItemAdded_FromList = new EventEmitter();
    /* this.destinosApiClient.suscribeOnChange((d: DestinoViaje) => { if (d != null) { this.updates.push('Se ha elegido a ' + d.nombre); } }); */
  }
  ngOnInit(): void {
  }
  // agregado(n:string,u:string):boolean {
  agregado(d:DestinoViaje):void {
    this.destinosApiClient.add(d);
    // this.onItemAdded_FromList.emit(d);
    // this.destinos.push(d);
    // return false;
  }
  elegido(d:DestinoViaje): void {
    this.destinosApiClient.elegir(d);
    /* this.destinosApiClient.getAll().forEach(x => { x.setSelected(false); }); */
    /* this.destinos.forEach(x => { x.setSelected(false); }); */
    // d.setSelected(true);
  }
}
