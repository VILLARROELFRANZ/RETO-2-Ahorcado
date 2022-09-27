let palabras = [
    'ATUN', 'HELADO', 'LLUVIA', 'ZAPATO', 'GEMELOS', 'CERVEZA', 'WHISKI', 'NARANJA', 'PICANTE', 'AMOR', 'PATO', 'AVION', 'TOMATE', 'OJO', 'CIELO',
    'YATE', 'JUGO', 'ROJO', 'MAR', 'TSUNAMI', 'PIZZA', 'BURRITO', 'SOLEADO', 'LUZ', 'VIENTO', 'TORRE', 'CAOS', 'GATO', 'KOALA', 'DRAGON', 'LEON',
    'CARRO', 'PATINES', 'ESTUFA', 'ENCHUFE', 'MONITOR', 'PIEZAS', 'AJEDREZ', 'YAUTIA', 'MANZANA', 'ESTUCHE', 'CINTURA', 'CABELLO',
    'SOL', 'MALO', 'BUENO', 'NEUTRO', 'GENIAL', 'OSCURO', 'TIEMPO', 'HIELO', 'QUIETO', 'PINTURA', 'IGUALES', 'BONITO', 'FEO', 'CELULAR', 'MARATON',
    'MASCOTA', 'BUHO', 'MAPACHE', 'HILO', 'ARO', 'TIERNO', 'CABALLO', 'PELUCA', 'TIJERAS', 'ALGODON', 'CALVO', 'REPTIL', 'HOYO', 'CASA', 'FRESA',
    'CHICLE', 'UVAS', 'TORO', 'LOCURA', 'ANDROID', 'ROBOT', 'MUERTO', 'POLLO', 'HUEVO'
]

let fondo = "#d4dcdf", color = "#0a3871";

/**
 * Lista de las letras incorrectas que se presionan
 * @type {Array<string>}
 */
let palabras_incorrectas = [];

/**
 * Lista de las letras correctas que se presionan
 * @type {Array<string>}
 */
let  palabras_correctas = [];

let lienzo = document.querySelector(".munheco");
let pincel = lienzo.getContext("2d");

let lienzo2 = document.querySelector(".letras");
let lapiz = lienzo2.getContext("2d");

/**
 * Conteo de la creacion del muñeco
 */
let cont = 0;

/**
 * Palabra secreta seleccionada
 */
let secreto = "";

/**
 * Indica si se termino o no el juego
 */
let termino = false;

/**
 * Indica la palabra secreta anterior
 */
let anterior = 0;

/**
 * Tamaño de cada guion de letra
 */
let width = 50;

/**
 * Espacio entre cada guion de letra
 */
let espaciado = 20;

let cantidad_total = 0;

/**
 * Crea extremidades para el muñeco del ahorcado
 * @param {number} x Indica la posición horizontal de donde comienzan las extremidades
 * @param {number} y Indica la posición vertical de donde comienzan las extremidades
 * @param {string} lado Indica de que lado del cuerpo es la extremidad
 */
 function extremidades (x, y, lado) {

    // Apertura de las extremidades
    let apertura = 30;

    // Longitud de las extremidades
    let largo = 50;

    // Grosor de las extremidades
    let grosor = 6;

    // Se establece el color de las extremidades
    pincel.fillStyle = color;

    // Se crea el origen  de la extremidad
    pincel.beginPath();
    pincel.moveTo(x, y);

    // Se crea la extremidad ya sea del lado izquierdo o derecho
    pincel.lineTo(lado === 'izquierda' ? x - apertura : x, y + largo);
    pincel.lineTo(lado === 'izquierda' ? x : x + apertura, y + largo);
    pincel.fill();

    // Se establece el color del espacio entre la extremidad y el torso
    pincel.fillStyle = fondo;

    // Se crea el origen del espacio del entre la extremidad y el torso
    pincel.beginPath();
    pincel.moveTo(x, y + grosor + 3);

    // Se crea la extremidad ya sea del lado izquierdo o derecho
    pincel.lineTo(lado === 'izquierda' ? x - apertura + grosor : x, y + largo);
    pincel.lineTo(lado === 'izquierda' ? x : x + apertura - grosor, y + largo);
    pincel.fill();
}

