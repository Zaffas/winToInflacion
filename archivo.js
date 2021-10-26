const URLJSON = "https://jsonplaceholder.typicode.com/posts";

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

// Funcion para obtener inputs JQUERY
const obtenerinputs = () => {
  inputpreciocontado = $("#inputpreciocontado").val();
  inputpreciocuotas = $("#inputpreciocuotas").val();
  inputcuotas = $("#inputcuotas").val();
  inputpais = $("#inputpais").val();
};

// Funcion para mostrar en HTML resultados JQUERY
const imprimirhtml = () => {
  $("#padre")
    .slideUp("slow")
    .empty()
    .append(
      `<div class=card>La tasa de interes del pago en cuotas es de: ${calculotasadeinteres()}%.
  El precio final al contado es ${precioContado}, el precio final en cuotas es ${precioCuotas}, la cantidad de cuotas es ${cantidadCuotas}, tu pais es ${
        inputpais.nombre
      }.
  La inflacion mensual de tu pais es de: ${parseFloat(
    calculoinflacionmensual() * 100
  ).toFixed(1)}%.
  La inflacion acumulada en la ultima cuota de tu pago sera de ${parseFloat(
    inflacionAcumulada() * 100
  ).toFixed(1)}%.
  El precio al contado si pagaras en el mes de la ultima cuota es $${precioContadoUltimaCuota().toFixed(
    2
  )}.</div>`
    )
    .css("display", "flex")
    .slideDown("slow");
  $("#conclusionfinal")
    .slideUp("slow")
    .empty()
    .append(`<div class=card>${queconviene()}</div>`)
    .css("display", "flex")
    .slideDown("slow");
};

// Evento para enviar inputs JQUERY
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
  if (inputpais.toLowerCase() == "arg") {
    for (const propiedad in arg) {
    }
    inputpais = arg;
  } else if (inputpais.toLowerCase() == "chi") {
    for (const propiedad in chi) {
    }
    inputpais = chi;
  } else if (inputpais.toLowerCase() == "uru") {
    for (const propiedad in uru) {
    }
    inputpais = uru;
  } else {
    while (inputpais != arg || chi || uru) {
      alert("Pais ingresado no es valido.");
      pedirInformacionPais();
      break;
    }
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
const arg = new Pais("Argentina", "Peso argentino", 0.4);
const chi = new Pais("Chile", "Peso chileno", 0.04);
const uru = new Pais("Uruguay", "Peso uruguayo", 0.07);
const paises = [arg, chi, uru];
paises.sort(function (a, b) {
  return a.inflacion - b.inflacion;
});

// Funcion para guardar su nombre JQUERY
const eventoregistro = () => {
  $("#btnname").click(() => {
    let nombre1 = $("#nombre").val();
    localStorage.setItem("nombre1", nombre1);
    $.post(URLJSON, nombre1, (respuesta, estado) => {
      if (estado === "success") {
        $("#confirmacionAjax")
          .fadeOut()
          .empty()
          .prepend(
            `<div>
Nombre enviado con exito!
</div>`
          )
          .fadeIn();
      }
    });
  });
};

// Funcion para imprimir el nombre JQUERY
const imprimirsaludo = () => {
  let nombreregistrado = localStorage.getItem("nombre1");
  $("#saludo").empty();
  $("#saludo").append(`<div>Hola, ${nombreregistrado}.</div>`);
};

// Aplicacion

eventoregistro();
imprimirsaludo();
