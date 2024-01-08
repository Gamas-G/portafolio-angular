import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  public info: InfoPagina = {};
  public equipo: Equipo[] = [];
  cargada: boolean = false;

  constructor( private http: HttpClient ) { 

    this.cargarEquipo();
    this.cargarInfo();

    
  }

  private cargarInfo(): void{

    //Leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
        .subscribe((resp:InfoPagina) => {

          this.cargada = true;
          this.info = resp;
          
        });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-54b51-default-rtdb.firebaseio.com/equipo.json')
        .subscribe( ( resp: any ) => {

          this.equipo = resp;
          
        });
  }

}
