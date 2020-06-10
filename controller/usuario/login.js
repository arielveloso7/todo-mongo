import bcrypt from 'bcrypt';
import HTTPerror from 'http-errors';
import jwt from 'jsonwebtoken'; //construye el hash (ejemplo https://jwt.io/)

import usuarioDAO from '../../model/usuario/dao.js';


const login = async (req, res, next) => {

    try {

        //mira que el usuario exista (en el modelo)
        const usuario = await usuarioDAO.encontrarUsuario({ usuario: req.body.usuario });


        /* Otra manera con if-else 
           const passwordCorrecta;
           if (usuario === !null) {
               false
   
           } else {
               const passwordCorrecta = await bcrypt.compare(req.body.password, usuario.password); //comparo si la paswword que paso (encriptandola) es igual a la password encriptada que tengo
           }
       */

        //manera con ternario
        //voy a ver si la password es correcta 
        //comparo si la paswword que paso (encriptandola) es igual a la password encriptada que tengo (req)
        const passwordCorrecta = usuario === null ? false : await bcrypt.compare(req.body.password, usuario.password);

        //si el usuario o la password so incorrectos, incalidos o nulos, devolvemos error
        if (!(usuario && passwordCorrecta)) {
            next(HTTPerror(401, { mensaje: 'usuario o password incorrecto' }));

            //si no hay error generamos el token
        } else {
            const usuarioToken = {
                usuario: usuario.usuario,
                id: usuario._id
            }

            //construyo el token (necesitamos un name y un SECRET)
            const token = jwt.sign(usuarioToken, process.env.SECRET);  //misecretodetoken

            //enviar el token
            res.status(201).json({ token, usuario: usuario.usuario, email: usuario.mail });
        }


    } catch (error) {
        next(error);
    }




}

export default login;