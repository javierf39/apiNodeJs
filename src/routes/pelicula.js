const express = require('express');
const router = express.Router();
const connection = require('../db/db');

const storage = require('../multer');
const multer = require('multer');
const upload = multer({ storage });

const PeliculaController = require('../controllers/pelicula');

router.get('/', PeliculaController.inicio);
router.get('/categorias', PeliculaController.listarCategorias)
router.get('/peliculas', PeliculaController.listarPeliculas);
router.get('/pelicula/:id', PeliculaController.listarPelicula);
router.post('/enviar_pelicula', upload.single('img'), PeliculaController.guardarPelicula);
router.put('/actualizar_pelicula/:id', upload.single('img'), PeliculaController.actualizarPelicula);
router.delete('/eliminar_pelicula/:id', PeliculaController.eliminarPelicula);

module.exports = router;