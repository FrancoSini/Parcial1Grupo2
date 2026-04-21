
//REFERENCIAS A ELEMENTOS DEL DOM
const form = document.querySelector("form");
const input = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector(".btn-agregar");
const lista = document.querySelector(".lista-tareas");

const total = document.querySelector("#total");
const pendientes = document.querySelector("#pendientes");
const completadas = document.querySelector("#completadas");

const btnUltima = document.querySelector(".btn-limpiar-ultima");
const btnCompletadas = document.querySelector(".btn-limpiar-completadas");
const btnTodas = document.querySelector(".btn-limpiar-todas");

// CREACION DE LA LISTA TAREAS
let tareas = [];

// FUNCIONES
//FUNCION PARA AGREGAR TAREA
function agregarTarea () {
     const texto = input.value.trim();
    if (texto === "") return;

    tareas.push({
        texto: texto,
        completada: false
    });

    input.value = "";
    actualizarLista();
}
//FUNCION PARA ACTUALIZAR LA LISTA (Borra la lista actual y vuelve a crear todas las tareas desde el array)
function actualizarLista() {
    lista.innerHTML = "";

    tareas.forEach((tarea, index) => {

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.style.textDecoration = "line-through";
        }

        const btnCompletar = crearBotonCompletar(index);

        li.appendChild(span);
        li.appendChild(btnCompletar);

        lista.appendChild(li);
    });

    actualizarContadores();
}
//FUNCION PAR ACREAR EL BOTÓN "✔" Y SU RESPECTIVO EVENTO
function crearBotonCompletar (index){
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✔";

    btnCompletar.addEventListener("click", () => {
        tareas[index].completada = !tareas[index].completada;
        actualizarLista();
    });
    return btnCompletar;
}
//FUNCION PARA ACTUALIZAR CONTADORES
function actualizarContadores() {
    const totalTareas = tareas.length;
    const completadasTareas = tareas.filter(t => t.completada).length;
    const pendientesTareas = totalTareas - completadasTareas;

    total.textContent = `Total: ${totalTareas}`;
    completadas.textContent = `Completadas: ${completadasTareas}`;
    pendientes.textContent = `Pendientes: ${pendientesTareas}`;
}

// EVENTOS
//AGREGA TAREA CON CLICK EN EL BOTON "AGREGAR"
btnAgregar.addEventListener("click", () => {
    agregarTarea();
});
//AGREGA TAREA CON "ENTER"
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        agregarTarea();    
    }
});
//ELIMINA LA ULTIMA TAREA CON CLICK EN EL BOTON "LIMPIAR ULTIMA"
btnUltima.addEventListener("click", () => {
    tareas.pop();
    actualizarLista();
});
//ELIMINA TODAS LAS TAREAS COMPLETADAS CON CLICK EN EL BOTON "LIMPIAR COMPLETADAS"
btnCompletadas.addEventListener("click", () => {
    tareas = tareas.filter(t => !t.completada);
    actualizarLista();
});
//ELIMINA TODAS LAS TAREAS CON CLICK EN EL BOTON "LIMPIAR TODAS"
btnTodas.addEventListener("click", () => {
    tareas = [];
    actualizarLista();
});
