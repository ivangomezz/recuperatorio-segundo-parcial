//variables de estado
let totalObrasARegistrar = 0;
let consumoPorHoraLuz = 0;
let costoPorKwh = 0;
let listObras = [];

//lementos dom paso 1
const campoCantObras = document.getElementById("cant-obras");
const campoConsumoHora = document.getElementById("consumo-hora");
const campoCostoKwh = document.getElementById("costo-kwh");
const btnIniciarCarga = document.getElementById("btn-iniciar-carga");
const pasoConfig = document.getElementById("paso-configuracion");

//elementos dom paso 2
const pasoObras = document.getElementById("paso-obras");
const campoNombreObra = document.getElementById("nombre-obra");
const campoLucesObra = document.getElementById("luces-obra");
const campoTiempoObra = document.getElementById("tiempo-obra");
const btnAgregarObra = document.getElementById("btn-agregar-obra");
const contadorObras = document.getElementById("contador-obras");
const totalObrasLbl = document.getElementById("total-obras-lbl");

//elementos dom paso 3
const btnCalcular = document.getElementById("btn-calcular");
const btnReiniciar = document.getElementById("btn-reiniciar");

//elementos de resultados
const resConsumoTotal = document.getElementById("res-consumo-total");
const resConsumoPromedio = document.getElementById("res-consumo-promedio");
const resObraMayor = document.getElementById("res-obra-mayor");
const resCostoMayor = document.getElementById("res-costo-mayor");
const resPorcentajeLuces = document.getElementById("res-porcentaje-luces");

// 1 confirmar configuracion
function confirmarConfiguracion() {
    const cant = parseInt(campoCantObras.value);
    const consumo = parseFloat(campoConsumoHora.value);
    const costo = parseFloat(campoCostoKwh.value);

    //validacion
    if (isNaN(cant) || cant <= 0 || isNaN(consumo) || consumo <=0 || isNaN(costo) || costo <= 0) {
        alert("ingresá valores validos y mayores a cero");
        return;
    }

    totalObrasARegistrar = cant;
    consumoPorHoraLuz = consumo;
    costoPorKwh =costo;

    //habilitar y deshbabilitar formularios
    pasoConfig.disabled = true;
    pasoObras.disabled = false;
    totalObrasLbl.textContent = totalObrasARegistrar;
}

//2 agregar obra
function agregarObra() {
    const nombre = campoNombreObra.value.trim();
    const luces = parseInt(campoLucesObra.value);
    const tiempo = parseFloat(campoTiempoObra.value);

    //validaciones
    if (nombre === "") {
        alert("ingresá un nombre valido.");
        return;
    }
    if(isNaN(luces) || luces <= 0) {
        alert("la cantidad de luces debe ser mayor a 0");
        return;
    }
    if (isNaN(tiempo) || tiempo <= 0 || tiempo > 24) {
        alert("ingresá un numero valido");
        return;
    }

    //guardar objeto obra
    listObras.push({
        nombre : nombre,
        luces: luces,
        tiempo: tiempo
    });

    //limpiar campos del formulario obras
    campoNombreObra.value = "";
    campoLucesObra.value = "";
    campoTiempoObra.value = "";

    //actualizar contador
    contadorObras.textContent = listObras.length;

    //verificar si se completo la cantidad
    if (listObras.length === totalObrasARegistrar) {
        pasoObras.disabled = true;
        btnCalcular.disabled = false; //habilitar boton de calculo
        alert("carga finalizada. presiones calcular resultados");
        
    }
}

// 3 calcular resultados
function calcularResultados() {
    let consumoDiarioTotal = 0;
    let obraMayorTiempo = listObras [0];
    let contadorMas20Luces = 0;

    for (let i = 0; i < listObras.length; i++) {
        const obra =listObras[i];

        //consumo diario de la obra = luces * horas * consumo
        const consumoObra = obra.luces * obra.tiempo * consumoPorHoraLuz;
        consumoDiarioTotal += consumoObra;
    
        //evaluar obra con mayor tiempo
        if (obra.tiempo > obraMayorTiempo.tiempo) {
            obraMayorTiempo = obra;
        }

        //evaluar si tiene mas de 20 luces
        if (obra.luces > 20) {
            contadorMas20Luces++;
        }
    }

    //calculos finales
    const promedioConsumo = consumoDiarioTotal / listObras.length;
    const consumoDiarioMayorObra = obraMayorTiempo.luces * obraMayorTiempo.tiempo * consumoPorHoraLuz;
    const costoDiarioMayorObra = consumoDiarioMayorObra * costoPorKwh;
    const porcentajeMas20Luces = (contadorMas20Luces / listObras.length) * 100;

    //mostrar en el DOM
    resConsumoTotal.textContent = consumoDiarioTotal.toFixed(2);
    resConsumoPromedio.textContent = promedioConsumo.toFixed(2);
    resObraMayor.textContent = obraMayorTiempo.nombre + " (" + obraMayorTiempo.tiempo + "hs)";
    resCostoMayor.textContent = costoDiarioMayorObra.toFixed(2);
    resPorcentajeLuces.textContent = porcentajeMas20Luces.toFixed(1);

    //estado de botones al finalizar
    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;
}

//4 reiniciar sistema
function reiniciarSistema() {
    listObras = [];
    totalObrasARegistrar = 0;
    consumoPorHoraLuz = 0;
    costoPorKwh = 0;

    //limpiar inputs
    campoCantObras.value = "";
    campoConsumoHora.value = "";
    campoCostoKwh.value = "";
    contadorObras.textContent = "0";
    totalObrasLbl.textContent = "0";

    //reiniciar textos de resultados
    resConsumoTotal.textContent = "-";
    resConsumoPromedio.textContent = "-";
    resObraMayor.textContent = "-";
    resCostoMayor.textContent = "-";
    resPorcentajeLuces.textContent = "-";

    //restablecer estado de fieldets y botones
    pasoConfig.disabled = false;
    pasoObras.disabled = true;
    btnCalcular.disabled = true;
    btnReiniciar.disabled = true;
}

if (btnIniciarCarga) btnIniciarCarga.addEventListener("click", confirmarConfiguracion);
if (btnAgregarObra) btnAgregarObra.addEventListener("click", agregarObra);
if (btnCalcular) btnCalcular.addEventListener("click", calcularResultados);
if (btnReiniciar) btnReiniciar.addEventListener("click", reiniciarSistema);