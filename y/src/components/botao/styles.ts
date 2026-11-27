// Aqui eu importo o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Aqui eu importo o tema global
import { theme } from "../../theme/theme";

// Aqui eu defino as variações de botões (primário, secundário, escuro e transparente)
export const styles = StyleSheet.create({
  baseButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 6,
  },
  // Botão primário roxo (#5B4BF5) em formato pílula com texto branco
  primaryButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.radius.pill,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  // Botão secundário branco com contorno cinza fino e texto escuro
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.pill,
  },
  secondaryButtonText: {
    color: theme.colors.ink,
    fontSize: 13,
    fontWeight: "600",
  },
  // Botão de confirmação preto/ink (#121419) de 50px de altura
  darkButton: {
    backgroundColor: theme.colors.ink,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "100%",
  },
  darkButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  // Botão fantasma sem fundo para cancelamentos
  ghostButton: {
    backgroundColor: "transparent",
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 16,
    width: "100%",
  },
  ghostButtonText: {
    color: theme.colors.inkSoft,
    fontSize: 13,
    fontWeight: "600",
  },
  activeButton: {
    opacity: 0.85,
  },
});
