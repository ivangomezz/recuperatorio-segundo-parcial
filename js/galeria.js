//array de objetos con las obras
const obrasArtista = [
    {
     nombre: "1",
     anio: 1,
     imagen: "./img/lozano-hemmer-2.jpg"
    },
    {
     nombre: "2",
     anio: 2,
     imagen: "2"
    },
    {
     nombre: "3",
     anio: 3,
     imagen: "3"
    },
    {
     nombre: "4",
     anio: 4,
     imagen: "4"
    },
    {
     nombre: "5",
     anio: 5,
     imagen: "5"
    }
];

//seleccion de elementos
const contenedorGaleria = document.getElementById("galeria-obras");
const btnCambiarDiseno = document.getElementById("btn-cambiar-diseno");

//mostrar las obras dinamicamente en el html
function renderizarGaleria() {
    contenedorGaleria.innerHTML = "";

    for (let i = 0; i < obrasArtista.length; i++) {
        const obra = obrasArtista[i];

        //crear contenedor para la tarjeta
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-obra");

        //imagen
        const img = document.createElement("img");
        img.src = obra.imagen;
        img.alt = obra.nombre;

        //titulo
        const titulo = document.createElement("h3");
        titulo.classList.add("titulo-fuente");
        titulo.textContent = obra.nombre;

        //año
        const anio = document.createElement("p");
        anio.textContent = "Año: " + obra.anio;

        //estructura tarjeta 
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(anio);

        //agregar al contenedor principal
        contenedorGaleria.appendChild(tarjeta);
    }
}

//alternar diseño (normal y lista)
function alternarDiseno() {
    if (contenedorGaleria.classList.contains ("vista-grid")) {
        contenedorGaleria.classList.remove("vista-grid");
        contenedorGaleria.classList.add ("vista-lista");
    } else {
        contenedorGaleria.classList.remove("vista-lista");
        contenedorGaleria.classList.add("vista-grid");
    }
}

//evento botón
btnCambiarDiseno.addEventListener("click", alternarDiseno);

//ejecucion
renderizarGaleria();