setInterval(() => {
    let fecha__completa = document.getElementById("fecha__completa");
    let hora__estado = document.getElementById("hora__estado");
    let hora__tiempo = document.getElementById("hora__tiempo");
    let fecha = new Date();
    let semana = ["Domingo", "lunes", "martes", "miercoles", "juves", "viernes", "sabado"]
    let mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "JUnio", "Julio", "Agosto", "Septiembre", "octubre", "noviembre", "diciembre"]
    let diaNuevo;
    let estado;


    if (fecha.getHours() >= 12) {
        estado = "PM"
    } else {
        estado = "AM"
    }
    if (fecha.getDate() < 10) {
        diaNuevo = `0${fecha.getDate()}`
    } else {
        diaNuevo = `${fecha.getDate()}`
    }


    fecha__completa.textContent = `${semana[fecha.getDay()] + " " + diaNuevo + " de " + mes[fecha.getMonth()] + " del " + fecha.getFullYear()}  `
    hora__estado.textContent = `${estado}`;
    hora__tiempo.textContent = `${fecha.toLocaleTimeString()}`

}, 1000);




let fecha = document.querySelector('#fecha')
let lista = document.querySelector('#lista')
let elemento = document.querySelector('#elemento')
let input = document.querySelector('#input')
let botonEnter = document.querySelector('#boton-enter')
let check = 'fa-check-circle'
let uncheck = 'fa-circle'
let lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

/* let FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'}) */



// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    let REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    let LINE = realizado ? lineThrough : '' 

    let elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)
}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si

    Swal.fire({
        title: 'Felicidades !',
        text: 'has terminado tu tarea.',
        imageUrl: 'https://i.makeagif.com/media/12-14-2022/DisUe_.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

// funcion de Eliminar tarea 

function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)

    Swal.fire(
        'Eliminar',
        'Tarea!',
        'error'
      )


    
}


// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    let tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''

        
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        let tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        
        }
    }
    
})


lista.addEventListener('click',function(event){
    let element = event.target 
    let elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}