// Aqui eu importo o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Aqui eu importo o tema para centralizar paleta de cores e raios
import { theme } from "../../theme/theme";

// Aqui eu exporto as regras de estilo do PerfilCartao
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 14,
  },
  // Avatar circular de 84x84 com raio de 42 e sombra roxa suave
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  // Letras das iniciais com fonte tamanho 26 em branco
  avatarText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  // Nome do usuário em destaque com tamanho 26 e peso 600
  name: {
    fontSize: 26,
    fontWeight: "600",
    color: theme.colors.ink,
    letterSpacing: -0.6,
  },
  // Arroba e subtítulo com cor inkSoft
  handle: {
    fontSize: 13,
    fontWeight: "400",
    color: theme.colors.inkSoft,
    marginTop: -8,
  },
  // Biografia legível com altura de linha 20
  bio: {
    fontSize: 13,
    fontWeight: "400",
    color: theme.colors.ink,
    lineHeight: 20,
  },
  // Cartão branco arredondado para exibir os números
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    gap: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.ink,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "400",
    color: theme.colors.inkFaint,
  },
  // Linha fina de 1px separando cada estatística
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: theme.colors.line,
  },
  // Alinhamento horizontal dos botões de ação
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  followButton: {
    flex: 1,
    paddingVertical: 12,
  },
  messageButton: {
    flex: 1,
    paddingVertical: 12,
  },
  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
});
