console.log("Pre-Resquisito:");
console.log("El Administrador debe estar loggeado y autenticado");

(function () {

    console.log("funcionando ");
})();


let usuarios = async () => {
    //console.log("hola mundo");

    var data = { datos: 'datos' };

    const response = await fetch('/usuarios')
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

};