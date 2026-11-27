// Aqui eu importo o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Aqui eu importo o tema para usar as cores padronizadas
import { theme } from "../../theme/theme";

// Aqui eu exporto as regras de estilo do cabeçalho
export const styles = StyleSheet.create({
  // Barra de topo com flexbox horizontal e alinhamento space-between
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.colors.bg,
  },
  // Título com tamanho 15, semibold e espaçamento de letras ajustado
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.ink,
    letterSpacing: -0.2,
  },
  // Botão circular de 38x38 com fundo branco e raio de 19
  circleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
