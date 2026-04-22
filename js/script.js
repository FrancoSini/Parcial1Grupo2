// REFERENCIAS A ELEMENTOS DEL DOM
const input = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector(".btn-agregar");
const lista = document.querySelector(".lista-tareas");

const total = document.querySelector("#total");
const pendientes = document.querySelector("#pendientes");
const completadas = document.querySelector("#completadas");

const btnUltima = document.querySelector(".btn-limpiar-ultima");
const btnCompletadas = document.querySelector(".btn-limpiar-completadas");
const btnTodas = document.querySelector(".btn-limpiar-todas");

// ARRAY DE TAREAS
let tareas = [];

// ---------------- FUNCIONES ----------------

// AGREGAR TAREA
function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") return;

    tareas.push({
        texto: texto,
        completada: false
    });

    input.value = "";
    actualizarLista();
}

// ACTUALIZAR LISTA
function actualizarLista() {
    lista.innerHTML = "";

    tareas.forEach((tarea, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        // ESTILO SI ESTÁ COMPLETADA
        if (tarea.completada) {
            span.classList.add("completada");
        }

        // BOTONES
        const btnCompletar = crearBotonCompletar(index);
        const btnEliminar = crearBotonEliminar(index);

        // AGREGAR ELEMENTOS
        li.appendChild(span);
        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });

    actualizarContadores();
}

// BOTÓN COMPLETAR ✔
function crearBotonCompletar(index) {
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✔";

    btnCompletar.addEventListener("click", () => {
        tareas[index].completada = !tareas[index].completada;
        actualizarLista();
    });

    return btnCompletar;
}

// BOTÓN ELIMINAR ✖
function crearBotonEliminar(index) {
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "✖";

    btnEliminar.addEventListener("click", () => {
        tareas.splice(index, 1);
        actualizarLista();
    });

    return btnEliminar;
}

// ACTUALIZAR CONTADORES
function actualizarContadores() {
    const totalTareas = tareas.length;
    const completadasTareas = tareas.filter(t => t.completada).length;
    const pendientesTareas = totalTareas - completadasTareas;

    total.textContent = `Total: ${totalTareas}`;
    completadas.textContent = `Completadas: ${completadasTareas}`;
    pendientes.textContent = `Pendientes: ${pendientesTareas}`;
}

// ---------------- EVENTOS ----------------

// BOTÓN AGREGAR
btnAgregar.addEventListener("click", agregarTarea);

// ENTER EN INPUT
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        agregarTarea();
    }
});


// LIMPIAR COMPLETADAS
btnCompletadas.addEventListener("click", () => {
    tareas = tareas.filter(t => !t.completada);
    actualizarLista();
});

// LIMPIAR TODAS
btnTodas.addEventListener("click", () => {
    tareas = [];
    actualizarLista();
});