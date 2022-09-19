let menuHome = document.getElementById("menuHome");
let menuGastos = document.getElementById("menuGastos");
let menuResumen = document.getElementById("menuResumen");
let menuPresupuesto = document.getElementById("menuPresupuesto");
let containerMain = document.getElementById("containerMain");

//utilizada para recargar la las modificaciones realizadas en DOM
function redibujarDOM()
{
    document.body.style.display = 'none';
    document.body.style.display = 'block';
}

//Modificamos el titulo del container principal
function setearTitulo(titulo)
{
    containerMain.innerHTML=`
    <div class="containerColumn">
        <span class="espaciador"></span>
        <h1>${titulo}</h1>
        <span class="espaciador"></span>
    </div>    
    `;
}

//Prepara todos los componentes para utilizar la sección de Carga de Gastos
function setearFormularioGastos()
{
    let select = document.getElementById('tipoGasto');

    console.log(tiposGastos); 

    for (const tipoGasto of tiposGastos) 
    {
        console.log(tipoGasto);
        let opt = document.createElement('option');
        opt.value = tipoGasto.id;
        opt.innerHTML = tipoGasto.descripcion;
        select.appendChild(opt);
    }

    dibujarTablaGastos();

    let formularioGastos = document.getElementById("formularioGastos");
    formularioGastos.addEventListener("submit", guardarGasto);
}

//Evento asociado al guardado de gastos
function guardarGasto(e)
{
    e.preventDefault();

    let fecha = document.getElementById("fecha").value;
    let tipoGasto =  document.getElementById("tipoGasto").value;
    let monto = document.getElementById("monto").value;;
    let comentario = document.getElementById("comentario").value;;

    let gasto = new Gasto(fecha, tipoGasto, comentario, monto);

    almacenarGasto(gasto);
    
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su gasto se guardo correctamente',
        showConfirmButton: false,
        timer: 2000
    })

    cargarMenuGastos();
}

function dibujarTablaGastos()
{
    document.getElementById("tablaGastos").innerHTML='';

    for (const gasto of gastos) {

        document.getElementById("tablaGastos").innerHTML+=`
        <tr class="table-dark">
            <td>${gasto.id}</td>
            <td>${gasto.fecha}</td>
            <td>${gasto.tipo.descripcion}</td>
            <td>${"$" + gasto.monto}</td>
            <td>${gasto.comentario}</td>
            <td> <button class='btn btn-danger' onclick='eliminarGasto(${gasto.id})'>Eliminar</button>
        </tr>
        `;
    }
}

//solicitamos confirmación de la eliminación y de confirmar actualizamos en LocalStorage y recargamos la sección
function eliminarGasto(id)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "Esta eliminación será definitiva y no podrás revertirla! El gasto se va a eliminar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            let indice = gastos.findIndex(gasto => gasto.id == id);

            gastos.splice(indice,1);//eliminando de la lista de gastos

            actualizarGastosEnLocalStorage();
            
            swalWithBootstrapButtons.fire(
            'Eliminar!',
            'El gasto fue eliminado.',
            'success'
            )

            cargarMenuGastos();
        } 
        else if ( result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu gasto no se eliminó!',
            'error'
            )
        }
    })
}

function cargarMenuGastos()
{
    console.log("Menu gastos");
    menuGastos.className = "nav-link active";
    menuHome.className = "nav-link";
    menuResumen.className = "nav-link";
    menuPresupuesto.className = "nav-link";

    setearTitulo("Carga de gastos");
    containerMain.innerHTML+=`
        <div class="containerColumn">
            <form id="formularioGastos" class="form" action="" method="POST">
                <h2>Por favor ingresa los siguientes datos:</h2>
                <div>
                    <label for="fecha">Fecha</label>
                    <input type="date" id="fecha" name="fecha" required placeholder="Fecha de gasto"> 
                </div>
                <div>
                    <label for="tipo">Tipo de Gasto</label>
                    <select  required id="tipoGasto" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option selected>...</option>
                    </select>
                </div>
                <div>
                    <label for="monto">Monto</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="monto" name="monto" required placeholder="100.00"> 
                </div>
                <div>
                    <label for="comentarios">Tus comentarios</label>
                    <input type="text" id="comentario" name="comentario" required placeholder="Detalle del gasto"> 
                </div>
                <div>
                    <input type="submit" value="Guardar" class="btn btn-success" id="botonGuardar">
                </div>
            </form>
        </div>    
        <span class="espaciador"></span>
        <div class="containerColumn">
            <h2>Tus Gastos</h2>
            <table class="table table-striped width80">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Tipo Gasto</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Comentarios</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody id="tablaGastos">
                </tbody>
            </table>
        </div>
        <span class="espaciador"></span>
    `;

    //Cargamos los datos de base
    setearFormularioGastos();
    redibujarDOM();
}


