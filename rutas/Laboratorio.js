//clase para las rutas del caso de Uso "Gestion de Trabajadores"

const router = require('express').Router();
const labController = require('../Controladores/LaboratorioControlador');

const path = require('path');

const publico = path.join(__dirname, "../public");


//se coloca la ruta, y lo que se desea que realice 
router.get('/', labController.login);
router.get('/usuarios', labController.listar);
router.post('/add', labController.save);
//para eliminar un registro, debo mandarle un parametro, en este caso utilizaremos la llave primaria que es el usuario
router.get('/delete/:usuario', labController.delete);
router.get('/update/:usuario', labController.editar);

module.exports = router;