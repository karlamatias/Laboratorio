//clase para las rutas de los casos de Uso

const router = require('express').Router();
const labController = require('../Controladores/LaboratorioControlador');
const pacienteController = require('../Controladores/PacientesController');
const medicoController = require('../Controladores/MedicoController');

const path = require('path');

const publico = path.join(__dirname, "../public");


//se coloca la ruta, y lo que se desea que realice 

//rutas para gestion de Trabajadores
router.get('/', labController.login);
router.get('/inicio', labController.inicio);
router.get('/admin', labController.admin);
router.get('/laboratorio', labController.laboratorio);
router.get('/secretaria', labController.secretaria);
router.get('/orden', labController.orden);
router.get('/examen', labController.examen);
router.get('/resultados', labController.resultados);
router.get('/usuarios', labController.listar);
router.post('/add', labController.save);
//para eliminar un registro, debo mandarle un parametro, en este caso utilizaremos la llave primaria que es el usuario
router.get('/delete/:usuario', labController.delete);
router.get('/update/:usuario', labController.edit);
router.post('/update/:usuario', labController.update);

//rutas para gestion de Pacientes
router.get('/pacientes', pacienteController.listar );
router.post('/agregar', pacienteController.save);
router.get('/deletePaciene/:cui', pacienteController.delete);
router.get('/updatePaciente/:cui', pacienteController.edit);
router.post('/updatePaciente/:cui', pacienteController.update);


//rutas para gestion de Medicos
router.get('/medico', medicoController.listar );
router.post('/addmedico', medicoController.save);
router.get('/deletemedico/:colegiado', medicoController.delete);
router.get('/updatemedico/:colegiado', medicoController.edit);
router.post('/updatemedico/:colegiado', medicoController.update);



module.exports = router;