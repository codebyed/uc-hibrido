// React
import React from "react";

// Componentes nativos de View e os tipos de estilo
import { View, ViewStyle, StyleProp } from "react-native";

// Estilos locais do cartão
import { styles } from "./styles";

// Props que o cartão genérico pode receber
interface CartaoProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  // StyleProp<ViewStyle> permite passar estilos inline ou do StyleSheet
}

// Componente Cartão genérico que serve de contêiner estilizado
export default function Cartao({ children, style }: CartaoProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}