function cargarMenuHome()
{
    console.log("Menu Home");
    menuHome.className = "nav-link active";
    menuGastos.className = "nav-link";
    menuResumen.className = "nav-link";
    menuPresupuesto.className = "nav-link";

    setearTitulo("¡Bienvenido " + nombreUsuario + "!");

    containerMain.innerHTML+=`
        <div class="containerColumn">
            <h2>A continuación vamos a detallarte las instrucciones de uso</h2>
            <span class="espaciador"></span>
            <h3>1.Configuración de presupuesto</h3>
            <p>Si aun no lo hiciste, lo primero que necesitas hacer es ingresar a la sección de presupuesto y configurar tu nombre, tus ingresos y los porcentajes destinados a cada cuenta.</p>
            <span class="espaciador"></span>
            <h3>2.Comenzar con el ingreso de gastos</h3>
            <p>Ingresa a la sección de "Gastos" y realizá con la carga de los datos solicitados para registrar nuevos gastos asociados a tus cuentas.</p>
            <span class="espaciador"></span>
            <h3>3.Visualizá tu resumen financiero</h3>
            <p>Ingresa a la sección "Resumen" y realizá el seguimiento de tus gastos de acuerdo con tu presupuesto configurado</p>
            <span class="espaciador"></span>
        </div>
    `;
    //Cargamos los datos de base
    redibujarDOM();
}

//Prepara todos los componentes para utilizar la sección de configuración de presupuesto
function setearSeccionPresupuesto()
{
    let formularioPresupuesto= document.getElementById("formularioConfiguración");
    formularioPresupuesto.addEventListener("submit", guardarConfiguracion);
}

//evento asociado al guardado de la configuración del sistema
function guardarConfiguracion(e)
{
    e.preventDefault();

    let usuario = document.getElementById("nombre").value;
    let ingresos =  document.getElementById("ingresos").value;
    let ahorros =  document.getElementById("ahorros").value;
    let mercado = document.getElementById("mercado").value;
    let otrosGastos = document.getElementById("otrosGastos").value;
    let gastosFijos = document.getElementById("gastosFijos").value;

    if((ahorros + mercado + otrosGastos + gastosFijos) != 100)
    {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Los porcertajes de ahorros, mercado, gastos fijos y otros gastos deben sumar en total 100%. Por favor corregir y volver a intentar',
            showConfirmButton: true
        })
    }
    else
    {
        
        almacenarConfiguración(usuario, ingresos, ahorros, mercado, otrosGastos, gastosFijos);
    
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se guardó correctamente la configuración',
            showConfirmButton: false,
            timer: 2000
        })

        cargarMenuPresupuesto();
    }
}

function cargarMenuPresupuesto()
{
    console.log("Menu presupuesto");
    menuHome.className = "nav-link";
    menuGastos.className = "nav-link";
    menuResumen.className = "nav-link";
    menuPresupuesto.className = "nav-link active";

    setearTitulo("Configuración del sistema");

    containerMain.innerHTML+=`
        <div class="containerColumn">
            <form id="formularioConfiguración" class="form" action="" method="POST">
                <h2>Por favor actualizá los siguientes datos:</h2>
                <div>
                    <label for="Nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required> 
                </div>
                <div>
                    <label for="ingresos">Ingresos</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="ingresos" name="ingresos" required placeholder="100000.00"> 
                </div>
                <div>
                    <label for="ahorros">% Ahorros</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="ahorros" name="ahorros" required placeholder="40.00"> 
                </div>
                <div>
                    <label for="mercado">% Mercado</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="mercado" name="mercado" required placeholder="25.00"> 
                </div>
                <div>
                    <label for="gastosFijos">% Gastos Fijos</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="gastosFijos" name="gastosFijos" required placeholder="20.00"> 
                </div>
                <div>
                    <label for="otrosGastos">% Otros Gastos</label>
                    <input type="text" pattern="^[0-9]*(\.[0-9]{1,2})*$" id="otrosGastos" name="otrosGastos" required placeholder="15.00"> 
                </div>
                <span class="espaciador"></span>
                <div>
                    <input type="submit" value="Guardar" class="btn btn-success" id="botonGuardarConfig">
                </div>
                <span class="espaciador"></span>
            </form>
        </div> 

        <div class="containerColumn">
            <span class="espaciador"></span>    
            <h2>¡SECCION DE PELIGRO!</h2>
            <h2>Eliminar todos los gastos cargados</h2>
            <button class="btn btn-danger" onclick="eliminarGastos()">Eliminar Gastos</button>
            <span class="espaciador"></span>
            <h2>Eliminar todas las configuraciones</h2>
            <button class="btn btn-danger" onclick="eliminarConfiguraciones()">Eliminar Configuraciones</button>
            <span class="espaciador"></span>
        </div>
    `;

    let ingresos = document.getElementById("ingresos");
    let usuario = document.getElementById("nombre");
    let ahorros = document.getElementById("ahorros");
    let mercado = document.getElementById("mercado");
    let gastosFijos = document.getElementById("gastosFijos");
    let otrosGastos = document.getElementById("otrosGastos");

    ingresos.value = montoIngresos;
    usuario.value = nombreUsuario;
    ahorros.value = porcentajeAhorros;
    mercado.value = porcentajeMercado;
    gastosFijos.value = porcentajeGastosFijos;
    otrosGastos.value = porcentajeOtrosGastos;

    setearSeccionPresupuesto()

    //Cargamos los datos de base
    redibujarDOM();
}

