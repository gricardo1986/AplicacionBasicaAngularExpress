import { Store } from '@ngrx/store';
import { DestinoViaje } from "./destino-viaje.model";
import { FeatureDnsVs } from 'src/app/models/destinos-viajes-state.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from 'src/app/models/destinos-viajes-state.model';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG, db } from '../app.module';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
// import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DestinosApiClient {
    private destinos:DestinoViaje[] = [];
    // private current: Subject<DestinoViaje|null> = new BehaviorSubject<DestinoViaje|null>(null);
    constructor(
        private store: Store<FeatureDnsVs>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient )
        // ) { }
    {}
    add(d: DestinoViaje): void {
        /*
        let x = new DestinoViaje(d.nombre, d.imagenUrl);
        x.updateID(this.destinos.length + 1);
        this.destinos.push(x);
        */
        // this.store.dispatch(new NuevoDestinoAction(x));
        const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
        const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', { nuevo: d.nombre }, { headers: headers });
        this.http.request(req).subscribe(
            (data: null|any|HttpResponse<any>): void => {
                if (data && data.status == 200) {
                    this.store.dispatch(new NuevoDestinoAction(d));

                    const myDb = db;
                    myDb.destinos.add(d);
                    console.log('Destino guardado en la DB!');
                    myDb.destinos.toArray().then((desti:any):void => console.log(desti));
                }
            });
        // this.store.dispatch(new NuevoDestinoAction(d));
    }
    elegir(d: DestinoViaje): void {
        // d.setSelected(true);
        // this.current.next(d);
        /*
        for (let z of this.destinos) {
            if (d.id != z.id) {
                let n = new DestinoViaje(z.nombre, z.imagenUrl);
                let x = this.getById(z.id);
                n.id = x.id;
                n.setSelected(false);
                this.destinos[this.destinos.indexOf(x)] = n;
            }
        }
        let n = new DestinoViaje(d.nombre, d.imagenUrl);
        let x = this.getById(d.id);
        n.id = x.id;
        n.setSelected(true);
        this.destinos[this.destinos.indexOf(x)] = n;
        */
        // this.store.dispatch(new ElegidoFavoritoAction(n));
        this.store.dispatch(new ElegidoFavoritoAction(d));
        /*this.destinos.forEach((x:DestinoViaje) => { if (d.id != x.id) { x.setSelected(false); } });*/
    }
    /*
    getAll(): DestinoViaje[] {
        return this.destinos;
    }
    getById(id: string): DestinoViaje {
        return this.destinos.filter(function(d) {
            return d.id.toString() == id;
        })[0];
    }
    suscribeOnChange(fn: any): void{
        // this.current.subscribe(fn);
    }
    */
    // overriding super class method
    getById(id: string): DestinoViaje {
        return new DestinoViaje('Por Get By ID ORIGINAL', id);
    }
}
