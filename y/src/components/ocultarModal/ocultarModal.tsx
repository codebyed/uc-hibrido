// React
import React from "react";

// Modal nativo, áreas de toque e layout
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

// Ícones do Lucide para as ações da folha inferior
import { EyeOff, ChevronRight, X } from "lucide-react-native";

// Uso os insets para que a folha não cole na borda inferior do aparelho
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tema e a tipagem do Post
import { theme } from "../../theme/theme";
import { Post } from "../postCard/postCard";

// Props que o modal de ocultar recebe
interface OcultarModalProps {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
  onConfirmHide: (postId: string) => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
}

// Componente OcultarModal (Tela 03 do Pencil)
export default function OcultarModal({
  visible,
  post,
  onClose,
  onConfirmHide,
}: OcultarModalProps) {
  // Leio os insets da tela para posicionamento seguro
  // useSafeAreaInsets() retorna um objeto com top, bottom, left, right
  const insets = useSafeAreaInsets();

  // Se nenhum post foi passado, não renderizo nada
  if (!post) return null;

  // Função disparada ao clicar no botão "Ocultar do mural"
  const handleConfirm = () => {
    onConfirmHide(post.id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Fundo escurecido semi-transparente que fecha o modal se clicado fora */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Folha inferior branca (Bottom Sheet) bem colada à base */}
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.sheet,
                { paddingBottom: Math.max(insets.bottom, 12) },
              ]}
            >
              {/* Alça superior para indicar que é arrastável/folha */}
              <View style={styles.grabWrap}>
                <View style={styles.grab} />
              </View>

              {/* Cabeçalho com título, autor do post e botão de fechar (X) */}
              <View style={styles.head}>
                <View style={styles.headText}>
                  <Text style={styles.title}>Ocultar publicação</Text>
                  <Text style={styles.subtitle}>
                    De {post.author.name} · {post.time}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <X size={16} color={theme.colors.inkSoft} />
                </TouchableOpacity>
              </View>

              {/* Caixa com a opção de ocultar do mural */}
              <View style={styles.optionsBox}>
                <View style={[styles.optionItem, styles.optionSelected]}>
                  <View style={styles.iconWrap}>
                    <EyeOff size={17} color={theme.colors.ink} />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionLabel}>Ocultar do meu mural</Text>
                    <Text style={styles.optionDesc}>
                      Some para você, sem apagar nada
                    </Text>
                  </View>
                  <ChevronRight size={15} color={theme.colors.inkFaint} />
                </View>
              </View>

              {/* Botões de Ação: Confirmar e Cancelar */}
              <View style={styles.confirmArea}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                  activeOpacity={0.85}
                >
                  <EyeOff size={16} color="#FFFFFF" />
                  <Text style={styles.confirmButtonText}>Ocultar do mural</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// Estilos do Modal de Ocultação
const styles = StyleSheet.create({
  // Fundo escuro com opacidade
  overlay: {
    flex: 1,
    backgroundColor: "rgba(16, 18, 25, 0.42)",
    justifyContent: "flex-end",
    zIndex: 9999,
  },
  // Folha branca com cantos superiores arredondados e base colada no fundo da tela
  sheet: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 12,
    shadowColor: "#101219",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 10000,
  },
  grabWrap: {
    width: "100%",
    alignItems: "center",
  },
  grab: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.line,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headText: {
    gap: 3,
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: theme.colors.ink,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.inkFaint,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsBox: {
    backgroundColor: theme.colors.bg,
    borderRadius: 18,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  optionSelected: {
    backgroundColor: "rgba(91, 75, 245, 0.08)",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.ink,
  },
  optionDesc: {
    fontSize: 11,
    color: theme.colors.inkFaint,
  },
  confirmArea: {
    gap: 4,
    marginTop: 2,
  },
  // Botão escuro de 48px de altura
  confirmButton: {
    height: 48,
    backgroundColor: theme.colors.ink,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  cancelButton: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: theme.colors.inkSoft,
    fontSize: 13,
    fontWeight: "600",
  },
});