/**
 * Limpia el area del juego
 */
function limpiar_juego () {
    
    // Borra el muñeco
    pincel.fillStyle = fondo;
    pincel.fillRect(0, 0, lienzo.width, lienzo.height - 5);

    // Borra las letras incorrectas de la pantalla
    lapiz.fillStyle = fondo;
    lapiz.fillRect(0, 110 - 30, lienzo2.width, 36);

    // Resetea el conteo de las partes del muñeco
    cont = 0;

    // Se indica que el juego volvio a empezar
    termino = false;

    // Se eliminan todas las letras incorrectas alamacenadas
    palabras_incorrectas = [];

    // Se eliminan todas las letras correctas alamacenadas
    palabras_correctas = [];
}

/**
 * Se crea el muñeco del ahorcado
 */
function dibujo () {

    // Se establece el color del palo del ahorcado
    pincel.fillStyle = color;
    
    /**
     * Indica el grosor de los elementos
     */
    let grosor = 5;

    /**
     * Indica la posición horizontal de los elementos
     */
    let x = 0;

    /**
     * Indica la posición vertical de los elementos
     */
    let y = lienzo.height - grosor;

    /**
     * Indica el largo del elemento
     */
    let tamanho = 210;
    
    // Se crea la base
    if (cont == 0) pincel.fillRect(x, y, tamanho, grosor);
    
    // Se reconfigura a partir de la coordenada vertical y el grosor 
    tamanho = lienzo.height - 50;

    // Se reconfigura la corrdenada horizontal
    x = 40;

    // Se reconfigura la coordenada vertical
    y = 50;

    // Se crea el pilar
    if (cont === 1) pincel.fillRect(x, y, grosor, tamanho);
    
    // Se reconfigura el largo del elemento
    tamanho = 110;

    // Se crea el palo vertical
    if (cont === 2) pincel.fillRect(x, y, tamanho, grosor);
    
    // Se reconfigura la coordenada vertical a partir de la vieja coordenada y el largo del elemento
    x += tamanho;

    // Se reconfigura el largo del elemento
    tamanho = 25;

    // Se crea la soga
    if (cont === 3) pincel.fillRect(x, y, grosor, tamanho);

    // Se establece el radio de la cabeza
    let radio = 22;

    // Se establece la coordenada vertical a partir del radio y el largo del elemento
    y = tamanho + radio + 50;

    // Se crea la cabeza
    if (cont === 4) {

        pincel.beginPath();
        pincel.arc(x + 2, y, radio, 0, 2 * 3.14);
        pincel.fill();

        // Se reduce el radio de la cabza
        radio -= 5;
    
        // Se establece el color de vacio de la cabeza
        pincel.fillStyle = fondo;
    
        // Se crea el vacio de la cabeza
        pincel.beginPath();
        pincel.arc(x + 2, y, radio, 0, 2 * 3.14);
        pincel.fill();
    }
    
    // Se establece una nueva coordenada vertical sumando la antigua coordenada mas el radio de la cabeza
    y += radio - 2;

    // Se establece el color del torso
    pincel.fillStyle = color;

    // Se crea el torso del cuerpo
    tamanho = 70;
    if (cont === 5) pincel.fillRect(x, y, grosor, tamanho);

    // Se crea el brazo izquierdo
    if (cont === 6) extremidades(x , y, "izquierda");

    // Se crea el brazo derecho
    if (cont === 7) extremidades(x + grosor, y, "derecha");
    
    let legs = y + tamanho - grosor - 3;

    // // Se crea la pierna izquierda
    if (cont === 8) extremidades(x, legs, "izquierda");

    // // Se crea la pierna derecha
    if (cont === 9)extremidades(x + grosor, legs, "derecha");
}

