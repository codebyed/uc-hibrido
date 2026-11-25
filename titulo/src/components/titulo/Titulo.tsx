// React para criar o componente de título
import React from "react";

// Blocos visuais do React Native
import { Text } from "react-native";

// Estilos locais
import { styles } from "./styles";

// Props que o componente Titulo pode receber
interface TituloProps {
  texto: string;
}

// Componente Titulo - recebe o texto via props e o exibe estilizado
export default function Titulo({ texto }: TituloProps) {
  return <Text style={styles.titulo}>{texto}</Text>;
}