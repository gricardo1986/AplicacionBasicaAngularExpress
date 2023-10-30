import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DeleteDestinoAction, FeatureDnsVs, VoteDownAction, VoteReloadAction, VoteUpAction } from 'src/app/models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('2s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() posicion:number = 0;
  @Input() destino:DestinoViaje = new DestinoViaje('', '');
  @Output() onClicked_FromDestinoViaje:EventEmitter<DestinoViaje>;
  @HostBinding('attr.class') cssClass = 'col-4 col-sm-4';
  constructor(private store: Store<FeatureDnsVs>) {
    this.onClicked_FromDestinoViaje = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir():boolean {
    this.onClicked_FromDestinoViaje.emit(this.destino);
    return false;
  }

  voteUp(): boolean {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown(): boolean {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

  voteReload(): boolean {
    this.store.dispatch(new VoteReloadAction(this.destino));
    return false;
  }

  deleteViaje(): boolean {
    this.store.dispatch(new DeleteDestinoAction(this.destino));
    return false;
  }

}
