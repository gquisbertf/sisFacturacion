
import { ClienteDto } from "../cliente.dto";
import { MensajeDto } from "../mensaje.dto";

export interface ObtenerClienteResponse {
    respuesta: MensajeDto
    cliente: ClienteDto
}