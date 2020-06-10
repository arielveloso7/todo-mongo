import HTTPErrors from 'http-errors';
import mongoose from 'mongoose';

export default {

    logError(err, req, res, next) {
        req.error = err;
        console.log(err.message);
        next(err);
    },

    errorCliente(err, req, res, next) {

        if (err instanceof HTTPErrors.HttpError)
            res.status(err.statusCode).send({ 'error': err.message });
        if (err instanceof mongoose.Error)
            res.status(400).send({ 'error': err.message });
        if (err.name === "JsonWebTokenError")
            res.status(400).send({ 'error': err.message });

        next(err);

    },

    errorGenerico(err, req, res, next) {
        if (res.headersSent) {
            return next(err);
        }

        res.status(err.statusCode).json({
            'error': 'se ha producido un error',
            'name': err.name
        });

    }
}