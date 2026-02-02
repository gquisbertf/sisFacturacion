import { MensajeDto } from "../mensaje.dto"
import { ProductoDto } from "../producto.dto"


export interface ObtenerProductoResponse {
    respuesta: MensajeDto
    lista: ProductoDto[]

}