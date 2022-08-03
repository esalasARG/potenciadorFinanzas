let opcion = 0;
let nombre = "";
let ahorrosPorcentaje= 0.4, imprevistosPorcentaje = 0.2, gastosFijosPorcentaje = 0.25, otrosGastosPorcentaje = 0.15;
let montoIngresos = 0;
let tiposGastos = [];
let gastos = [];
let idGasto = 1;


class TipoGasto 
{
    constructor(id, descripcion) 
    {
        this.id  = parseInt(id);
        this.descripcion  = descripcion;
    }

    getTipoGasto() 
    {
        return this.id + " - " + this.descripcion + "\n";
    }
}

class Gasto 
{
    constructor( tipoGasto, comentario, montoGasto ) 
    {
        this.id  = getNewIdGasto();
        this.fecha = new Date();
        let tipoGasto1 =  tiposGastos.find(tipo => tipo.id == tipoGasto);
        console.log(tipoGasto1)
        this.tipo = tipoGasto1;
        this.comentario  = comentario;
        this.monto = parseFloat(montoGasto);
    }

    getGasto() 
    {
        return "\n" + this.id + " - " + this.fecha.toLocaleString() + "\nTipo de Gasto: " + this.tipo.descripcion + "\nComentario: " + this.comentario + "\n$" + this.monto + "\n";
    }
}

function getNewIdGasto()
{
    idGasto++;
    return idGasto-1;
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
    console.log(getTiposGastos());
}

function getTiposGastos()
{
    let cadenaTipos = "";

    for(const tipoGasto of tiposGastos)
    {
        cadenaTipos += tipoGasto.getTipoGasto();
    }

    return cadenaTipos;
}

function mostrarGastos()
{
    if(gastos.length == 0)
    {
        alert("Todavía no hay gastos registrados")
    }
    else
    {
        let cadenaGastos = "";

        for(const gasto of gastos)
        {
            cadenaGastos += gasto.getGasto();
        }
    
        alert("Los gastos registrados hasta este momento son:\n" + cadenaGastos);
    }
}

function mostrarBienvenida()
{
    console.log("Se ejecuta bienvenida");
    nombre = prompt(
    "Bienvenido a Potenciador de Finanzas"+
    "\n--------------------------------------------"+
    "\nPor favor ingresa tu nombre y apellido", " ");
    console.log("Ingreso al sistema " + nombre);
}

function mostrarMenu()
{
    console.log("Se muestra menu");
    opcion = parseInt(prompt(
        "Gracias por usar nuestro sistema "+ nombre +
        "!\n¿Como te podemos ayudar?"+
        "\n--------------------------------------------"+
        "\n1.Generar presupuesto completo personalizado"+
        "\n2.Generar presupuesto estándar"+
        "\n3.Registrar un gasto"+
        "\n4.Mostrar gastos registrados"+
        "\n0.Salir"+
        "\n--------------------------------------------"+
        "\nPor favor ingresa el numero de opción","1"));
}

function opcionInvalida()
{
    console.log("El usuario ingresó una opción invalida.");
    alert("La opción ingresada es inválida, por favor ingresa una correspondiente al menu");
}

