const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;



app.use(express.static('public'));

app.use('/css',express.static(__dirname+'public/css'));
app.use('/imagenes',express.static(__dirname+'public/imagenes'));
//app.use('/js',express.static(__dirname+'public/js'));

app.get('/' , (req , res)=>{



 console.log(path.join(__dirname,'../vistas/index.html'));
  res.status(201).sendFile(path.join(__dirname,'../vistas/index.html'));

});

app.get('/secretaria' , (req , res)=>{

    res.status(201).sendFile(path.join(__dirname,'../vistas/secretaria.html'));
 
 });

 app.get('/pacientes' , (req , res)=>{

    res.status(201).sendFile(path.join(__dirname,'../vistas/pacientes.html'));
 
 });

 app.get('/administracion' , (req , res)=>{

    res.status(201).sendFile(path.join(__dirname,'../vistas/administracion.html'));
 
 });

 app.get('/laboratorio' , (req , res)=>{

    res.status(201).sendFile(path.join(__dirname,'../vistas/laboratorio.html'));
 
 });


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))