/**
 * Devuelve la longitud del espacio de la palabra o la posicion de una letra
 * @param {number} longitud Indica la posicion de una letra o la longitud de la palabra
 * @returns {number} Devuelve la posicion de una letra especificada o el ancho de la palabra especificada
 */
function posicion_letras (longitud) {

    return (width * longitud) + (espaciado * (longitud - 1));
}

/**
 * Crea guiones para cada letra de la palabra secreta
 */
function guiones_letras () {

    // Se establece el ancho de los guiones de las letras a partir de la longitud de la palabra secreta
    lienzo2.width = posicion_letras(secreto.length) + 10;
    
    // Se establece el color de los guiones
    lapiz.fillStyle = color;

    // Se crea un guion para cada letra de la palabra secreta
    for (let x = 0; x < lienzo2.width - 5; x += width + espaciado) {

        x = x || 5;
        lapiz.fillRect(x, 50, width, 5)
    };
}

/**
 * Muestra y oculta elementos especificados por su clase
 * @param {string} ocultar Oculta un elemento especificado 
 * @param {string} mostrar Muestra un elemento especificado
 */
function visualizar (ocultar, mostrar) {

    document.getElementsByClassName(ocultar)[0].classList.add("oculto");
    document.getElementsByClassName(mostrar)[0].classList.remove("oculto");
}

/**
 * Elige una palabra secreta y comienza el juego
 */
function palabra_secreta () {

    // Limpiar el juego anterior
    limpiar_juego();

    // Generar una palaabra aleatoria que no sea igual a la anterior
    let aleatorio = 0;
    do {
        aleatorio = Math.ceil(Math.random() * palabras.length - 1);

    } while (aleatorio === anterior);

    // Establecer la palabra aleatoria como la anterior para la siguiente vez
    anterior = aleatorio;

    // Guardar la palabra secreta
    secreto = palabras[aleatorio];

    // Se rellena la lista de letra correctas con los espacios acorde a la cantidad de letras que tiene la palabra secreta
    for (let x = 0; x < secreto.length; x++) palabras_correctas.push("");

    // Crear los guiones de las letras acorde a la longitud de la palabra
    guiones_letras();
}

/**
 * Muestra un mensaje de que termino el juego
 * @param {string} modo Indica de que modo se termino el juego 
 */
function mensaje (modo) {

    // Se establece el tipo de fuente y tamaño que tendran las letras
    let {clientWidth: tamanho_body} = document.getElementsByTagName("body")[0];

    // Se declara el texto superior e inferior
    let texto1 = "", texto2 = "";
    
    // Si se termino el juego debido a que acerto la palabra entonces se muestra un mensaje de que gano el juego en color verde
    if (modo === "gano") {
        
        pincel.fillStyle = "#44bd32";
        texto1 = "Ganaste,";
        texto2 = "felicidades!";
    }
    
    // Si se termino el juego debido a que se completo el muñeco entonces se muestra un mensaje de fin del juego en color rojo
    if (modo === "perdio") {
        
        pincel.fillStyle = "#c0392b";
        texto1 = "Fin del";
        texto2 = "juego";
    }

    // Si el tamaño de la pagina web es mayor o igual a 500px entonces...
    if (tamanho_body >= 510) {

        // Se establece el tamaño de la fuente dependiendo del tamaño de la pagina web
        let font_size = tamanho_body >= 600 ? 32 : 24;
        pincel.font = font_size + "px Arial";
    
        // Se establecen las coordenadas horizontales y verticales
        let x = 230, y = 40;
    
        // Se ingresa la primera linea de texto
        pincel.fillText(texto1, x, y);
    
        // Se ingresa la segunda linea de texto
        pincel.fillText(texto2, x, y + font_size + 8);
    }
    // Si el tamaño de la pagina web es menor a 510px
    else {

        // Se establece el tamaño de la fuente dependiendo del tamaño de la pagina web
        let font_size = tamanho_body >= 350 ? 28 : 24;
        pincel.font = font_size + "px Arial";

        // Se imprime el mensaje final
        pincel.fillText(texto1 + " " + texto2, 0, 20);
    }

    // Se indica que se termino el juego
    termino = true;
}

