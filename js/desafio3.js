
/**
 * Desafio: Criar um programa que avalie o consumo e classifique o gasto.
 * 
 * @author Edigelson Nascimento
 * @version 1.0
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout 
});

/**
 * Pergunta o consumo
 */

readline.question("Digite o consumo em KWh: ", (consumoInput) => {
    // Pergunta o valor
    readline.question("Digite o valor do KWh: ", (valorInput) => {
        
        let consumoKwh = parseFloat(consumoInput);
        let valorKwh = parseFloat(valorInput);
        
        let valorConta = consumoKwh * valorKwh;
        let classificacao = ""; // Variável para armazenar a classificação

        if (consumoKwh <= 150) {
            classificacao = "Consumo Baixo";
        } else if (consumoKwh <= 300) {
            classificacao = "Consumo Moderado";
        } else {
            classificacao = "Consumo Alto";
        }

        console.log("\n--- RESULTADO ---");
        console.log("Valor da conta: R$ " + valorConta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })); // Formatação de moeda
        console.log("Classificação: " + classificacao);

        readline.close();
    });
});