import { Usuario } from '../models/Usuario';
import { Vehiculo } from '../models/Vehiculo';
export class FlotaUsuario {
    public _id?:string;
    public conductor: Usuario;
    public vehiculo: Vehiculo;
    public origen: string;
    public destino: string;
    public descripcion: string;
    public fecha: Date;
}