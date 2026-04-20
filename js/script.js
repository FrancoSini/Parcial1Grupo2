document.addEventListener('DOMContentLoaded', () => {
    // referencias a los elementos del DOM
    const inputTarea = document.querySelector('input[type="text"]');//input para ingresar la tarea tipo texto ya que en el html no se define como text
    const formulario = document.querySelector('form');// aplica evento submit al formulario para evitar recargar la pagina y agregar la tarea a la lista
    const listaTareas = document.querySelector('.lista-tareas');// contenedor de la lista de tareas para agregar las tareas dinamicamente
    const btnLimpiarUltima = document.querySelector('.btn-limpiar-ultima');// boton para eliminar la ultima tarea agregada a la lista
    const btnLimpiarCompletadas = document.querySelector('.btn-limpiar-completadas');// boton para eliminar todas las tareas que han sido marcadas como completadas
    const btnLimpiarTodas = document.querySelector('.btn-limpiar-todas');// boton para eliminar todas las tareas de la lista sin importar su estado
    const contadorTotal = document.querySelector('.contador.total');//  contador para mostrar el total de tareas en la lista, se actualiza cada vez que se agrega o elimina una tarea
    const contadorPendientes = document.querySelector('.contador.pendientes');//    contador para mostrar el numero de tareas pendientes, se actualiza cada vez que se marca una tarea como completada o se elimina una tarea pendiente
    const contadorCompletadas = document.querySelector('.contador.completadas');// contador para mostrar el numero de tareas completadas, se actualiza cada vez que se marca una tarea como completada o se elimina una tarea completada


    // funcion para agregar tareas a la lista y actualizar los contadores
    let tareas = [];
    function agregarTarea() {
        listaTareas.innerHTML = '';

        let completadas = 0;
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');

            //creacion del checkbox para marcar la tarea como completada o pendiente
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarea.completada;
            //creacion del evento change para actualizar el estado de la tarea en el arreglo de tareas y actualizar la lista y los contadores cada vez que se marca o desmarca el checkbox
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
    // evento submit para agregar una nueva tarea a la lista
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();//se agrega para evitar que el formulario recargue la pagina al enviar la tarea
        const texto = inputTarea.value.trim();
        if (texto !== '') {
            tareas.push({ texto: texto, completada: false });
            inputTarea.value = ''; 
            agregarTarea(); 
        }
    });
    // evento click para eliminar la ultima tarea agregada a la lista
    btnLimpiarUltima.addEventListener('click', () => {
        if (tareas.length > 0) {
            tareas.pop(); 
            agregarTarea(); 
        }

    });
    //evento click para eliminar todas las tareas que han sido marcadas como completadas
    btnLimpiarCompletadas.addEventListener('click', () => {
        tareas = tareas.filter(tarea => tarea.completada === false);//filtro el arreglo para eliminar las tareas completadas y mantener solo las pendientes
        agregarTarea();
    });
    //evento click para eliminar todas las tareas
    btnLimpiarTodas.addEventListener('click', () => {
        tareas = []; 
        agregarTarea();
    });

    
    agregarTarea();
});