const controller = {};

const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');

const publico = path.join(__dirname, "../public");

//metodo para listar los usuarios que vienen de DB
controller.listar = (req, res) => {

  //se manda llamar la conexion, y nos puede devolver un error o bien, la conexion 
  req.getConnection((err, conn) => {
    //llamo los datos que deseo de la DB
    conn.query('SELECT * FROM Medico', (err, rows) => {
      if (err) {
        res.json(err);
      }
      //console.log(rows)
      //renderizo la vista que deseo 
      res.render('Medico', {
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
      const query = connection.query('INSERT INTO Medico set ?', data, (err, customer) => {
          //una vez los datos son instertados a la DB, la pagina redirige para mostrar la lista
          //de usuarios instertados 
          res.redirect('/medico');

      })
  })
};


//metodo para Editar datos a la BD
controller.edit = (req, res) => {
  const { colegiado } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM Medico WHERE colegiado = ?", [colegiado], (err, rows) => {
      res.render('EditarMedico', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { colegiado } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

    conn.query('UPDATE Medico set ? where colegiado = ?', [newCustomer, colegiado], (err, rows) => {
      res.redirect('/medico');
    });
  });
};


//metodo para eliminar datos a la BD
controller.delete = (req, res) => {
  //se obtiene el cui del registro que se desea eliminar 
  const { colegiado } = req.params;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM Medico WHERE colegiado = ?', [colegiado], (error, rows) => {
      res.redirect('/medico');

    });

  });
};



module.exports = controller;