// React para criar o componente de preço
import React from "react";

// Blocos visuais do React Native
import { View, Text, StyleSheet } from "react-native";

// Props que o componente Preco pode receber
interface PrecoProps {
  valor: number;
}

// Componente Preco - exibe o preço do produto passado como prop
export default function Preco({ valor }: PrecoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preço</Text>
      <Text style={styles.valor}>
        R$ {valor.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  valor: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});