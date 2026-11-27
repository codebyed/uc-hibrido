// Aqui eu importo o StyleSheet do React Native
import { StyleSheet } from "react-native";

// Aqui eu importo as cores e os raios do tema
import { theme } from "../../theme/theme";

// Aqui eu exporto as regras de estilo de cada cartão de postagem
export const styles = StyleSheet.create({
  // Cartão com fundo branco, cantos de 20px e borda cinza fina
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 14,
    gap: 12,
    marginBottom: 14,
  },
  // Cabeçalho alinhado horizontalmente
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // Mini avatar de 42x42 com raio de 21
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  identity: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.ink,
  },
  meta: {
    fontSize: 11,
    fontWeight: "400",
    color: theme.colors.inkFaint,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  // Imagem ocupando 100% da largura do cartão com altura fixa de 250px e cantos 14px
  photo: {
    width: "100%",
    height: 250,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceSunk,
  },
  // Texto da legenda com espaçamento entre linhas confortável
  caption: {
    fontSize: 13,
    lineHeight: 19.5,
    color: theme.colors.ink,
    fontWeight: "400",
  },
  // Linha de ações inferiores
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  // Pílula cinza para os contadores de like e comentário
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  // Fundo avermelhado suave quando o post está curtido
  likeChipActive: {
    backgroundColor: theme.colors.likeSoft,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.inkSoft,
  },
  // Empurra o botão de ocultar para o final da linha
  spacer: {
    flex: 1,
  },
  // Chip de contorno com borda para a ação de ocultar
  hideChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  hideChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.inkSoft,
  },
});
