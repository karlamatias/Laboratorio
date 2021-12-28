const controller = {};

const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');

const publico = path.join(__dirname, "../public");

controller.login = (req, res) => {
    console.log(path.join(__dirname, '../views/index.html'));
    res.status(201).sendFile(path.join(__dirname, '../views/index.html'));

}

//metodo para listar los usuarios que vienen de DB
controller.listar = (req, res) => {

    //se manda llamar la conexion, y nos puede devolver un error o bien, la conexion 
    req.getConnection((err, conn) => {
        //llamo los datos que deseo de la DB
        conn.query('SELECT * FROM Usuario', (err, rows) => {
            if (err) {
                res.json(err);
            }
            //console.log(rows)
            //renderizo la vista que deseo 
            res.render('Usuario', {
                //mando los datos para mostrarlos en el fronted
                data: rows
            });
        });

    });
};

//metodo para agregar datos a la BD por medio de un formulario 
controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO Usuario set ?', data, (err, customer) => {
            //una vez los datos son instertados a la DB, la pagina redirige para mostrar la lista
            //de usuarios instertados 
            res.redirect('/usuarios');

        })
    })
};

//metodo para Editar datos a la BD
controller.editar = (req, res) => {
   //se obtiene el usuario del registro que se desea eliminar 
   const { usuario } = req.params;
   req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE usuario = ?' [usuario], (error, rows) => {
        res.render('editarUsuario', {
            data: rows
        })

    });
});
};



//metodo para eliminar datos a la BD
controller.delete = (req, res) => {
    //se obtiene el usuario del registro que se desea eliminar 
    const { usuario } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM Usuario WHERE usuario = ?', [usuario], (error, rows) => {
            res.redirect('/usuarios');

        });

    });
};



module.exports = controller;