function realizarCalculoPersonalizado()
{
    montoIngresos = parseFloat(prompt("Por favor ingresa el monto total de tus ingresos en pesos argentinos, con numeros en el formato XXXX.XX","100000.00"));

    alert("De acuerdo con nuestros expertos financieros se recomienda separar los ingresos del siguiente modo:"+
    "\nAhorros: " + ahorrosPorcentaje * 100 + " %" + 
    "\nImprevistos: " + imprevistosPorcentaje * 100 + " %" + 
    "\nGastos Fijos: " + gastosFijosPorcentaje * 100 + " %" + 
    "\nOtros Gastos: " + otrosGastosPorcentaje * 100 + " %"
    );

    let porcentajeRestante = 100;

    do
    {
        ahorrosPorcentaje = parseFloat(prompt("Por favor ingresa el porcentaje del 0 al 100\nque quieras dedicar a tus ahorros.", 40)) / 100;
    } while (ahorrosPorcentaje * 100 > porcentajeRestante)

    porcentajeRestante = porcentajeRestante - ahorrosPorcentaje * 100;

    if(porcentajeRestante > 0)
    {
        do
        {
            imprevistosPorcentaje = parseFloat(prompt("Por favor ingresa el porcentaje del 0 al "+ porcentajeRestante + "\nque quieras dedicar a tus gastos imprevistos.", 20)) / 100;
        }while (imprevistosPorcentaje * 100 > porcentajeRestante)
        porcentajeRestante = porcentajeRestante - imprevistosPorcentaje * 100;

        if(porcentajeRestante > 0)
        {
            do
            {
                gastosFijosPorcentaje = parseFloat(prompt("Por favor ingresa el porcentaje del 0 al "+ porcentajeRestante + "\nque quieras dedicar a tus gastos fijos.",25)) / 100;
            }while(gastosFijosPorcentaje  * 100 > porcentajeRestante)
            
            porcentajeRestante = porcentajeRestante - gastosFijosPorcentaje * 100;

            if(porcentajeRestante > 0)
            {
                do
                {
                    otrosGastosPorcentaje = parseFloat(prompt("Por favor ingresa el porcentaje del 0 al "+ porcentajeRestante + "\nque quieras dedicar a tus otros gastos.",15)) / 100;
                } while(otrosGastosPorcentaje * 100 > porcentajeRestante)
                
                porcentajeRestante = porcentajeRestante - otrosGastosPorcentaje * 100;
            }
            else
            {
                otrosGastosPorcentaje = 0;
            }
        }
        else
        {
            gastosFijosPorcentaje = 0, otrosGastosPorcentaje = 0;
        }
    }
    else
    {
        imprevistosPorcentaje = 0, gastosFijosPorcentaje = 0, otrosGastosPorcentaje = 0;
    }

    alert(nombre + ", de acuerdo con sus ingresos de $" + montoIngresos+
    "\nSu presupuesto personalizado quedó conformado del siguiente modo:"+
    "\n---------------------------------------------------------------------------"+
    "\nAhorros: " + ahorrosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * ahorrosPorcentaje + 
    "\nImprevistos: " + imprevistosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * imprevistosPorcentaje + 
    "\nGastos Fijos: " + gastosFijosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * gastosFijosPorcentaje + 
    "\nOtros Gastos: " + otrosGastosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * otrosGastosPorcentaje
    );

    console.log("Se realizó un presupuesto personalizado y quedó conformado del siguiente modo:"+
    "\n---------------------------------------------------------------------------"+
    "\nIngresos netos: $" +montoIngresos+
    "\n---------------------------------------------------------------------------"+
    "\nAhorros: " + ahorrosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * ahorrosPorcentaje + 
    "\nImprevistos: " + imprevistosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * imprevistosPorcentaje + 
    "\nGastos Fijos: " + gastosFijosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * gastosFijosPorcentaje + 
    "\nOtros Gastos: " + otrosGastosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * otrosGastosPorcentaje
    );
}

function realizarCalculoEstandar()
{
    montoIngresos = parseFloat(prompt("Por favor ingresa el monto total de tus ingresos en pesos argentinos, con numeros en el formato XXXX.XX","100000.00"));

    alert(nombre + ", de acuerdo con sus ingresos de $" + montoIngresos+
    "\ny segun las recomendaciones de nuestros expertos financieros su presupuesto debe elaborarse del siguiente modo:"+
    "\nAhorros: " + ahorrosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * ahorrosPorcentaje + 
    "\nImprevistos: " + imprevistosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * imprevistosPorcentaje + 
    "\nGastos Fijos: " + gastosFijosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * gastosFijosPorcentaje + 
    "\nOtros Gastos: " + otrosGastosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * otrosGastosPorcentaje
    );

    console.log("Se realizó un presupuesto estándar y quedó conformado del siguiente modo:"+
    "\n---------------------------------------------------------------------------"+
    "\nIngresos netos: $" +montoIngresos+
    "\n---------------------------------------------------------------------------"+
    "\nAhorros: " + ahorrosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * ahorrosPorcentaje + 
    "\nImprevistos: " + imprevistosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * imprevistosPorcentaje + 
    "\nGastos Fijos: " + gastosFijosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * gastosFijosPorcentaje + 
    "\nOtros Gastos: " + otrosGastosPorcentaje * 100 + " %" + " y equivale a $" +  montoIngresos * otrosGastosPorcentaje
    );
}

function mostrarDespedida()
{
    alert("Muchas gracias por utilizar el Potenciador de Finanzas");
    console.log("------------------------------------"); 
    console.log("Se finalizó la sesión de trabajo de " + nombre);
    console.log("------------------------------------"); 
}

function cargarGasto()
{
    let tipoGasto =  parseInt(prompt("Por favor ingresa el nro asociado al tipo de gasto de acuerdo a la siguiente lista:\n"+ getTiposGastos(),"1"));
    let comentario = prompt("Por favor ingresa un comentario que permita identificar a que esta relacionado el gasto","Compra Coto");
    let monto = parseFloat(prompt("Por favor ingresa el monto en pesos del gasto con dos decimales en el formato XXX.XX","100.00"));

    let gasto = new Gasto(tipoGasto, comentario, monto);

    console.log(gasto);

    gastos.push(gasto);

    console.log(gastos);
}

//Comienzo del MAIN

mostrarBienvenida();
cargarTiposGastos();

do 
{
    mostrarMenu();   

    switch(opcion)
    {
        case 1:
            realizarCalculoPersonalizado();
        break;

        case 2:
            realizarCalculoEstandar();
        break;

        case 3:
            cargarGasto();
        break;

        case 4:
            mostrarGastos();
        break;
            
        case 0:
            mostrarDespedida();
        break;

        default:
            opcionInvalida();
        break;
    }

    reiniciarVariables();

} while (opcion != 0)