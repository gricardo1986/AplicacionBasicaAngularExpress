import { map, Observable } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, ActionReducerMap } from "@ngrx/store";
import { DestinoViaje } from "./destino-viaje.model";
import { Injectable } from "@angular/core";

// ACCIONES - NOUN
export const enum DestinosViajesTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down',
    VOTE_RELOAD = '[Destinos Viajes] Vote Reload',
    DELETE_DESTIO = '[Destinos Viajes] Delete',
    INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

// INICIALIZADORES
export interface DestinosViajesState {
    loading: boolean;
    items: Array<DestinoViaje>;
    favorito: DestinoViaje|null;
}

export const intializeDnsVsState = () => {
    return {
        items: [],
        loading: false,
        favorito: null
    };
}

export const cloneDestinoViaje = (d:DestinoViaje): DestinoViaje => {
    let n = new DestinoViaje(d.nombre, d.imagenUrl);
    n.setSelected(d.isSelected());
    n.servicios = d.servicios;
    n.vote = d.vote;
    n.id = d.id;
    return n;
}

// ACCIONES - ELEMENTS
export class NuevoDestinoAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.NUEVO_DESTINO;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class ElegidoFavoritoAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.ELEGIDO_FAVORITO;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class VoteUpAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.VOTE_UP;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class VoteDownAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.VOTE_DOWN;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class VoteReloadAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.VOTE_RELOAD;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class DeleteDestinoAction implements Action {
    destino: DestinoViaje = new DestinoViaje('','');
    type = DestinosViajesTypes.DELETE_DESTIO;
    constructor(destino: DestinoViaje) {
        this.destino = destino;
    }
}

export class InitMyDataAction implements Action {
    type = DestinosViajesTypes.INIT_MY_DATA;
    constructor(public destinos: string[]) {
    }
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | VoteReloadAction | DeleteDestinoAction | InitMyDataAction;

// Redux Init
export interface FeatureDnsVs {
    destinos: DestinosViajesState;
}

export const DnsVsReducers: ActionReducerMap<FeatureDnsVs>|any = {
    destinos: reducerDnsVs
}

// REDUCERS
export function reducerDnsVs (
    state: DestinosViajesState = intializeDnsVsState(),
    action: DestinosViajesActions
): DestinosViajesState {
    switch(action.type) {
        case DestinosViajesTypes.NUEVO_DESTINO: {
            let n:DestinoViaje = cloneDestinoViaje((action as NuevoDestinoAction).destino);
            n.updateID(state.items.length);
            return {
                ...state,
                items: [...state.items, n]
            };
        }
        case DestinosViajesTypes.ELEGIDO_FAVORITO: {
            let f: DestinoViaje|null = null;
            let nstary: DestinoViaje[] = [];
            let nstte: DestinosViajesState = intializeDnsVsState();
            const d: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            for (let z of state.items) {
                let n = cloneDestinoViaje(z);
                if (d.id != z.id) {
                    n.setSelected(false);
                    // state.items[state.items.indexOf(z)] = n;
                } else {
                    n.setSelected(true);
                    f = n;
                    // nstary.push(new DestinoViaje('', ''));
                }
                nstary.push(n);
            }
            // let n = cloneDestinoViaje(d);
            // n.setSelected(true);
            // nstary[state.items.indexOf(d)] = n;
            // state.items[state.items.indexOf(d)] = n;
            // state.items.map((x:DestinoViaje) => (x as DestinoViaje).setSelected(false));
            nstte.items = nstary;
            return {
                ...nstte,
                favorito: f
            };
        }
        case DestinosViajesTypes.VOTE_UP: {
            let nstary: DestinoViaje[] = [];
            let nstte: DestinosViajesState = intializeDnsVsState();
            const d:DestinoViaje = (action as VoteUpAction).destino;
            for (let z of state.items) {
                let n = cloneDestinoViaje(z);
                if (d.id == z.id) {
                    n.voteUp();
                }
                nstary.push(n);
            }
            nstte.items = nstary;
            return { ...nstte };
        }
        case DestinosViajesTypes.VOTE_DOWN: {
            let nstary: DestinoViaje[] = [];
            let nstte: DestinosViajesState = intializeDnsVsState();
            const d:DestinoViaje = (action as VoteDownAction).destino;
            for (let z of state.items) {
                let n = cloneDestinoViaje(z);
                if (d.id == z.id) {
                    n.voteDown();
                }
                nstary.push(n);
            }
            nstte.items = nstary;
            return { ...nstte };
        }
        case DestinosViajesTypes.VOTE_RELOAD: {
            let nstary: DestinoViaje[] = [];
            let nstte: DestinosViajesState = intializeDnsVsState();
            const d:DestinoViaje = (action as VoteReloadAction).destino;
            for (let z of state.items) {
                let n = cloneDestinoViaje(z);
                if (d.id == z.id) {
                    n.voteReload();
                }
                nstary.push(n);
            }
            nstte.items = nstary;
            return { ...nstte };
        }
        case DestinosViajesTypes.DELETE_DESTIO: {
            let nstary: DestinoViaje[] = [];
            let nstte: DestinosViajesState = intializeDnsVsState();
            const d:DestinoViaje = (action as DeleteDestinoAction).destino;
            const f:DestinoViaje|null = state.favorito != null && (d.id != (state.favorito as DestinoViaje).id)? state.favorito: null;
            for (let z of state.items) {
                let n = cloneDestinoViaje(z);
                if (d.id != z.id) {
                    nstary.push(n);
                }
            }
            nstte.items = nstary;
            return {
                ...nstte,
                favorito: f
            };
        }
        case DestinosViajesTypes.INIT_MY_DATA: {
            const destinos: string[] = (action as InitMyDataAction).destinos;
            return {
                ...state,
                items: destinos.map((d) => new DestinoViaje(d, ''))
            };
        }
        default: {
            return state;
        }
    }
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinosViajesTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );
    constructor(private actions$: Actions<Action>) {
    }
}