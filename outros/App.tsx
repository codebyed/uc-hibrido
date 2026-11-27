import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Produto from "./src/components/produto/Produto";
import Descricao from "./src/components/descricao/Descricao";
import Preco from "./src/components/preco/Preco";

export default function App() {
  // Dados do produto
  const produto = {
    imagem:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTQ4NTMyNjh8&ixlib=rb-4.1.0&q=80&w=1080",
    descricao:
      "Fone de ouvido sem fio com cancelamento de ruído ativo, qualidade de som premium e bateria de longa duração. Design ergonômico e confortável para uso prolongado. Conexão Bluetooth 5.0 estável e rápida.",
    preco: 299.9,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Componente Produto - recebe imagem via prop */}
        <Produto imagem={produto.imagem} />

        {/* Componente Descricao - recebe texto via prop */}
        <Descricao texto={produto.descricao} />

        {/* Componente Preco - recebe valor via prop */}
        <Preco valor={produto.preco} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});
