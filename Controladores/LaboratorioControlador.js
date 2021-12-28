const controller = {};

const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');

const publico = path.join(__dirname, "../public");

controller.login = (req, res) => {
    res.render('index');

}

controller.admin = (req, res) => {
    res.render('administracion');

}

controller.laboratorio = (req, res) => {
    res.render('laboratorio');

}

controller.inicio = (req, res) => {
    res.render('inicio');

}

controller.secretaria = (req, res) => {
    res.render('secretaria');

}

controller.orden = (req, res) => {
    res.render('orden');

}
controller.examen = (req, res) => {
    res.render('examen');

}
controller.resultados= (req, res) => {
    res.render('resultados');

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
controller.edit = (req, res) => {
    const { usuario } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM Usuario WHERE usuario = ?", [usuario], (err, rows) => {
        res.render('Editar', {
          data: rows[0]
        })
      });
    });
  };

controller.update = (req, res) => {
    const { usuario} = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE Usuario set ? where usuario = ?', [newCustomer, usuario], (err, rows) => {
      res.redirect('/usuarios');
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