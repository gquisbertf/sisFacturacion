import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ObtenerClienteResponse } from "../dto/response/obtener-cliente.response";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClienteService {
    private httpClient = inject(HttpClient);
    /**
       * Servicio que obtiene las parametricas
       */
    async getCliente(numeroDocumento: string, tipoDocumento: string): Promise<ObtenerClienteResponse> {
        //const vUrl = `${this.apiUrl}/tramite/parametricas/obtener-dominio`;
        let vUrl = `http://localhost:3000/clientes`
        let vResponse: ObtenerClienteResponse
        try {
            const params = new HttpParams().set('numeroDocumento', numeroDocumento)
                .set('tipoDocumento', tipoDocumento);
            const response$ = this.httpClient.get<ObtenerClienteResponse>(vUrl, { params });
            vResponse = await firstValueFrom(response$);
        } catch (error) {
            console.error('Error al obtener tipos de documentos:', error);
            vResponse = {
                respuesta: {
                    tipoMensaje: 'ERROR',
                    mensaje: 'Error al obtener tipos de documentos'
                },
                cliente: {
                    id: 0,
                    nombre: '',
                    apellido: '',
                    tipoDocumento: '',
                    numeroDocumento: '',
                    correo: '',
                    telefono: '',
                    direccion: '',
                    razonSocial: ''
                }
            };
        }
        return vResponse
    }
}