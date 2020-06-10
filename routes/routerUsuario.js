import Router from 'express';

import registrar from '../controller/usuario/registrar.js';
import listar from '../controller/usuario/listar.js';
import login from '../controller/usuario/login.js';


const router = Router();

router.route('/registra')
      .post(registrar);

router.route('/lista')
      .get(listar);

router.route('/login')
      .post(login);


export default router;      