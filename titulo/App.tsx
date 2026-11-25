// React e hook useState para gerenciar o estado do título
import { useState } from "react";

// Componentes nativos do React Native
import { StyleSheet, View, TextInput, Text } from "react-native";

// Componente Titulo customizado
import Titulo from "./src/components/titulo/Titulo";

export default function App() {
  // Estado para controlar o texto do título dinamicamente
  const [tituloTexto, setTituloTexto] = useState("Meu Título Inicial");

  return (
    <View style={styles.container}>
      {/* Componente Titulo recebendo o texto do estado */}
      <Titulo texto={tituloTexto} />

      {/* Input para alterar o título dinamicamente */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tituloTexto}
          onChangeText={setTituloTexto}
          placeholder="Digite um novo título"
        />
        <Text style={styles.hint}>O título acima será atualizado em tempo real</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 10,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});