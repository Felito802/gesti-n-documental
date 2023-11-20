const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db=mysql.createConnection(
    { host:"localhost",
        user: 'root',
        password: "",
        database: "empleados" 
    });

    app.post("/create",(req, res) => {
        const nombredu = req.body.nombredu; 
        const ubicacion = req.body.ubicacion;
        const dependencia = req.body.dependencia;
        const usuario = req.body.usuario;
        const estado = req.body.estado;
        const nota = req.body.nota;
        

        db.query('insert into empleados (nombredu,ubicacion,dependencia,usuario,estado,nota) values(?,?,?,?,?,?)',[nombredu,ubicacion,dependencia,usuario,estado,nota],
        (err, result) => {
            if (err) {
                console.log(err);
            }else {
                res.send("registro completo")
            }
        });
    });
    app.get("/empleados",(req, res) => {
        db.query('SELECT *FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err);
            }else {
                res.send(result);
            }
        });
    });
    //buscar
    app.get("/buscarPorId", (req, res) => {
        const id = req.query.id;
        // Realiza la búsqueda en la base de datos usando el ID
        db.query(
          'SELECT * FROM empleados WHERE id = ?',
          [id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: 'Error en la búsqueda por ID' });
            } else {
              res.json(result);
            }
          }
        );
      });
      

    app.put("/update",(req, res) => {
        const id = req.body.id;
        const ubicacion = req.body.ubicacion;
        const nombredu = req.body.nombredu;
        const dependencia = req.body.dependencia;
        const usuario = req.body.usuario;
        const estado = req.body.estado;
        const nota = req.body.nota;
       

        db.query('UPDATE empleados SET nombredu=?,ubicacion=?,dependencia=?, usuario=?, estado=?, nota=? WHERE id=?',[nombredu,ubicacion, dependencia, usuario, estado, nota,id],
        (err, result) => {
            if (err) {
                console.log(err);
            }else {
                res.send("actulizacion completo")
            }
        });
    });
    //eliminar
    app.delete("/delete/:id",(req, res) => {
        const id = req.params.id;
     

        db.query('DELETE FROM empleados  WHERE id=?',id,
        (err, result) => {
            if (err) {
                console.log(err);
            }else {
                res.send(result);
            }
        });
    });


app.listen(3001,() => {
    console.log("corriendo en el puerto")
});