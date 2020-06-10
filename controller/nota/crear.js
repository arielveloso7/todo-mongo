import jwt from 'jsonwebtoken';
import HTTPError from 'http-errors';

import notaDAO from '../../model/nota/dao.js';

//sacar el parametro de la cabecera del request que se llama authorization
const getTokenFrom = request => {
    const authorization = request.get('authorization');

    //si esa cabecera empieza por beare
    if (authorization && authorization.toLowerCase().startsWith('bearer '))
        return authorization.substring(7);

    return null;
}

const crear = async (req, res, next) => {

    try {

        const token = getTokenFrom(req);

        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken.id) {
            next(HTTPError(401, { error: 'token no existe o no es válido' }))

        } else {
            const nota = await notaDAO.crear(req.body);
            res.status(201).json(nota);
        }

    } catch (error) {
        next(error);
    }

}

export default crear;