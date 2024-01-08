import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

  public producto?: ProductoDescripcion;
  public id?: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ){}

  ngOnInit(): void {
      
    this.route.params
        .subscribe( parametros =>{

          this.productoService.getProducto(parametros['id'])
              .subscribe( (producto: any) =>{
                this.id=parametros['id'];
                this.producto = producto;
                
              });

        });

  }

}
