import { MensajeDto } from "../mensaje.dto";
import { SelectorData } from "../selector-data.dto";

export interface ObtenerParametricaResponse {
    respuesta: MensajeDto
    lista: SelectorData[]
}