// Este proyecto es para uso de una cooperativa de servicios públicos que alquila una retroexcavadora y camión.
// Realiza la carga del cliente, sea o no socio, horas de uso de las maquinas y presupuesta el uso de los mismos.
// Tiene tarifas diferenciadas para socios y no socios.
// Al final permite listar los clientes con sus presupuestos. 

const datos = {
    usuario: "roberto",
    contrasenia: "123",
    ingreso: false
}
const tarifaRetro = [47000, 57000]  // Tarifa para socio y para no socio
const tarifaCamion = [43000, 53000] // Tarifa para socio y para no socio

const clientes=[] //array de objetos que guardará los clientes y su presupuesto asociado
let intentos = 0;
const maxCantidadIntentos = 3

function login(intentos, maxCantidadIntentos) {
    // Funcion para logeo
    alert(`Tiene ${maxCantidadIntentos} intentos posibles de ingresar, este es su intento ${intentos + 1}`)
    let usuarioIngresado = prompt("Ingrese usuario")
    let usuarioLower = usuarioIngresado.toLowerCase()
    let constraseniaIngresada = prompt("ingrese la contrasenia")
    if ((datos.usuario === usuarioLower) && (datos.contrasenia === constraseniaIngresada)) {
        alert("Bienvenido")
        datos.ingreso = true
        return datos
    } else {
        alert(`Datos erróneos. Le quedan ${maxCantidadIntentos - (intentos + 1)} intentos`)
    }
}

function loginLoop(intentos, maxCantidadIntentos) {
    // Ciclo de logeo
    do {
        if (login(intentos, maxCantidadIntentos)) {
            break
        }
        intentos++
    } while (intentos < maxCantidadIntentos)
}

function calculo(retro, camion) { 
    let costo = 0
    if (cliente.socio) {
        costo = retro * tarifaRetro[0] + camion * tarifaCamion[0]
    } else {
        costo = retro + tarifaRetro[1] + camion * tarifaCamion[1]
    }
    return costo
}

function cargarHora (equipo) {
    hora = parseFloat(prompt("Ingrese horas " + equipo + " (para decimal '.' no use ',')"))
    if(Number.isNaN(hora)){
        alert("Solo se permiten numeros y . para decimales")
        cargarHora(equipo)
    } else if (hora < 0) {
        alert("Las horas no pueden ser negativas")
        cargarHora(equipo)
    } return hora
    }

const agregarCliente = () => { 
    //Permite ingreso de nombre y apellido del cliente y horas de retro y/o camion a presupuestar
    const nombre = prompt('Ingrese el nombre y apellido del cliente')
    const socio = confirm('Si es socio "Aceptar" ni no lo es "Cancelar"')
    const horaretro = cargarHora("retroexcavadora") 
    const horacamion = cargarHora("camión")
    const cliente = { nombre: nombre, socio: socio, horaretro: horaretro, horacamion: horacamion, presupuesto: 0 }
    return cliente
}


//Inicio

loginLoop(0, 3);

let continuar = true
while (datos.ingreso && continuar) {
    //Cuerpo principal que llama a funcion de carga clientes y calculo de presupuesto. Finalmente muestra resultado
    cliente = agregarCliente()
    cliente.presupuesto = calculo(cliente.horaretro, cliente.horacamion)
    alert(`Presupuesto para ${cliente.nombre} por ${cliente.horaretro} hs retro y ${cliente.horacamion} hs camion resulta ${cliente.presupuesto} +IVA`)
    clientes.push(cliente)
    continuar = confirm('Desea hacer otro calculo? "Cancelar" para salir')
}
alert('Se listaran del primero al último de los presupuestos calculados')
for (const cliente of clientes){
    alert(`Presupuesto para ${cliente.nombre} por ${cliente.horaretro} hs retro y ${cliente.horacamion} hs camion resulta ${cliente.presupuesto} +IVA`)
}

