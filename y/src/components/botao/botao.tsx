// React
import React from "react";

// Componentes nativos para construir botões acessíveis e com feedback de toque
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from "react-native";

// Regras de estilo do botão
import { styles } from "./styles";

// Variações visuais que o botão pode ter
export type BotaoVariant = "primary" | "secondary" | "dark" | "ghost";

// Interface com as opções de propriedades
interface BotaoProps {
  onPress: () => void;
  text: string;
  variant?: BotaoVariant;
  active?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  // StyleProp permite estilos do StyleSheet ou inline
  // React.ReactNode aceita qualquer elemento renderizável (ícone, texto, etc)
}

// Componente genérico e reutilizável de Botão
export function Botao({
  onPress,
  text,
  variant = "primary",
  active = false,
  loading = false,
  icon,
  style,
  textStyle,
}: BotaoProps) {
  // Seleciono o estilo da caixa do botão com base na variante
  const getContainerStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton;
      case "dark":
        return styles.darkButton;
      case "ghost":
        return styles.ghostButton;
      case "primary":
      default:
        return styles.primaryButton;
    }
  };

  // Seleciono a cor e tamanho da tipografia do texto
  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButtonText;
      case "dark":
        return styles.darkButtonText;
      case "ghost":
        return styles.ghostButtonText;
      case "primary":
      default:
        return styles.primaryButtonText;
    }
  };

  // Cor do indicador de carregamento (spinner)
  // variant === "secondary" || variant === "ghost" ? "#121419" : "#FFFFFF"
  // Se for secondary ou ghost, usa preto; senão usa branco
  const indicatorColor =
    variant === "secondary" || variant === "ghost" ? "#121419" : "#FFFFFF";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.baseButton, getContainerStyle(), active && styles.activeButton, style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {/* Se eu passei um ícone, renderizo aqui com margem direita */}
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text style={[getTextStyle(), textStyle]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}