
let nombre = "Nombre de Usuario";
let ahorrosPorcentaje= 0.4, imprevistosPorcentaje = 0.2, gastosFijosPorcentaje = 0.25, otrosGastosPorcentaje = 0.15;
let montoIngresos = 0;

let tiposGastos = [];
let gastos;
let idGasto;

class TipoGasto 
{
    constructor(id, descripcion) 
    {
        this.id  = parseInt(id);
        this.descripcion  = descripcion;
    }
}

class Gasto 
{
    constructor( fecha, tipoGasto, comentario, montoGasto ) 
    {
        this.id  = getNewIdGasto();
        this.fecha = fecha;
        let tipoGasto1 =  tiposGastos.find(tipo => tipo.id == tipoGasto);
        //verifico que el tipo de gasto se cargue bien
        console.log(tipoGasto1)
        this.tipo = tipoGasto1;
        this.comentario  = comentario;
        this.monto = parseFloat(montoGasto);
    }
}

function getNewIdGasto()
{
    idGasto++;
    localStorage.setItem("ultimoIdGasto",idGasto);
    return idGasto;
}

function reiniciarVariables()
{
    montoIngresos = 0, ahorrosPorcentaje= 0.4, imprevistosPorcentaje = 0.2, gastosFijosPorcentaje = 0.25, otrosGastosPorcentaje = 0.15;
}

function cargarTiposGastos()
{
    //a futuro acá podemos cargar los tipos de gasto desde una DB o un archivo
    let tipo1 = new TipoGasto(1,"Mercado");
    let tipo2 = new TipoGasto(2,"Gastos Fijos");
    let tipo3 = new TipoGasto(3,"Cuidado Personal");
    let tipo4 = new TipoGasto(4,"Educación");
    let tipo5 = new TipoGasto(5,"Otros Gastos");

    tiposGastos.push(tipo1);
    tiposGastos.push(tipo2);
    tiposGastos.push(tipo3);
    tiposGastos.push(tipo4);
    tiposGastos.push(tipo5);

    console.log("Se cargaron correctamente los tipos de gastos");
    console.log(tiposGastos);

    let select = document.getElementById('tipoGasto');

    for (const tipoGasto of tiposGastos) 
    {
        let opt = document.createElement('option');
        opt.value = tipoGasto.id;
        opt.innerHTML = tipoGasto.descripcion;
        select.appendChild(opt);
    }
}

function cargarDatosDeLocalStorage()
{
    //Vemos si hay gastos previamente cargados
    if(localStorage.getItem("gastos")!=null){
        gastos=JSON.parse(localStorage.getItem("gastos"));
        cargarTablaGastos();
    }else{
        gastos=[];
    }

    //Vemos el último Id de gasto guardado

    if(localStorage.getItem("ultimoIdGasto")!=null){
        idGasto=localStorage.getItem("ultimoIdGasto");
    }else{
        idGasto=0;
    }
}

function setearFormularioGastos()
{
    let fomularioGastos = document.getElementById("formularioGastos");
    fomularioGastos.addEventListener("submit", guardarGasto);
}

function guardarGasto(e)
{
    e.preventDefault();

    let fecha = document.getElementById("fecha").value;
    let tipoGasto =  document.getElementById("tipoGasto").value;
    let monto = document.getElementById("monto").value;;
    let comentario = document.getElementById("comentario").value;;

    let gasto = new Gasto(fecha, tipoGasto, comentario, monto);

    gastos.push(gasto);
    localStorage.setItem("gastos",JSON.stringify(gastos));
    cargarTablaGastos();

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su gasto se guardo correctamente',
        showConfirmButton: false,
        timer: 2000
    })

    console.log("Gasto almacenado");    
    console.log(gasto);  
}

function cargarTablaGastos()
{
    document.getElementById("tablaGastos").innerHTML='';

    console.log(gastos);  
    for (const gasto of gastos) {
        let tipoGasto1 =  gasto.tipo;

        console.log(tipoGasto1); 
        document.getElementById("tablaGastos").innerHTML+=`
        <tr>
            <td>${gasto.id}</td>
            <td>${gasto.fecha}</td>
            <td>${gasto.tipo.descripcion}</td>
            <td>${"$" + gasto.monto}</td>
            <td>${gasto.comentario}</td>
        </tr>`;
        
    }
}

