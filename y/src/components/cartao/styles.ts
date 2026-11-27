// Aqui eu importo o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Aqui eu importo o tema com a cor de fundo e a borda
import { theme } from "../../theme/theme";

// Regras de estilo do cartão base
export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 14,
    marginBottom: 14,
  },
});
