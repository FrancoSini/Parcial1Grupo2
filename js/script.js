document.addEventListener("DOMContentLoaded", () => {

    // referencias a elementos del DOM
    const form = document.querySelector("form");
    const input = document.querySelector("#input-tarea");
    const lista = document.querySelector(".lista-tareas");

    const total = document.querySelector("#total");
    const pendientes = document.querySelector("#pendientes");
    const completadas = document.querySelector("#completadas");

    const btnUltima = document.querySelector(".btn-limpiar-ultima");
    const btnCompletadas = document.querySelector(".btn-limpiar-completadas");
    const btnTodas = document.querySelector(".btn-limpiar-todas");

    // estado de la app (donde se guardan las tareas)
    let tareas = [];

    // AGREGAR TAREA
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // toma el texto del input 
        const texto = input.value.trim();
        if (texto === "") return; // si esta vacio no devuelve nada
        // agrega la tarea
        tareas.push({
            texto: texto,
            completada: false
        });

        input.value = ""; // limpia el input
        renderizar(); // vuelve a hacer la lista
    });

    // RENDERIZAR (Borra la lista actual y vuelve a crear todas las tareas desde el array)
    function renderizar() {
        lista.innerHTML = ""; // borra todo lo anterior
    
        // recorre todas las tareas y las vuelve a crear en pantalla
        tareas.forEach((tarea, index) => {  
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = tarea.texto;

            // a las tareas completadas, le agrega una clase (para tacharla con el CSS)
            if (tarea.completada) {
                span.classList.add("completada");
            } else {
                span.classList.remove("completada");
        }

            // BOTÓN COMPLETAR
            const btnCompletar = document.createElement("button");
            btnCompletar.textContent = "✔";
            //  cambia el estado (true / false)
            btnCompletar.addEventListener("click", () => {
                tareas[index].completada = !tareas[index].completada;
                renderizar(); // vuelve a actualizar la lista 
            });

            // BOTÓN ELIMINAR
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "✖";

            btnEliminar.addEventListener("click", () => {
            // elimina la tarea segun su posicion
                tareas.splice(index, 1);
                renderizar();
            });

            // arma el elemento final
            li.appendChild(span);
            li.appendChild(btnCompletar);
            li.appendChild(btnEliminar);

            lista.appendChild(li);
        });
        // actualiza los contadores: completadas, pendientes y totales
        actualizarContadores();
    }

    // CONTADORES
    function actualizarContadores() {
        const totalTareas = tareas.length;
        // cuenta tareas completadas
        const completadasTareas = tareas.filter(t => t.completada).length;
        // el resto son las pendientes
        const pendientesTareas = totalTareas - completadasTareas;

        // muestra los valores en los contadores
        total.textContent = `Total: ${totalTareas}`;
        completadas.textContent = `Completadas: ${completadasTareas}`;
        pendientes.textContent = `Pendientes: ${pendientesTareas}`;
    }

    // BOTONES FOOTER
    // elimina la ultma tarea
    btnUltima.addEventListener("click", () => {
        tareas.pop();
        renderizar();
    });
    // elimina las tareas completadas
    btnCompletadas.addEventListener("click", () => {
        tareas = tareas.filter(t => !t.completada);
        renderizar();
    });
    // elimina todas las tareas
    btnTodas.addEventListener("click", () => {
        tareas = [];
        renderizar();
    });

});