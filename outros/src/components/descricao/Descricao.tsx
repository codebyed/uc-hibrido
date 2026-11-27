// React para criar o componente de descrição
import React from "react";

// Blocos visuais do React Native
import { View, Text, StyleSheet } from "react-native";

// Props que o componente Descricao pode receber
interface DescricaoProps {
  texto: string;
}

// Componente Descricao - exibe a descrição do produto passada como prop
export default function Descricao({ texto }: DescricaoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Descrição</Text>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  texto: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});