/**
 * Inserta las letras correctas en su respectiva posicion
 * @param {string} letra Letra del abecedario 
 * @param {number} indice Indica la posicion de la letra en la palabra secreta
 */
function letra_correcta (letra, indice) {

    // Se obtiene el tamaño actual de la pagina web
    let {clientWidth: tamanho_body} = document.getElementsByTagName("body")[0];

    // Se establece el tamaño de fuente de las letras dependiendo del tamaño de la pagina web
    let size = tamanho_body >= 450 ? 40 : 24;

    // Se establece el alineamiento de las letras
    let left = tamanho_body >= 450 ? 20 : 15;

    // Se inserta la letra en su posicion especificada dependiendo del tamaño de la pagina web
    lapiz.font = size + "px Arial";
    lapiz.fillText(letra, posicion_letras(indice) + left, 35);

    // Si se completo la palabra secreta entonces se manda el mensaje de que gano
    if (secreto.trim().length === 0) mensaje("gano");
}

/**
 * Completa el muñeco a medida que se presiona las teclas incorrectas y muestra las letras incorrectas
 */
function letra_incorrecta () {
    
    let {clientWidth: tamanho_body} = document.getElementsByTagName("body")[0];

    // Se hace un retroceso a partir del total de letras incorrectas
    let back = (palabras_incorrectas.length - 1) * (tamanho_body >= 450 ? 10 : 5);
    
    // Indica a partir de donde se comenzara a escribir las letras
    let x = lienzo2.width/2 - 10 - back;

    // Se borra cualquier lista de letra que hubo antes
    lapiz.fillStyle = fondo;
    lapiz.fillRect(0, 110 - 30, lienzo2.width, 36);
    
    // Se inserta la lista de letras incorrectas nuevas
    lapiz.fillStyle = color;
    
    let font = tamanho_body >= 450 ? 18 : 12; 
    lapiz.font = font + 'px Verdana';
    lapiz.fillText(palabras_incorrectas.join(" "), x, 100);

    // Si se completa el muñeco entonces se manda el mensaje de que perdio
    console.log(cont);
    if (cont === 9) mensaje("perdio")
}

/**
 * Comprueba que tecla se presiono y el curso de accion a seguir
 */
function comprobar_letras () {

    let {value: datos} = this;
    if (datos.length >= cantidad_total) {

        // Se comprueba si no se ha terminado el juego
        if (!termino) {

            // Convertir la vocal en mayusula
            let vocales = datos.at(-1).toUpperCase();

            // Se comprueba si la tecla presionada no es ni numero ni un ccaracter especial
            if (/[a-zA-Z]/g.test(vocales)) {
        
                // Se comprueba si la vocal presionada esta o no en la palabra secreta
                let indice = secreto.indexOf(vocales);
        
                // Si la letra esta en la palabra secreta entonces...
                if (indice > -1) {
                
                    // Se elimina la letra de la palabra para encontrar su siguiente aparicion
                    secreto = secreto.replace(vocales, " ");

                    // Se agrega la letra correcta a la lista de palabras correctas
                    palabras_correctas[indice] = vocales;

                    // Se imprime la letra correcta
                    letra_correcta(vocales, indice);
                }
                // Si la letra no esta en la palabra secreta entonces...
                else {

                    // Se comprueba si ya se habia presionada esa letra incorrecta
                    let index = palabras_incorrectas.indexOf(vocales);

                    // Si no se habia presionada esa letra entonces...
                    if (index === - 1) {

                        // Se agregan mas parte del muñeco
                        cont++;
                        dibujo();

                        // Se inserta la letra incorrecta en la lista de letras incorrectas
                        palabras_incorrectas.push(vocales);

                        // Se imprimen la lista de las palabras correctas en la pantalla
                        letra_incorrecta();
                    }
                }
            }
        }
    }
    cantidad_total = datos.length;
}

