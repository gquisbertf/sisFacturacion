// parametrico.service.ts
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ObtenerParametricaResponse } from '../dto/response/obtener-parametrica-response';
import { HttpClient, HttpParams } from '@angular/common/http';




@Injectable({ providedIn: 'root' })
export class ParametricaService {
    private httpClient = inject(HttpClient);
    /**
       * Servicio que obtiene las parametricas
       */
    async getParametricas(pSolicitud: string): Promise<ObtenerParametricaResponse> {
        //const vUrl = `${this.apiUrl}/tramite/parametricas/obtener-dominio`;
        let vUrl = '';
        switch (pSolicitud) {
            case 'tipo-documento':
                vUrl = `http://localhost:3000/tipos-documento`
                break;
            case 'tipos-metodo-pago':
                vUrl = `http://localhost:3000/tipos-metodo-pago`
                break;
            case 'tipos-moneda':
                vUrl = `http://localhost:3000/tipos-moneda`
                break;
            default:
                break;
        }

        let vResponse: ObtenerParametricaResponse
        try {
            const params = new HttpParams().set('dominio', pSolicitud);
            const response$ = this.httpClient.get<ObtenerParametricaResponse>(vUrl, { params });
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