//array con los datos
const datosCuriosos = [
    "dato1",
    "dato2",
    "dato3",
    "dato4",
    "dato5"
];

//seleccion de elementos
const textoDato = document.getElementById("texto-dato");
const btnDatoCurioso = document.getElementById("btn-dato-curioso");

//obtener y mostrar uno de esos
function mostrarDatoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
    textoDato.textContent = datosCuriosos[indiceAleatorio];
}

//evento de click en el botón
btnDatoCurioso.addEventListener("click", mostrarDatoAleatorio);

//dato inicial
mostrarDatoAleatorio();