/* ============================================================
   TRABAJOS PRÁCTICOS — ejercicios con solución revelable
   Basados en los TP N°0 a N°3 de Programación 1 (1er año)
   Cada ejercicio: { q: enunciado, sol: solución con código C }
   ============================================================ */
(function () {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const C = src => `<pre class="code">${esc(src.replace(/^\n/, "").replace(/\s+$/, ""))}</pre>`;

  window.APP_DATA = window.APP_DATA || {};
  window.APP_DATA.practica = [

    /* =============================== TP 0 — REPASO =============================== */
    {
      id: "tp0", unit: "intro", glyph: "{}",
      title: "TP N°0 · Repaso de diagramación",
      desc: "Primos, ecuación cuadrática, dígitos, divisores, vectores y polinomios.",
      exercises: [
        {
          q: "<strong>1.</strong> Dado un número entero, indicar si es un número primo.",
          sol: "Un primo solo es divisible por 1 y por sí mismo. Recorremos posibles divisores de 2 a n−1; si encontramos uno, no es primo." + C(`#include <stdio.h>
int main() {
    int n, i, esPrimo = 1;
    printf("Ingrese un numero: ");
    scanf("%i", &n);
    if (n < 2) esPrimo = 0;
    for (i = 2; i < n; i++)
        if (n % i == 0) { esPrimo = 0; break; }
    if (esPrimo) printf("%i es primo\\n", n);
    else         printf("%i NO es primo\\n", n);
    return 0;
}`)
        },
        {
          q: "<strong>2.</strong> Dados los coeficientes de \\(ax^2+bx+c=0\\) (a ≠ 0), mostrar el tipo de solución según el discriminante: dos reales iguales, dos reales distintas o dos complejas conjugadas.",
          sol: "El discriminante es \\(b^2-4ac\\). Si es >0 hay dos reales distintas; si =0, dos reales iguales; si <0, dos complejas conjugadas." + C(`#include <stdio.h>
int main() {
    float a, b, c, disc;
    printf("Ingrese a, b, c: ");
    scanf("%f %f %f", &a, &b, &c);
    disc = b*b - 4*a*c;
    if (disc > 0)       printf("Dos soluciones reales y distintas\\n");
    else if (disc == 0) printf("Dos soluciones reales e iguales\\n");
    else                printf("Dos soluciones complejas y conjugadas\\n");
    return 0;
}`) + "Ej: a=1, b=3, c=2 → disc=1>0 → reales distintas. a=2, b=4, c=4 → disc=−16<0 → complejas conjugadas."
        },
        {
          q: "<strong>3.</strong> Dado un número entero, mostrar cuántos <strong>dígitos primos</strong> posee (2, 3, 5 y 7). Ej: 14583 → 2.",
          sol: "Recorremos los dígitos con <code>%10</code> y <code>/10</code>, y contamos los que sean 2, 3, 5 o 7." + C(`#include <stdio.h>
int main() {
    int n, d, cant = 0;
    printf("Ingrese un numero: ");
    scanf("%i", &n);
    if (n < 0) n = -n;
    while (n > 0) {
        d = n % 10;
        if (d == 2 || d == 3 || d == 5 || d == 7) cant++;
        n = n / 10;
    }
    printf("Cantidad de digitos primos: %i\\n", cant);
    return 0;
}`)
        },
        {
          q: "<strong>4.</strong> Dada una lista de N números naturales, determinar cuántos tienen una cantidad <strong>impar de divisores</strong> (son los cuadrados perfectos).",
          sol: "Para cada número contamos sus divisores; si la cantidad es impar, sumamos. (Curiosidad: solo los cuadrados perfectos tienen una cantidad impar de divisores.)" + C(`#include <stdio.h>
int main() {
    int N, k, x, i, divs, cont = 0;
    printf("Cuantos numeros? "); scanf("%i", &N);
    for (k = 0; k < N; k++) {
        printf("Numero: "); scanf("%i", &x);
        divs = 0;
        for (i = 1; i <= x; i++)
            if (x % i == 0) divs++;
        if (divs % 2 != 0) cont++;
    }
    printf("Con cantidad impar de divisores: %i\\n", cont);
    return 0;
}`)
        },
        {
          q: "<strong>5.</strong> Dado un vector de N enteros, mostrar la <strong>posición del mayor</strong> de ellos.",
          sol: "Guardamos la posición del mayor mientras recorremos." + C(`#include <stdio.h>
#define tam 100
int main() {
    int v[tam], n, i, pos = 0;
    printf("Cantidad: "); scanf("%i", &n);
    for (i = 0; i < n; i++) { printf("v[%i]: ", i); scanf("%i", &v[i]); }
    for (i = 1; i < n; i++)
        if (v[i] > v[pos]) pos = i;
    printf("El mayor es %i en la posicion %i\\n", v[pos], pos);
    return 0;
}`)
        },
        {
          q: "<strong>6.</strong> Dados dos polinomios P(x) y Q(x) de grados n y m (ingresados como vectores de coeficientes), calcular la <strong>suma</strong> S(x).",
          sol: "Cada posición del vector es el coeficiente de \\(x^i\\). Sumamos posición a posición hasta el grado mayor." + C(`#include <stdio.h>
#define tam 50
int main() {
    int P[tam] = {0}, Q[tam] = {0}, S[tam] = {0};
    int n, m, i, mayor;
    printf("Grado de P: "); scanf("%i", &n);
    for (i = 0; i <= n; i++) { printf("P[x^%i]: ", i); scanf("%i", &P[i]); }
    printf("Grado de Q: "); scanf("%i", &m);
    for (i = 0; i <= m; i++) { printf("Q[x^%i]: ", i); scanf("%i", &Q[i]); }
    mayor = (n > m) ? n : m;
    for (i = 0; i <= mayor; i++) S[i] = P[i] + Q[i];
    printf("Coeficientes de S(x):\\n");
    for (i = 0; i <= mayor; i++) printf("x^%i: %i\\n", i, S[i]);
    return 0;
}`)
        },
      ]
    },

    /* =============================== TP 1 — TIPOS SIMPLES Y ENUMERADOS =============================== */
    {
      id: "tp1", unit: "tipos", glyph: "int",
      title: "TP N°1 · Tipos simples y enumerados",
      desc: "Operaciones, calificaciones, Armstrong, vocales, base 2 y enumerados.",
      exercises: [
        {
          q: "<strong>1.</strong> Solicitar dos enteros y mostrar su suma, resta, multiplicación, división (si es posible) y el resto.",
          sol: C(`#include <stdio.h>
int main() {
    int a, b;
    printf("Ingrese dos numeros: ");
    scanf("%i %i", &a, &b);
    printf("Suma: %i\\n", a + b);
    printf("Resta: %i\\n", a - b);
    printf("Multiplicacion: %i\\n", a * b);
    if (b != 0) {
        printf("Division: %i\\n", a / b);
        printf("Resto: %i\\n", a % b);
    } else
        printf("No se puede dividir por cero\\n");
    return 0;
}`)
        },
        {
          q: "<strong>2.</strong> Continuando con el anterior: incrementar el primer número en 1 y el segundo en 5, y mostrar los nuevos valores.",
          sol: C(`int main() {
    int a, b;
    scanf("%i %i", &a, &b);
    a = a + 1;     // o:  a++;
    b = b + 5;     // o:  b += 5;
    printf("Nuevos valores: a = %i, b = %i\\n", a, b);
    return 0;
}`)
        },
        {
          q: "<strong>4.</strong> Pedir una calificación entera de 0 a 100 y mostrar: 0–59 Insuficiente, 60–69 Regular, 70–79 Bueno, 80–89 Muy bueno, 90–100 Excelente.",
          sol: "Con <code>else if</code> encadenado, evaluando de mayor a menor:" + C(`#include <stdio.h>
int main() {
    int nota;
    printf("Ingrese la calificacion (0-100): ");
    scanf("%i", &nota);
    if (nota >= 90)      printf("Excelente\\n");
    else if (nota >= 80) printf("Muy bueno\\n");
    else if (nota >= 70) printf("Bueno\\n");
    else if (nota >= 60) printf("Regular\\n");
    else                 printf("Insuficiente\\n");
    return 0;
}`)
        },
        {
          q: "<strong>7.</strong> Dado un natural N, indicar si es un número de <strong>Armstrong</strong> (igual a la suma de sus dígitos elevados a la cantidad de dígitos). Ej: 153 = 1³+5³+3³.",
          sol: "Primero contamos la cantidad de dígitos; luego sumamos cada dígito elevado a esa potencia." + C(`#include <stdio.h>
#include <math.h>
int main() {
    int n, t, d, nd = 0, suma = 0;
    printf("Ingrese N: "); scanf("%i", &n);
    t = n;
    while (t > 0) { nd++; t = t / 10; }     // cantidad de digitos
    t = n;
    while (t > 0) {
        d = t % 10;
        suma = suma + pow(d, nd);
        t = t / 10;
    }
    if (suma == n) printf("%i ES de Armstrong\\n", n);
    else           printf("%i NO es de Armstrong\\n", n);
    return 0;
}`)
        },
        {
          q: "<strong>8.</strong> Dado un carácter C, indicar si es una <strong>vocal</strong> y cuál es.",
          sol: "Comparamos el carácter contra las vocales (en minúscula y mayúscula) o usamos un <code>switch</code>." + C(`#include <stdio.h>
int main() {
    char c;
    printf("Ingrese un caracter: ");
    scanf("%c", &c);
    switch (c) {
        case 'a': case 'A': printf("Es vocal: A\\n"); break;
        case 'e': case 'E': printf("Es vocal: E\\n"); break;
        case 'i': case 'I': printf("Es vocal: I\\n"); break;
        case 'o': case 'O': printf("Es vocal: O\\n"); break;
        case 'u': case 'U': printf("Es vocal: U\\n"); break;
        default: printf("No es vocal\\n");
    }
    return 0;
}`)
        },
        {
          q: "<strong>9.</strong> Dado un natural N en base 10, mostrar su equivalente en <strong>base 2</strong> (binario).",
          sol: "Vamos tomando el resto de dividir por 2; los restos, leídos al revés, forman el binario. Acá los guardamos en un vector y los mostramos invertidos." + C(`#include <stdio.h>
int main() {
    int n, i = 0, bin[40];
    printf("Ingrese N: "); scanf("%i", &n);
    if (n == 0) printf("0");
    while (n > 0) {
        bin[i] = n % 2;
        n = n / 2;
        i++;
    }
    printf("Binario: ");
    for (i = i - 1; i >= 0; i--)   // al reves
        printf("%i", bin[i]);
    printf("\\n");
    return 0;
}`)
        },
        {
          q: "<strong>11.</strong> Usando <code>enum EstadoSemaforo { ROJO, AMARILLO, VERDE };</code>, inicializar el semáforo en ROJO, cambiarlo a VERDE e imprimir el estado final.",
          sol: C(`#include <stdio.h>
enum EstadoSemaforo { ROJO, AMARILLO, VERDE };
int main() {
    enum EstadoSemaforo semaforo;
    semaforo = ROJO;        // 0
    semaforo = VERDE;       // 2
    printf("Estado final del semaforo: %d\\n", semaforo);  // 2
    return 0;
}`) + "Recordá: ROJO=0, AMARILLO=1, VERDE=2."
        },
      ]
    },

    /* =============================== TP 2 — VECTORES Y CADENAS =============================== */
    {
      id: "tp2", unit: "vectores", glyph: "[i]",
      title: "TP N°2 · Vectores y cadenas",
      desc: "Mayor/menor, invertir, suma, unión de conjuntos, meses, contar letras y palíndromo.",
      exercises: [
        {
          q: "<strong>1.</strong> Pedir 5 enteros, guardarlos en un arreglo y mostrar el más grande y el más pequeño.",
          sol: C(`#include <stdio.h>
int main() {
    int v[5], i, may, men;
    for (i = 0; i < 5; i++) { printf("v[%i]: ", i); scanf("%i", &v[i]); }
    may = v[0]; men = v[0];
    for (i = 1; i < 5; i++) {
        if (v[i] > may) may = v[i];
        if (v[i] < men) men = v[i];
    }
    printf("Mayor: %i  -  Menor: %i\\n", may, men);
    return 0;
}`)
        },
        {
          q: "<strong>2.</strong> Pedir un vector (máximo 10) e <strong>invertir</strong> el orden de sus elementos (el primero pasa a ser el último, etc.). Mostrar el vector invertido.",
          sol: "Intercambiamos extremos: posición <code>i</code> con <code>n−1−i</code>, hasta el medio." + C(`#include <stdio.h>
#define tam 10
int main() {
    int v[tam], n, i, aux;
    printf("Cantidad (max 10): "); scanf("%i", &n);
    for (i = 0; i < n; i++) { printf("v[%i]: ", i); scanf("%i", &v[i]); }
    for (i = 0; i < n / 2; i++) {
        aux = v[i];
        v[i] = v[n - 1 - i];
        v[n - 1 - i] = aux;
    }
    printf("Invertido: ");
    for (i = 0; i < n; i++) printf("%i ", v[i]);
    printf("\\n");
    return 0;
}`)
        },
        {
          q: "<strong>4.</strong> Dados dos conjuntos A y B (en vectores), mostrar su <strong>unión</strong> y verificar si un elemento <code>e</code> pertenece a B.",
          sol: "La unión: copiamos A y agregamos los de B que no estén ya. Para pertenencia, recorremos B buscando <code>e</code>." + C(`#include <stdio.h>
#define tam 50
int main() {
    int A[tam], B[tam], U[tam], M, N, i, j, k, e, esta;
    printf("Card. A: "); scanf("%i", &M);
    for (i = 0; i < M; i++) scanf("%i", &A[i]);
    printf("Card. B: "); scanf("%i", &N);
    for (i = 0; i < N; i++) scanf("%i", &B[i]);

    k = 0;
    for (i = 0; i < M; i++) U[k++] = A[i];     // todos los de A
    for (j = 0; j < N; j++) {                  // los de B que no esten
        esta = 0;
        for (i = 0; i < M; i++) if (A[i] == B[j]) esta = 1;
        if (!esta) U[k++] = B[j];
    }
    printf("Union: "); for (i = 0; i < k; i++) printf("%i ", U[i]);

    printf("\\nElemento a buscar en B: "); scanf("%i", &e);
    esta = 0;
    for (j = 0; j < N; j++) if (B[j] == e) esta = 1;
    printf(esta ? "%i pertenece a B\\n" : "%i NO pertenece a B\\n", e);
    return 0;
}`)
        },
        {
          q: "<strong>5.</strong> Usando <code>enum meses { ene=1, feb, ..., dic };</code>, guardar los días de cada mes en un arreglo (usando la enumeración como índice) y, dado un mes, mostrar sus días.",
          sol: "El enum arranca en 1, así que la posición 0 queda sin usar y los meses coinciden con su número." + C(`#include <stdio.h>
enum meses { ene = 1, feb, mar, abr, may, jun,
             jul, ago, sep, oct, nov, dic };
int main() {
    int dias[13] = {0, 31,28,31,30,31,30,31,31,30,31,30,31};
    int m;
    printf("Numero de mes (1-12): ");
    scanf("%i", &m);
    printf("Ese mes tiene %i dias\\n", dias[m]);
    return 0;
}`)
        },
        {
          q: "<strong>6.</strong> En un vector de caracteres, mostrar cuántas veces aparece la letra 'a'. Luego pedir una letra al usuario y contar sus apariciones.",
          sol: C(`#include <stdio.h>
#define tam 100
int main() {
    char texto[tam], letra;
    int i, n, cont = 0;
    printf("Cantidad de caracteres: "); scanf("%i", &n);
    for (i = 0; i < n; i++) { fflush(stdin); scanf("%c", &texto[i]); }

    for (i = 0; i < n; i++) if (texto[i] == 'a') cont++;
    printf("La 'a' aparece %i veces\\n", cont);

    printf("Ingrese una letra: "); fflush(stdin); scanf("%c", &letra);
    cont = 0;
    for (i = 0; i < n; i++) if (texto[i] == letra) cont++;
    printf("'%c' aparece %i veces\\n", letra, cont);
    return 0;
}`)
        },
        {
          q: "<strong>7.</strong> Declarar una cadena con tu nombre, calcular y mostrar su longitud, copiarla a otra cadena vacía y mostrar la copia.",
          sol: C(`#include <stdio.h>
#include <string.h>
int main() {
    char nombre[40], copia[40];
    strcpy(nombre, "Valentina");
    printf("Longitud: %i\\n", strlen(nombre));
    strcpy(copia, nombre);
    printf("Copia: %s\\n", copia);
    return 0;
}`)
        },
        {
          q: "<strong>8.</strong> Dada una frase, informar si es o no <strong>palíndromo</strong> (se lee igual al derecho y al revés).",
          sol: "Comparamos el carácter <code>i</code> con el <code>n−1−i</code>; si todos coinciden, es palíndromo." + C(`#include <stdio.h>
#include <string.h>
int main() {
    char frase[100];
    int i, n, esPal = 1;
    printf("Ingrese una palabra: ");
    scanf("%s", frase);
    n = strlen(frase);
    for (i = 0; i < n / 2; i++)
        if (frase[i] != frase[n - 1 - i]) esPal = 0;
    if (esPal) printf("Es palindromo\\n");
    else       printf("No es palindromo\\n");
    return 0;
}`) + "Probalo con <code>reconocer</code> o <code>neuquen</code>."
        },
      ]
    },

    /* =============================== TP 3 — MÓDULOS (FUNCIONES) =============================== */
    {
      id: "tp3", unit: "modulos", glyph: "f()",
      title: "TP N°3 · Módulos (funciones)",
      desc: "Menú de operaciones, áreas de figuras, evaluar polinomios, primos y cadenas.",
      exercises: [
        {
          q: "<strong>1.</strong> Programa con un menú que permita elegir: 1) sumar, 2) restar, 3) multiplicar dos números. <strong>Cada operación en un módulo distinto.</strong>",
          sol: C(`#include <stdio.h>
int sumar(int a, int b)       { return a + b; }
int restar(int a, int b)      { return a - b; }
int multiplicar(int a, int b) { return a * b; }

int main() {
    int op, a, b;
    printf("1.Sumar  2.Restar  3.Multiplicar\\n");
    printf("Opcion: "); scanf("%i", &op);
    printf("Dos numeros: "); scanf("%i %i", &a, &b);
    switch (op) {
        case 1: printf("Resultado: %i\\n", sumar(a, b));       break;
        case 2: printf("Resultado: %i\\n", restar(a, b));      break;
        case 3: printf("Resultado: %i\\n", multiplicar(a, b)); break;
        default: printf("Opcion invalida\\n");
    }
    return 0;
}`)
        },
        {
          q: "<strong>2.</strong> Mediante un menú, calcular el <strong>área</strong> de: círculo, cuadrado, rectángulo o triángulo (un módulo por figura).",
          sol: C(`#include <stdio.h>
float areaCirculo(float r)            { return 3.14159 * r * r; }
float areaCuadrado(float l)           { return l * l; }
float areaRectangulo(float b, float h){ return b * h; }
float areaTriangulo(float b, float h) { return b * h / 2; }

int main() {
    int op; float a, b;
    printf("1.Circulo 2.Cuadrado 3.Rectangulo 4.Triangulo\\n");
    scanf("%i", &op);
    switch (op) {
        case 1: printf("Radio: "); scanf("%f", &a);
                printf("Area: %.2f\\n", areaCirculo(a)); break;
        case 2: printf("Lado: "); scanf("%f", &a);
                printf("Area: %.2f\\n", areaCuadrado(a)); break;
        case 3: printf("Base y altura: "); scanf("%f %f", &a, &b);
                printf("Area: %.2f\\n", areaRectangulo(a, b)); break;
        case 4: printf("Base y altura: "); scanf("%f %f", &a, &b);
                printf("Area: %.2f\\n", areaTriangulo(a, b)); break;
        default: printf("Opcion invalida\\n");
    }
    return 0;
}`)
        },
        {
          q: "<strong>3.</strong> Módulos para: a) leer un polinomio de coeficientes enteros, b) evaluarlo en un valor x. Usalos para decidir si x es <strong>raíz</strong> del polinomio. Ej: P(x)=x³−5x²+6x, P(2)=0 → 2 es raíz.",
          sol: "El vector guarda los coeficientes; <code>P[i]</code> acompaña a \\(x^i\\). Evaluar es sumar <code>P[i]·x^i</code>." + C(`#include <stdio.h>
#include <math.h>
#define tam 20

void leerPoli(int P[], int n) {
    int i;
    for (i = 0; i <= n; i++) { printf("P[x^%i]: ", i); scanf("%i", &P[i]); }
}
int evaluar(int P[], int n, int x) {
    int i, res = 0;
    for (i = 0; i <= n; i++) res = res + P[i] * pow(x, i);
    return res;
}
int main() {
    int P[tam], n, x;
    printf("Grado: "); scanf("%i", &n);
    leerPoli(P, n);
    printf("Evaluar en x = "); scanf("%i", &x);
    if (evaluar(P, n, x) == 0) printf("%i ES raiz de P\\n", x);
    else                       printf("%i NO es raiz de P\\n", x);
    return 0;
}`)
        },
        {
          q: "<strong>4.a)</strong> Módulo que determine si un número natural es <strong>primo</strong>. (Devuelve 1 si lo es, 0 si no.)",
          sol: C(`#include <stdio.h>
int esPrimo(int n) {
    int i;
    if (n < 2) return 0;
    for (i = 2; i < n; i++)
        if (n % i == 0) return 0;
    return 1;
}
int main() {
    int x;
    printf("Numero: "); scanf("%i", &x);
    if (esPrimo(x)) printf("Es primo\\n");
    else            printf("No es primo\\n");
    return 0;
}`)
        },
        {
          q: "<strong>5.</strong> Módulos para: a) generar/llenar una lista de n naturales, b) mostrarla, c) ordenarla ascendentemente, d) buscar un elemento (búsqueda secuencial).",
          sol: "Ordenamiento por intercambio (burbuja) y búsqueda secuencial, cada uno en su módulo." + C(`#include <stdio.h>
#define tam 100
void mostrar(int v[], int n) {
    int i;
    for (i = 0; i < n; i++) printf("%i ", v[i]);
    printf("\\n");
}
void ordenar(int v[], int n) {
    int i, j, aux;
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - 1 - i; j++)
            if (v[j] > v[j + 1]) { aux = v[j]; v[j] = v[j+1]; v[j+1] = aux; }
}
int buscar(int v[], int n, int x) {
    int i;
    for (i = 0; i < n; i++) if (v[i] == x) return i;
    return -1;
}
int main() {
    int v[tam], n, i, x, pos;
    printf("Cantidad: "); scanf("%i", &n);
    for (i = 0; i < n; i++) scanf("%i", &v[i]);
    ordenar(v, n);
    printf("Ordenada: "); mostrar(v, n);
    printf("Buscar: "); scanf("%i", &x);
    pos = buscar(v, n, x);
    if (pos >= 0) printf("Encontrado en la posicion %i\\n", pos);
    else          printf("No esta en la lista\\n");
    return 0;
}`)
        },
        {
          q: "<strong>6.</strong> Módulos para el tratamiento de cadenas <strong>SIN usar funciones predefinidas</strong>: longitud, pasar a minúsculas y contar vocales.",
          sol: "Implementamos a mano lo que harían strlen, etc. La cadena termina en <code>'\\0'</code>." + C(`#include <stdio.h>
int longitud(char s[]) {
    int i = 0;
    while (s[i] != '\\0') i++;
    return i;
}
void aMinusculas(char s[]) {
    int i = 0;
    while (s[i] != '\\0') {
        if (s[i] >= 'A' && s[i] <= 'Z') s[i] = s[i] + 32;  // A->a
        i++;
    }
}
int contarVocales(char s[]) {
    int i = 0, c = 0; char ch;
    while (s[i] != '\\0') {
        ch = s[i];
        if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') c++;
        i++;
    }
    return c;
}
int main() {
    char frase[100];
    scanf("%s", frase);
    aMinusculas(frase);
    printf("Longitud: %i\\n", longitud(frase));
    printf("Minusculas: %s\\n", frase);
    printf("Vocales: %i\\n", contarVocales(frase));
    return 0;
}`) + "Nota: <code>'A'+32</code> da <code>'a'</code> porque en ASCII las minúsculas están 32 lugares después de las mayúsculas."
        },
      ]
    },

  ];
})();
