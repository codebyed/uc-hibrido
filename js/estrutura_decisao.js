//Atividade: Comparar dois números com input do usuário
let numero1 = 18;
let numero2 = 18;

// == igualdade
// > maior que
// < menor que
// >= maior ou igual
// <= menor ou igual
// !== diferente

if (numero1 === numero2) {
    console.log(`Os números ${numero1} e ${numero2} são iguais`);
} else if (numero1 > numero2) {
    console.log(`O número ${numero1} é maior que ${numero2}`);
} else if (numero2 > numero1) {
    console.log(`O número ${numero2} é maior que ${numero1}`);
} else if (numero1 <= numero2) {
    console.log(`Os números ${numero1} e ${numero2} são diferentes`);
} else if (numero1 >= numero2) {
    console.log(`Os números ${numero1} e ${numero2} são diferentes`);
} else if (numero1 !== numero2) {
    console.log(`Os números ${numero1} e ${numero2} são diferentes`);
} else {
    console.log(`Os números ${numero1} e ${numero2} são diferentes`);
}

