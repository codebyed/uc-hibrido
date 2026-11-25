/**
 * Desafio: Calcular o fatorial de um número.
 * 
 * @author Edigelson Nascimento
 * @version 1.0
 */

let numero = 5;
let fatorial = 1;

for (let i = 1; i <= numero; i++) {
    fatorial *= i;
}

console.log(fatorial);

// Forma diferente de fazer o mesmo exercicio

let numero2 = 5;
let fatorial2 = 1;

while (numero2 > 1) {
    fatorial2 *= numero2;
    numero2--;
}

console.log(fatorial2);