export class DestinoViaje {
    public servicios: string[] = ['Desayuno', 'Comida', 'Cena'];
    public selected: boolean = false;
    public vote: number = 0;
    public id: number = 0;
    public nombre: string;
    public imagenUrl: string;

    constructor(_nombre: string = '', _imagenUrl:string = ''){
        this.nombre =_nombre;
        this.imagenUrl = _imagenUrl;
    }

    updateID(i:number): void {
        this.id = i; // i.toString();
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s:boolean): void {
        this.selected = s;
    }

    voteUp():void{
        this.vote ++;
    }
    
    voteDown():void{
        this.vote --;
    }

    voteReload():void{
        this.vote = 0;
    }
}
