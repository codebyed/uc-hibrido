/**
 * Desafio: Calcular o IMC e classificar o resultado.
 * 
 * @author Edigelson Nascimento
 * @version 1.0
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Digite o peso: ', (peso) => {
    readline.question('Digite a altura: ', (altura) => {
        let imc = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
        
        if (imc < 18.5) {
            console.log("Abaixo do peso");
        } else if (imc < 25) {
            console.log("Peso normal");
        } else if (imc < 30) {
            console.log("Sobrepeso");
        } else if (imc < 35) {
            console.log("Obesidade grau 1");
        } else if (imc < 40) {
            console.log("Obesidade grau 2");
        } else {
            console.log("Obesidade grau 3");
        }
        
        console.log("IMC: " + imc);
        readline.close();
    });
});