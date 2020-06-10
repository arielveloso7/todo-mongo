import usuarioDAO from '../../model/usuario/dao.js';
import bcrypt from 'bcrypt'; //libreria para encriptar

const registrar = async (req, res, next) => {

    try {
        //encriptar la password - metodo hash
        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

        const usuario = await usuarioDAO.registrar(
            {
                usuario: req.body.usuario,
                password: passwordHash
            }
        );
        res.status(201).json(usuario);

    } catch (error) {
        next(error);
    }

}

export default registrar;