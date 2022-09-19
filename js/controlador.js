let totalOtrosGastos = 0, totalGastosFijos = 0, totalMercado = 0, totalAhorros = 0;

function calcularResumen()
{
    totalAhorros = montoIngresos * (porcentajeAhorros/100);

    //Busco todos los gastos con id de tipo 2 que corresponde a otros gastos
    let resultado = gastos.filter((gasto) => gasto.tipo.id == 2)
    //Calculo el total del nuevo array
    totalOtrosGastos = resultado.reduce((acumulador,gasto) => acumulador + gasto.monto, 0)

    //Busco todos los gastos con id de tipo 1 que corresponde a mercado
    resultado = gastos.filter((gasto) => gasto.tipo.id == 1)
    //Calculo el total del nuevo array
    totalMercado = resultado.reduce((acumulador,gasto) => acumulador + gasto.monto, 0)

    //Busco todos los gastos con id de tipo 3 que corresponde a gastos fijos
    resultado = gastos.filter((gasto) => gasto.tipo.id == 3)
    //Calculo el total del nuevo array
    totalGastosFijos = resultado.reduce((acumulador,gasto) => acumulador + gasto.monto, 0)
}

//Almacenamos los datos el modelo, es este caso en un array y luego en el localStorage, lo ideal a futuro es guardarlo
function almacenarGasto(gasto)
{
    gastos.push(gasto);
    localStorage.setItem("gastos",JSON.stringify(gastos));
    console.log("Gasto almacenado");    
}

//
function actualizarGastosEnLocalStorage()
{
    localStorage.setItem("gastos",JSON.stringify(gastos));
    console.log("Gastos actualizados");    
}

function almacenarConfiguración(nombre, ingresos, ahorros, mercado, otrosGastos, gastosFijos)
{
    nombreUsuario = nombre;
    montoIngresos = ingresos;
    porcentajeAhorros = ahorros;
    porcentajeGastosFijos = gastosFijos;
    porcentajeMercado = mercado;
    porcentajeOtrosGastos = otrosGastos;

    localStorage.setItem("usuario",nombreUsuario);
    localStorage.setItem("ingresos",montoIngresos);
    localStorage.setItem("porcentajeAhorros",porcentajeAhorros);
    localStorage.setItem("porcentajeGastosFijos",porcentajeGastosFijos);
    localStorage.setItem("porcentajeMercado",porcentajeMercado);
    localStorage.setItem("porcentajeOtrosGastos",porcentajeOtrosGastos);
    console.log("Configuración almacenada");    
}

function iniciarModelo()
{
    cargarTiposGastos();
    obtenerDatosDeLocalStorage();
}