/**
 * Detecta cualqueir cambio en el tamaño de la pagina web y hace que los elementos se ajusten a su tamaño
 */
 function observar_tamanho () {

    // Se obtiene el tamaño de la pagina web
    let {clientWidth: tamanho_body} = document.getElementsByTagName("body")[0];

    // Se establece el tamaño del contenedor del muñeco a partir de la mitad del tamaño de la pagina web
    lienzo.width = (tamanho_body * .5) + 100;

    // Se alamcena la cantidad de partes en que se completa el muñeco
    let replay = cont;

    // Se resetea la cantidad de partes que se completa el muñeco
    cont = -1;

    // Se completa el muñeco a como se iba componiendo
    do {
        cont++;
        dibujo();

    } while (cont < replay);
    
    // Se establece el tamaño de los guiones a partir de cual es el tamaño de la pagina web
    width = tamanho_body >= 450 ? 50 : 30;

    // Se establece el tamaño de los guiones a partir de cual es el tamaño de la pagina web
    espaciado = tamanho_body >= 450 ? 10 : 8;

    // Se vuelven a imprimir los guiones de palabras
    guiones_letras();

    // Se vuelven a imprimir las letras correctas escritas
    palabras_correctas.forEach((element, index) => letra_correcta(element, index));

    // Se vuelven a imprimir las letras incorrectas
    letra_incorrecta();
}

/**
 * Ingresa nuevas palabras secretas para el juego que cumplan con los requisitos
 * @param {*} e 
 */
 function agregar_palabras (e) {

    // Se evita la accion del boton submit
    e.preventDefault();

    // Se obtiene el valor del input
    let {value: nueva_palabra} = document.getElementById("agregar_palabras");

    // Se comprueba si se escribio algo
    if (nueva_palabra !== "") {

        // Se convierte la palabra en mayuscula y se inserta en la lista de palabras secretas
        palabras.push(nueva_palabra.toUpperCase());

        // Se muestra el apartado del juego
        visualizar("agregar_datos", "dibujo");

        // Se inicia el juego
        palabra_secreta();
    }
}

let prueba = document.getElementById("presionar_teclas");

/**
 * Inicia el juego desde el apartado de inicio
 */
function iniciar () {

    // Se muestra el apartado de juego y se oculta el apartado de inicio
    visualizar("comenzar", "dibujo");

    prueba.focus();

    // Se detecta cualqueir cambio en el tamaño de la pagina web
    let observar = new ResizeObserver(observar_tamanho);
    observar.observe(document.getElementsByTagName("body")[0]);

    // Se inicia el juego
    palabra_secreta();
}

document.querySelector(".dibujo").addEventListener("click", _=> prueba.focus());

// Se comprueban las letras presionadas por el usuario
prueba.addEventListener("input", comprobar_letras);

// Cuando se presiona el boton de Iniciar Juego se muestra el apartado del juego y se inicia el juego
let juego = document.getElementById("iniciar");
juego.addEventListener("click", iniciar);

// Cuando se presiona el boton de nuevo juego se carga una nueva palabra secreta
let nuevo_juego = document.getElementById("nuevo");
nuevo_juego.addEventListener("click", palabra_secreta);

// Cuando se presiona el boton de desistir se regresa al apartado de inicio
let regresar_juego = document.getElementById("regresar_juego");
regresar_juego.addEventListener("click", _=> visualizar("dibujo", "comenzar"));

// Cuando se presiona el boton de agregar se muestra el apartado de agregar palabras y oculta el apartado de inicio
let agregar = document.getElementById("agregar");
agregar.addEventListener("click", _=> visualizar("comenzar", "agregar_datos"));

// Cuando se presiona el boton de Cancelar se regresa al apartado de inicio
let regresar_agregar = document.getElementById("regresar_agregar");
regresar_agregar.addEventListener("click", _=> visualizar("agregar_datos", "comenzar"));

// Se guardan las palabra escrita la lista de las palabras del juego
let datos = document.getElementById("enviar_datos");
datos.addEventListener("click", agregar_palabras);


let pruebana = 2 || 24;
console.log(pruebana)