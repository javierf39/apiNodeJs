const connection = require('../db/db');

const storage = require('../multer')
const multer = require('multer')
const upload = multer({ storage })

const controller = {
    inicio: (req, res) => {
        res.send("Bienvenido")
    },
    listarPeliculas: (req, res) => {
        connection.query('SELECT P.id_pelicula, P.nombre, P.anno, P.director, P.img, C.descripcion FROM pelicula P JOIN categoria C on P.id_categoria = C.id_categoria', (err, rows, fileds) => {
            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }
        })
    },
    listarPelicula: (req, res) => {
        const { id } = req.params;
        connection.query(`SELECT P.id_pelicula, P.nombre, P.anno, P.director, P.img, C.descripcion, P.id_categoria FROM pelicula P JOIN categoria C on P.id_categoria = C.id_categoria AND id_pelicula=${id}`, (err, row, fields) => {
            if (!err) {
                res.json(row)
            } else {
                console.log("Error ", err)
            }
        })
    },
    guardarPelicula: (req, res) => {
        const { id_pelicula, nombre, anno, director, id_categoria } = req.body;
        const img = req.file
        let url = `http://localhost:3000/public/${img.filename}`
        console.log(img)
        connection.query(`INSERT INTO pelicula VALUES(${id_pelicula}, "${nombre}", ${anno}, "${director}", "${url}", ${id_categoria})`, (err, rows, fileds) => {
            if (!err) {
                res.json({ status: 'Pelicula Agregada' })
            } else {
                console.log("Error ", err)
            }
        })
    },
    actualizarPelicula: (req, res) => {
        const { nombre, anno, director, id_categoria, urlImg } = req.body;
        const { id } = req.params;
        const img = req.file;
        if (img) {
            url = `http://localhost:3000/public/${img.filename}`
            console.log(img)
            connection.query(`UPDATE pelicula SET nombre="${nombre}", anno=${anno}, director="${director}", img="${url}", id_categoria=${id_categoria} WHERE id_pelicula=${id}`, (err, rows, fileds) => {
                if (!err) {
                    res.json({ status: 'Pelicula actualizada' })
                } else {
                    console.log(err)
                }
            })
        } else {
            connection.query(`UPDATE pelicula SET nombre="${nombre}", anno=${anno}, director="${director}", img="${urlImg}", id_categoria=${id_categoria} WHERE id_pelicula=${id}`, (err, rows, fileds) => {
                if (!err) {
                    res.json({ status: 'Pelicula actualizada' })
                } else {
                    console.log(err)
                }
            })
        }

    },
    eliminarPelicula: (req, res) => {
        const { id } = req.params;
        connection.query(`DELETE FROM pelicula WHERE id_pelicula=${id}`, (err, row, fileds) => {
            if (!err) {
                res.json({ status: 'Pelicula eliminida' })
            } else {
                console.log(err)
            }
        })
    },
    listarCategorias: (req, res) => {
        connection.query("SELECT * FROM categoria", (err, rows, fileds) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        })
    }
};

module.exports = controller;