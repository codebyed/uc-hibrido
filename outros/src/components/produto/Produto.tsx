// React para criar o componente do produto
import React from "react";

// Blocos visuais do React Native
import { View, Image, StyleSheet } from "react-native";

// Props que o componente Produto pode receber
interface ProdutoProps {
  imagem: string;
}

// Componente Produto - exibe a imagem do produto passada como prop
export default function Produto({ imagem }: ProdutoProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
});