import conexion from '../../mongo.js';
import ModeloUsuario from './modelo.js';


class UsuarioDAO {

    constructor() { }

    registrar(usuario) {

        return new ModeloUsuario(usuario).save();
    }

    listar() {
        return ModeloUsuario.find({});
    }

    encontrarUsuario(usuario) {
        return ModeloUsuario.findOne(usuario);
    }

}

export default new UsuarioDAO;