//disparo una SA para confirmar la eliminación de configuraciones
function eliminarConfiguraciones()
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "Esta eliminación será definitiva y no podrás revertirla! Todos los datos de configuración serán eliminados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimina todo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarConfiguraciones();
            swalWithBootstrapButtons.fire(
            'Eliminar!',
            'Las configuraciones fueron eliminadas.',
            'success'
            )
        } 
        else if ( result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tus configuraciones están a salvo!',
            'error'
            )
        }
    })

    obtenerDatosDeLocalStorage();
    cargarMenuHome();
}

function eliminarGastos()
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "Esta eliminación será definitiva y no podrás revertirla! Todos los gastos cargados hasta el momento serán eliminados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimina todo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarGastos();
            swalWithBootstrapButtons.fire(
            'Eliminar!',
            'Todos los gastos fueron eliminados.',
            'success'
            )
        } 
        else if ( result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tus gastos están a salvo!',
            'error'
            )
        }
    })

    obtenerDatosDeLocalStorage();
    cargarMenuHome();
}


function cargarMenuResumen()
{
    console.log("Menu resumen");
    menuGastos.className = "nav-link";
    menuHome.className = "nav-link";
    menuResumen.className = "nav-link active";
    menuPresupuesto.className = "nav-link";

    setearTitulo("¡" + nombreUsuario + " este es tu resumen financiero!");

    calcularResumen();

    containerMain.innerHTML+=`
    <div class="containerColumn">
    </div>
    <div class="containerColumn">
        <div class="containerRow">
            <div class="cardFifty">
                    <h2 class="text-center">INGRESOS</h2>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + montoIngresos}</h3>
            </div>
            <div class="cardFifty">
                    <h2 class="text-center">EGRESOS</h2>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + (totalGastosFijos + totalMercado + totalOtrosGastos)}</h3>
            </div>
            <div class="cardMain">
                    <h2 class="text-center">AHORROS</h2>
                    <h3 class="text-center">${porcentajeAhorros + " %"}</h3>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + totalAhorros}</h3>
            </div>
            <div class="cardResumen">
                    <h2 class="text-center">OTROS GASTOS</h2>
                    <h3 class="text-center">${porcentajeOtrosGastos + " %"}</h3>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + montoIngresos * (porcentajeOtrosGastos/100)}</h3>
                    <p class="text-center">Consumido</p>
                    <h3 class="text-center">${"$" + totalOtrosGastos}</h3>
                    <p class="text-center">Saldo</p>
                    <h3 class="text-center">${"$" + (montoIngresos * (porcentajeOtrosGastos/100) - totalOtrosGastos)}</h3>
            </div>
            <div class="cardResumen">
                    <h2 class="text-center">MERCADO</h2>
                    <h3 class="text-center">${porcentajeMercado + " %"}</h3>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + montoIngresos * (porcentajeMercado/100)}</h3>
                    <p class="text-center">Consumido</h3>
                    <h3 class="text-center">${"$" + totalMercado}</p>
                    <p class="text-center">Saldo</p>
                    <h3 class="text-center">${"$" + (montoIngresos * (porcentajeMercado/100) - totalMercado)}</h3>
            </div>
            <div class="cardResumen">
                    <h2 class="text-center">GASTOS FIJOS</h2>
                    <h3 class="text-center">${porcentajeGastosFijos + " %"}</h3>
                    <p class="text-center">Total</p>
                    <h3 class="text-center">${"$" + montoIngresos * (porcentajeGastosFijos/100)}</h3>
                    <p class="text-center">Consumido</p>
                    <h3 class="text-center">${"$" + totalGastosFijos}</h3>
                    <p class="text-center">Saldo</p>
                    <h3 class="text-center">${"$" + (montoIngresos * (porcentajeGastosFijos/100) - totalGastosFijos)}</h3>
            </div>
        </div>
    </div>
    `;

    redibujarDOM();
}


menuGastos.onclick = () =>
{
    cargarMenuGastos();
}

menuHome.onclick = () =>
{
    cargarMenuHome();
}

menuResumen.onclick = () =>
{
    cargarMenuResumen();
}

menuPresupuesto.onclick = () =>
{
    cargarMenuPresupuesto()
}