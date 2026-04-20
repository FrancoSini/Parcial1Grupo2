document.addEventListener('DOMContentLoaded', () => {
    // referencias a los elementos del DOM
    const inputTarea = document.querySelector('input[type="text"]');
    const formulario = document.querySelector('form');
    const listaTareas = document.querySelector('.lista-tareas');
    const btnLimpiarUltima = document.querySelector('.btn-limpiar-ultima');
    const btnLimpiarCompletadas = document.querySelector('.btn-limpiar-completadas');
    const btnLimpiarTodas = document.querySelector('.btn-limpiar-todas');
    const contadorTotal = document.querySelector('.contador.total');
    const contadorPendientes = document.querySelector('.contador.pendientes');
    const contadorCompletadas = document.querySelector('.contador.completadas');


    // funcion para agregar tareas a la lista y actualizar los contadores
    let tareas = [];
    function agregarTarea() {
        listaTareas.innerHTML = '';

        let completadas = 0;
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');


            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarea.completada;
            checkbox.addEventListener('change', () => {
                tareas[index].completada = checkbox.checked;
                agregarTarea();
            });
            
            const spanText = document.createElement('span');
            spanText.textContent = tarea.texto;
            if (tarea.completada) {
                spanText.style.textDecoration = 'line-through';
                completadas++;
            }
            li.appendChild(checkbox);
            li.appendChild(spanText);
            listaTareas.appendChild(li);
        });

        //actualizamos los contadores 
        const total = tareas.length;
        const pendientes = total - completadas;
        contadorTotal.textContent = `Total: ${total}`;
        contadorPendientes.textContent = `Pendientes: ${pendientes}`;
        contadorCompletadas.textContent = `Completadas: ${completadas}`;
    }

    // eventos de los botones
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = inputTarea.value.trim();
        if (texto !== '') {
            tareas.push({ texto: texto, completada: false });
            inputTarea.value = ''; 
            agregarTarea(); 
        }
    });
    btnLimpiarUltima.addEventListener('click', () => {
        if (tareas.length > 0) {
            tareas.pop(); 
            agregarTarea(); 
        }

    });
    
    btnLimpiarCompletadas.addEventListener('click', () => {
        tareas = tareas.filter(tarea => tarea.completada === false);
        agregarTarea();
    });

    btnLimpiarTodas.addEventListener('click', () => {
        tareas = []; 
        agregarTarea();
    });

    
    agregarTarea();
});