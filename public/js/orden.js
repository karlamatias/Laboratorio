

function contar() {
    document.getElementById("NoFactura").value = cuenta++;
    
}
var cuenta = 1;
contar();

console.log("Pre-Resquisitos:");
console.log("La secretaria debe estar loggeada y autenticada");
console.log("El paciente al que se refiere, debe estar registrado");

