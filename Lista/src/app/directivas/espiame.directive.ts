import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appEspiame]'
})
export class EspiameDirective implements OnInit, OnDestroy {

  static nextId:number = 0;
  public log:any = (msg: string) => console.log(`Evento #${EspiameDirective.nextId++} ${msg}`);

  ngOnInit(): void {
    this.log(`#######******* onInit`)
  }
  ngOnDestroy(): void {
    this.log(`#######******* ngOnDestroy`)
  }
  
  constructor() { }

}
