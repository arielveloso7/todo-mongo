import Router from 'express';


const router = Router();

router.all('/', (req, res, next) => res.status(404).json({ "error": "No existe la ruta" }));

export default router;