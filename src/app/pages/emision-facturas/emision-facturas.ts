import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ParametricaService } from '../../services/parametrica-service';
import { ConfigRestClientConstant } from '../../constants/config-rest-client.constants';
import lo from '@angular/common/locales/lo';
import { SelectorData } from '../../dto/selector-data.dto';
import { ClienteService } from '../../services/cliente-service';
import { ProductoService } from '../../services/producto-service';
import { ProductoDto } from '../../dto/producto.dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-emision-facturas',
  standalone: true,
  templateUrl: './emision-facturas.html',
  styleUrl: './emision-facturas.scss',
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatAutocompleteModule, MatSelectModule, MatDividerModule
  ],
})
export class EmisionFacturas implements OnInit {
  private fb = inject(FormBuilder);

  form: FormGroup;
  productoControl = new FormControl('');
  displayedColumns: string[] = ['codigo', 'descripcion', 'monto', 'acciones'];

  // Datos de ejemplo para la tabla
  items = signal<any[]>([
    { codigo: 'PROD-001', descripcion: 'Leche entera de larga vida 1L', monto: 27.00 },
    { codigo: 'PROD-042', descripcion: 'Mantequilla cremosa con sal 250g', monto: 18.00 }
  ]);
  listaTipoDocumento = signal<SelectorData[]>([]);
  listaTipoMetodoPago = signal<SelectorData[]>([]);
  listaTipoMoneda = signal<SelectorData[]>([]);
  listaProductos = signal<any[]>([]);
  productoTemporal: any = null;


  constructor(
    private parametricaService: ParametricaService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
  ) {
    this.form = this.fb.group({
      tipoDocumento: ['1', Validators.required],
      documento: ['', Validators.required],
      razonSocial: ['', Validators.required],
      metodoPago: ['efectivo', Validators.required],
      moneda: ['BOB', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getParametricaTipoDocumento();
    this.getParametricaMetodoPago();
    this.getParametricaMoneda();
    this.obtenerProductos();
  }
  async getParametricaTipoDocumento() {
    try {
      const response = await this.parametricaService.getParametricas('tipo-documento');
      if (response.respuesta.tipoMensaje === ConfigRestClientConstant.STATUS_200.toString()) {
        if (response.lista.length > 0) {
          this.listaTipoDocumento.set(response.lista)
        } else {
          console.log('No se encontraron tipos de documentos');
        }
      } else {
        console.error(`Error del servicio al obtener los tipos de documentos`, response.respuesta.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getParametricaMetodoPago() {
    try {
      const response = await this.parametricaService.getParametricas('tipos-metodo-pago');
      if (response.respuesta.tipoMensaje === ConfigRestClientConstant.STATUS_200.toString()) {
        if (response.lista.length > 0) {
          this.listaTipoMetodoPago.set(response.lista)
        } else {
          console.log('No se encontraron tipos de metodo de pago');
        }
      } else {
        console.error(`Error del servicio al obtener los tipos de metodo de pago`, response.respuesta.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getParametricaMoneda() {
    try {
      const response = await this.parametricaService.getParametricas('tipos-moneda');
      if (response.respuesta.tipoMensaje === ConfigRestClientConstant.STATUS_200.toString()) {
        if (response.lista.length > 0) {
          this.listaTipoMoneda.set(response.lista)
        } else {
          console.log('No se encontraron tipos de moneda');
        }
      } else {
        console.error(`Error del servicio al obtener los tipos de moneda`, response.respuesta.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }

  buscarCliente() {
    const documento = this.form.get('documento')?.value;
    const tipoDocumento = this.form.get('tipoDocumento')?.value;
    if (documento && tipoDocumento) {
      this.obtenerCliente(documento, tipoDocumento)
    } else {
      console.warn('El campo de documento está vacío');
    }


  }
  async obtenerCliente(documento: string, tipoDocumento: string) {
    try {
      const response = await this.clienteService.getCliente(documento, tipoDocumento);
      if (response && response.respuesta.tipoMensaje === ConfigRestClientConstant.STATUS_200.toString()) {
        if (response.cliente) {
          const razonSocial = response.cliente.razonSocial || response.cliente.apellido;
          this.form.get('razonSocial')?.setValue(razonSocial);
        } else {
          console.log('No se encontraron clientes');
          this.form.get('razonSocial')?.setValue('');
        }
      } else {
        console.error(`Error del servicio al obtener los clientes`, response.respuesta.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async obtenerProductos() {
    try {
      const response = await this.productoService.getProducto();
      console.log('response', response);
      if (response && response.respuesta.tipoMensaje === ConfigRestClientConstant.STATUS_200.toString()) {
        if (response.lista.length > 0) {
          this.listaProductos.set(response.lista)
        } else {
          console.log('No se encontraron productos');
        }
      } else {
        console.error(`Error del servicio al obtener los productos`, response.respuesta.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }

  capturarProducto(event: any) {
    // Guardamos el objeto completo del producto
    this.productoTemporal = event.option.value;
  }
  agregarALaTabla() {
    // Validamos que exista un producto seleccionado
    if (this.productoTemporal) {
      this.items.update(prev => [...prev, {
        codigo: this.productoTemporal.codigo,
        descripcion: this.productoTemporal.descripcion,
        monto: this.productoTemporal.monto || this.productoTemporal.precio || 0
      }]);

      // Limpiamos para la siguiente búsqueda
      this.productoTemporal = null;
      this.productoControl.setValue('');
    }
  }
  mostrarDescripcion(producto: any): string {
    return producto ? producto.descripcion : '';
  }
  // Método para agregar producto a la tabla desde el autocomplete
  productoSeleccionado(producto: any) {
    if (producto) {
      // Agregamos al signal de la tabla
      this.items.update(prev => [...prev, {
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        monto: producto.precio // o el campo que traiga tu API
      }]);
      // Limpiamos el buscador
      this.productoControl.setValue('');
    }
  }

  eliminarFila(index: number) {
    this.items.update(prev => prev.filter((_, i) => i !== index));
  }
  private filtroProducto = toSignal(
    this.productoControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value.toLowerCase() : ''))
    ),
    { initialValue: '' }
  );

  // 2. Signal Computado: Se actualiza solo cuando cambia el filtro o la lista de productos
  productosFiltrados = computed(() => {
    const term = this.filtroProducto();
    const productos = this.listaProductos()
    if (!term) return productos;
    return productos.filter(p =>
      p.descripcion.toLowerCase().includes(term) ||
      p.codigo.toLowerCase().includes(term)
    );
  });

}
