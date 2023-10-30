import { DestinoViaje } from './destino-viaje.model';
import { DestinosViajesState, InitMyDataAction, intializeDnsVsState, NuevoDestinoAction, reducerDnsVs } from './destinos-viajes-state.model';

describe('reducerDestinosViajesState', () => {
  it('should reduce init data', () => {
    // SETUP
    const prevState: DestinosViajesState = intializeDnsVsState();
    const action: InitMyDataAction = new InitMyDataAction(['Destino 001', 'Destino 002']);
    // ACTION
    const newState: DestinosViajesState = reducerDnsVs(prevState, action);
    // ASSERTIONS
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].nombre).toEqual('Destino 001');
  });
  it('should reduce new item added', () => {
    // SETUP
    const prevState: DestinosViajesState = intializeDnsVsState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Un lugar', 'Mi URL'));
    // ACTION
    const newState: DestinosViajesState = reducerDnsVs(prevState, action);
    // ASSERTIONS
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('Un lugar');
  });
});
