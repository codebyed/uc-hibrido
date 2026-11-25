/**
 * Desafio: Calculadora que receba dois números e uma operação
 * 
 * @author Edigelson Nascimento
 * @version 1.0
 */

// Importa o módulo 'readline' e cria uma interface para ler e escrever no terminal
const readline = require('readline').createInterface({
  input: process.stdin,   
  output: process.stdout  
});

readline.question("Digite o primeiro número: ", (n1) => {
  readline.question("Digite o segundo número: ", (n2) => {
    let numero1 = Number(n1);
    let numero2 = Number(n2);

    // Declara a função 'menu' que exibe as opções e gerencia o fluxo da calculadora
    function menu() {
      // Exibe o menu de operações no console
      console.log("\nEscolha a operação:");
      console.log("1 - Soma");
      console.log("2 - Subtração");
      console.log("3 - Multiplicação");
      console.log("4 - Divisão");
      console.log("5 - Sair");

      // Solicita que o usuário escolha uma das opções e captura a resposta em 'opcao'
      readline.question("Digite sua opção: ", (opcao) => {
        // Verifica a opção escolhida (o método .trim() remove espaços em branco extras antes e depois)
        switch (opcao.trim()) {
          case "1": // Caso o usuário digite "1"
            console.log("Resultado da Soma: " + (numero1 + numero2)); // Realiza e exibe a soma
            menu(); // Chama o menu novamente para permitir outra operação com os mesmos números
            break; // Encerra este bloco 'case'

          case "2": // Caso o usuário digite "2"
            console.log("Resultado da Subtração: " + (numero1 - numero2)); // Realiza e exibe a subtração
            menu(); // Retorna ao menu
            break;

          case "3": // Caso o usuário digite "3"
            console.log("Resultado da Multiplicação: " + (numero1 * numero2)); // Realiza e exibe a multiplicação
            menu(); // Retorna ao menu
            break;

          case "4": // Caso o usuário digite "4"
            // Verifica se o segundo número é diferente de zero
            if (numero2 !== 0) {
              console.log("Resultado da Divisão: " + (numero1 / numero2)); // Realiza e exibe a divisão
            } else {
              console.log("Erro: não é possível dividir por zero."); // Exibe mensagem de alerta
            }
            menu(); // Retorna ao menu
            break;

          case "5": // Caso o usuário digite "5"
            console.log("Programa encerrado!"); // Exibe mensagem de despedida
            readline.close(); // Fecha a interface de leitura e encerra o programa no terminal
            break;

          default: // Caso o usuário digite qualquer valor diferente de 1 a 5
            console.log("Opção inválida! Tente novamente."); // Avisa que a entrada é inválida
            menu(); // Retorna ao menu para nova tentativa
            break;
        }
      });
    }

    // Executa a função 'menu' pela primeira vez após os dois números serem informados
    menu();
  });
});