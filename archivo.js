const URLJSON = "datos.json";

//Operaciones
// Division
const division = (dividendo, divisor) => {
  return dividendo / divisor;
};
// Suma
const suma = (numero1, numero2) => {
  return numero1 + numero2;
};
// Multiplicacion
const multiplicacion = (numero1, numero2) => {
  return numero1 * numero2;
};

//Funciones
// Funcion para calcular la inflacion acumulada en el pago de la cuota
const cuotaajustada = (precio, inflacionmensual, numerocuota) => {
  return precio * (1 - inflacionmensual * numerocuota);
};
// Funcion para calculo de inflacion acumulada
const inflacionAcumulada = () => {
  return multiplicacion(cantidadCuotas, calculoinflacionmensual());
};
// Funcion para calcular la tasa de interes del producto en cuotas.
const tasadeinteres = (precio1, precio2) => {
  return (precio1 / precio2 - 1) * 100;
};
// Tasa de interes
const calculotasadeinteres = () => {
  return Math.round(tasadeinteres(precioCuotas, precioContado));
};
// Funcion para pedir informacion: precio contado, en cuotas, cant de cuotas.
const pedirInformacion = () => {
  precioContado = parseInt(inputpreciocontado);
  precioCuotas = parseInt(inputpreciocuotas);
  cantidadCuotas = parseInt(inputcuotas);
};
// Funcion para obtener inputs
const obtenerinputs = () => {
  inputpreciocontado = $("#inputpreciocontado").val();
  inputpreciocuotas = $("#inputpreciocuotas").val();
  inputcuotas = $("#inputcuotas").val();
};
// Funcion para mostrar en HTML resultados
const imprimirhtml = () => {
  $("#conclusionfinal")
    .slideUp("slow")
    .empty()
    .append(`${queconviene()}`)
    .css("display", "flex")
    .slideDown("slow");
  $("#padre")
    .slideUp("slow")
    .empty()
    .append(
      `<div class=flexbox1>
      <div class=card3>Pais: ${inputpais.nombre}</div>
      <div class=card3>Inflacion mensual de tu pais: ${parseFloat(
        calculoinflacionmensual() * 100
      ).toFixed(1)}%</div>
      <div class=card3> Inflacion acumulada en el ultimo mes: ${parseFloat(
        inflacionAcumulada() * 100
      ).toFixed(1)}%</div>
    </div>
    <div class=flexbox2>
      <div class=card3>Precio contado: $${precioContado}</div>
      <div class=card3> Precio final en cuotas: $${precioCuotas}</div>
      <div class=card3> Precio estimado al contado en ultimo mes: $${precioContadoUltimaCuota().toFixed(
        0
      )}</div>
    </div>
    <div class=flexbox3>
      <div class=card3>Cuotas a pagar: ${cantidadCuotas}</div>
      <div class=card3>Tasa de interes: ${calculotasadeinteres()}%.</div>
    </div>
    
    `
    )
    .css("display", "flex")
    .slideDown("slow");
};
// Evento para enviar inputs
$("#boton").click(function () {
  resetdevariables();
  obtenerinputs();
  pedirInformacion();
  verificacionPais();
  calculotasadeinteres();
  listadecuotas();
  sumadecuotasajustadas();
  queconviene();
  imprimirhtml();
});

// Funcion calculo de precio al contado en el ultimo mes
const precioContadoUltimaCuota = () => {
  return multiplicacion(suma(1, inflacionAcumulada()), precioContado);
};

// Funcion para saber que conviene comprar
const queconviene = () => {
  if (valortotalcuotasajustadas >= precioContado) {
    return "Te conviene comprar al contado, ya que la inflacion no va a amortiguar el interes.";
  } else {
    return "Te conviene comprar en cuotas, ya que la inflacion va a amortiguar el interes.";
  }
};

//Funcion para calculo de Inflacion Mensual
const calculoinflacionmensual = () => {
  return division(inputpais.inflacion, 12);
};

// Constructor de Pais.
class Pais {
  constructor(nombre, moneda, inflacion) {
    this.nombre = nombre;
    this.moneda = moneda;
    this.inflacion = inflacion;
  }
}

// Funcion para verificar el pais
const verificacionPais = () => {
  if (inputpais == "arg") {
    inputpais = arg;
  } else if (inputpais == "chi") {
    inputpais = chi;
  } else if (inputpais == "uru") {
    inputpais = uru;
  }
};

// Funcion para crear arrays de cuotas
const listadecuotas = () => {
  for (let i = 0; i <= cantidadCuotas - 1; i++) {
    valorcuotas.push(division(precioCuotas, cantidadCuotas));
    valorcuotasajustadas.push(
      cuotaajustada(valorcuotas[i], calculoinflacionmensual(), i + 1)
    );
  }
};

//Funcion para sumar arrayas de cuotas
const sumadecuotasajustadas = () => {
  for (let j = 0; j < valorcuotasajustadas.length; j++) {
    valortotalcuotasajustadas += valorcuotasajustadas[j];
  }
};

//Funcion para resetear array
const resetdevariables = () => {
  valorcuotas.length = 0;
  valorcuotasajustadas.length = 0;
  valortotalcuotasajustadas = 0;
};

// Inicializacion de variables, objetos y arrays
let valortotalcuotasajustadas = 0;
const valorcuotas = [];
const valorcuotasajustadas = [];
let paises = [];

//Seleccion de pais
$("#enviarpais").click(() => {
  let entradapais = $("#inputpais").val();
  if (entradapais == "arg") {
    inputpais = arg;
  } else if (entradapais == "chi") {
    inputpais = chi;
  } else if (entradapais == "uru") {
    inputpais = uru;
  }
  paisguardado = JSON.stringify(inputpais);
  localStorage.setItem("paisguardado", paisguardado);
  $("#avisopais")
    .slideUp()
    .empty()
    .append(`<p>Se selecciono ${inputpais.nombre}.</p>`)
    .slideDown();
});

//Funcion para avisar pais seleccionado
const avisodepaisguardado = () => {
  inputpais = JSON.parse(localStorage.getItem("paisguardado"));
  verificacionPais();
  if (inputpais != null) {
    $("#avisopais")
      .empty()
      .append(`<p>El pais seleccionado es ${inputpais.nombre}.</p>`);
  }
  if (inputpais == null)
    $("#avisopais")
      .empty()
      .append(
        `<p>No hay pais seleccionado. Por favor, seleccione un pais.</p>`
      );
};

// Funcion para traer paises de JSON
$(document).ready(() => {
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      misDatos = respuesta;
      arg = new Pais(
        misDatos[0].nombre,
        misDatos[0].moneda,
        misDatos[0].inflacion
      );
      chi = new Pais(
        misDatos[1].nombre,
        misDatos[1].moneda,
        misDatos[1].inflacion
      );
      uru = new Pais(
        misDatos[2].nombre,
        misDatos[2].moneda,
        misDatos[2].inflacion
      );
      paises.push(arg, chi, uru);
    }
  });
});

//Funcion para verificar inputs
const checkinput = () => {
  if (
    $("#inputcuotas").val() != 0 &&
    $("#inputpreciocontado").val() != 0 &&
    $("#inputpreciocuotas").val() != 0
  ) {
    $("#boton").prop("disabled", false);
  } else {
    $("#boton").prop("disabled", true);
  }
};

//Aplicacion
avisodepaisguardado();
$("#boton").prop("disabled", true);
$("input").change(() => {
  checkinput();
});
