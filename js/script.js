document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const input = document.querySelector("#input-tarea");
    const lista = document.querySelector(".lista-tareas");

    const total = document.querySelector("#total");
    const pendientes = document.querySelector("#pendientes");
    const completadas = document.querySelector("#completadas");

    const btnUltima = document.querySelector(".btn-limpiar-ultima");
    const btnCompletadas = document.querySelector(".btn-limpiar-completadas");
    const btnTodas = document.querySelector(".btn-limpiar-todas");

    // estado de la app
    let tareas = [];

    // AGREGAR TAREA
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = input.value.trim();
        if (texto === "") return;

        tareas.push({
            texto: texto,
            completada: false
        });

        input.value = "";
        renderizar();
    });

    // RENDERIZAR Borra la lista actual y vuelve a crear todas las tareas desde el array
    function renderizar() {
        lista.innerHTML = "";

        tareas.forEach((tarea, index) => {

            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = tarea.texto;

            if (tarea.completada) {
                span.style.textDecoration = "line-through";
            }

            // BOTÓN COMPLETAR
            const btnCompletar = document.createElement("button");
            btnCompletar.textContent = "✔";

            btnCompletar.addEventListener("click", () => {
                tareas[index].completada = !tareas[index].completada;
                renderizar();
            });

            // BOTÓN ELIMINAR
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "✖";

            btnEliminar.addEventListener("click", () => {
                tareas.splice(index, 1);
                renderizar();
            });

            li.appendChild(span);
            li.appendChild(btnCompletar);
            li.appendChild(btnEliminar);

            lista.appendChild(li);
        });

        actualizarContadores();
    }

    // CONTADORES
    function actualizarContadores() {
        const totalTareas = tareas.length;
        const completadasTareas = tareas.filter(t => t.completada).length;
        const pendientesTareas = totalTareas - completadasTareas;

        total.textContent = `Total: ${totalTareas}`;
        completadas.textContent = `Completadas: ${completadasTareas}`;
        pendientes.textContent = `Pendientes: ${pendientesTareas}`;
    }

    // BOTONES FOOTER

    btnUltima.addEventListener("click", () => {
        tareas.pop();
        renderizar();
    });

    btnCompletadas.addEventListener("click", () => {
        tareas = tareas.filter(t => !t.completada);
        renderizar();
    });

    btnTodas.addEventListener("click", () => {
        tareas = [];
        renderizar();
    });

});