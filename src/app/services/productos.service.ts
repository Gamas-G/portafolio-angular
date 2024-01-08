import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando:boolean = true;
  public productos: Producto[] = [];
  public productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }



  private cargarProductos(){

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-54b51-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {

          this.productos = resp;
          this.cargando = false;
          resolve(0);
        });

    });
  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-54b51-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino:string ){

    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then( () => {

        //ejecutar despues de tener los productos
        //Aplicar filtros
        this.filtrarProductos(termino);
      });

    }else{
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){

    this.productoFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLowerCase();
      
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }

    });

  }



}
