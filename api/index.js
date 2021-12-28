const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const  myConnection = require('express-myconnection');

//importo las rutas 
const laboratorioRutas = require('../rutas/Laboratorio')

const port = process.env.PORT || 5000;


const publico = path.join(__dirname, "../public");


app.use(express.static(publico));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

/**** mysql */
//variables de entorno, esas vienen de docker
const mysqlhost = process.env.MYSQLHOST || '192.168.0.15';
const mysqluser = process.env.MYSQLUSER || "LaboratorioUser";
const mysqlpass = process.env.MYSQLPASS || "LaBoRaToRio1";

//conexión

app.use(myConnection(mysql, {
    host: mysqlhost,
    user: mysqluser,
    password: mysqlpass,
    database: 'Laboratorio'
  }, 'single'));
  //middleware de express, para entender todos los datos que vienen de los formularios
  app.use(express.urlencoded({extended: false}));


//rutas
app.use('/',laboratorioRutas);


/*
app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../vistas/index.html'));
    res.status(201).sendFile(path.join(__dirname, '../vistas/index.html'));

});

app.get('/secretaria', (req, res) => {
    res.status(201).sendFile(path.join(__dirname, '../vistas/secretaria.html'));

});

app.get('/pacientes', (req, res) => {
    res.status(201).sendFile(path.join(__dirname, '../vistas/pacientes.html'));

});

app.get('/administracion', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/administracion.html'));

});

app.get('/laboratorio', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/laboratorio.html'));

});

app.get('/usuarios', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/usuarios.html'));

});

app.get('/resultados', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/resultados.html'));

});

app.get('/orden', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/orden.html'));

});

app.get('/examen', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../vistas/examen.html'));

});*/


app.listen(port, () => console.log(`listening on http://localhost:${port}`));