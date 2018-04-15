import { Usuario } from '../models/Usuario';
import { Vehiculo } from '../models/Vehiculo';
export class FlotaUsuario {
    public conductor: Usuario;
    public vehihulo: Vehiculo;
    public origen: string;
    public destino: string;
    public descripcion: string;
}