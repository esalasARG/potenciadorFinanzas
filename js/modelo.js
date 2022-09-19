
//VARIABLES GLOBALES
let nombreUsuario = "Usuario";
let montoIngresos = 0;
let tiposGastos = [];
let gastos = [];
let idGasto;

//a futuro la idea es poder agregar o quitar cuentas y administrarlas dinamicamente en una base de datos
let porcentajeAhorros = 40, porcentajeOtrosGastos = 15, porcentajeGastosFijos = 20, porcentajeMercado = 25;

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

async function cargarTiposGastos()
{
    tiposGastos = [];

    //cargamos los datos de un JSON local, a futuro se van a obtener de una base de datos
    const urlJSON ="/data/tiposGastos.json"
    const response = await fetch(urlJSON)
    const data = await response.json()
    tiposGastos = data;

    console.log("Se cargaron correctamente los tipos de gastos");
    //Ahora que ya se resolvio la promesa ya puedo renderizar la sección de gastos.
}

function reiniciarGastos()
{
    localStorage.removeItem("gastos");
}

function reiniciarConfiguraciones()
{
    localStorage.removeItem("usuario");
    localStorage.removeItem("ingresos");
    localStorage.removeItem("ultimoIdGasto");
    localStorage.removeItem("porcentajeAhorros");
    localStorage.removeItem("porcentajeGastosFijos");
    localStorage.removeItem("porcentajeOtrosGastos");
    localStorage.removeItem("porcentajeMercado");
}

function obtenerDatosDeLocalStorage()
{
    //Vemos si hay gastos previamente cargados
    if(localStorage.getItem("gastos") != null){
        gastos = JSON.parse(localStorage.getItem("gastos"));
    }else{
        gastos = [];
    }

    //Buscamos nombre de usuario
    if(localStorage.getItem("usuario") != null){
        nombreUsuario = localStorage.getItem("usuario");
    }else{
        nombreUsuario = "Usuario";
    }

    //Buscamos valores de % previamente configurados
    if(localStorage.getItem("ingresos") != null){
        montoIngresos = localStorage.getItem("ingresos");
    }else{
        montoIngresos = 0;
    }

    if(localStorage.getItem("porcentajeAhorros") != null){
        porcentajeAhorros = localStorage.getItem("porcentajeAhorros");
    }else{
        porcentajeAhorros = 40;
    }

    if(localStorage.getItem("porcentajeGastosFijos") != null){
        porcentajeGastosFijos = localStorage.getItem("porcentajeGastosFijos");
    }else{
        porcentajeGastosFijos = 20;
    }

    if(localStorage.getItem("porcentajeOtrosGastos") != null){
        porcentajeOtrosGastos = localStorage.getItem("porcentajeOtrosGastos");
    }else{
        porcentajeOtrosGastos = 15;
    }

    if(localStorage.getItem("porcentajeMercado") != null){
        porcentajeMercado = localStorage.getItem("porcentajeMercado");
    }else{
        porcentajeMercado = 25;
    }

    //Vemos el último Id de gasto guardado

    if(localStorage.getItem("ultimoIdGasto") != null){
        idGasto = localStorage.getItem("ultimoIdGasto");
    }else{
        idGasto = 0;
    }
}
