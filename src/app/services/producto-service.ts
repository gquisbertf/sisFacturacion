import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ObtenerClienteResponse } from "../dto/response/obtener-cliente.response";
import { firstValueFrom } from "rxjs";
import { ObtenerProductoResponse } from "../dto/response/obtener-producto.response";

@Injectable({ providedIn: 'root' })
export class ProductoService {
    private httpClient = inject(HttpClient)
    async getProducto(): Promise<ObtenerProductoResponse> {
        //const vUrl = `${this.apiUrl}/tramite/parametricas/obtener-dominio`;
        let vUrl = `http://localhost:3000/productos`
        let vResponse: ObtenerProductoResponse
        try {

            const response$ = this.httpClient.get<ObtenerProductoResponse>(vUrl);
            vResponse = await firstValueFrom(response$);
        } catch (error) {
            console.error('Error al obtener tipos de documentos:', error);
            vResponse = {
                respuesta: {
                    tipoMensaje: 'ERROR',
                    mensaje: 'Error al obtener tipos de documentos'
                },
                lista: []
            };
        }
        return vResponse
    }
}