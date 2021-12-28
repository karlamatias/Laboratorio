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
    conn.query('SELECT * FROM Paciente', (err, rows) => {
      if (err) {
        res.json(err);
      }
      //console.log(rows)
      //renderizo la vista que deseo 
      res.render('Paciente', {
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
      const query = connection.query('INSERT INTO Paciente set ?', data, (err, customer) => {
          //una vez los datos son instertados a la DB, la pagina redirige para mostrar la lista
          //de usuarios instertados 
          res.redirect('/pacientes');

      })
  })
};


//metodo para Editar datos a la BD
controller.edit = (req, res) => {
  const { cui } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM Paciente WHERE CUI = ?", [cui], (err, rows) => {
      res.render('EditarPacientes', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { cui } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

    conn.query('UPDATE Paciente set ? where CUI = ?', [newCustomer, cui], (err, rows) => {
      res.redirect('/pacientes');
    });
  });
};


//metodo para eliminar datos a la BD
controller.delete = (req, res) => {
  //se obtiene el cui del registro que se desea eliminar 
  const { cui } = req.params;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM Paciente WHERE CUI = ?', [cui], (error, rows) => {
      res.redirect('/pacientes');

    });

  });
};



module.exports = controller;