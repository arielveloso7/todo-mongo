import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import routerUsuario from './routes/routerUsuario.js';
import routerNotas from './routes/routerNota.js';
import routerError from './routes/routerError.js';

import manejoError from './middleware/manejo-error.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuario', routerUsuario);
app.use('/nota', routerNotas);

app.use('*', routerError);
// app.get('/',(req,res)=>res.send('hola mundo'));

app.use(manejoError.logError);
app.use(manejoError.errorCliente);
app.use(manejoError.errorGenerico);

const PORT = process.env.PORT;

app.listen(PORT, _ => console.log('listen on:', PORT));