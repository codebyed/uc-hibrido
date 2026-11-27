// React e o hook de estado para gerenciar os comentários locais da tela
import React, { useState } from "react";

// Componentes nativos para estruturar a tela cheia de detalhes da publicação
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Share,
  ImageStyle,
} from "react-native";

// Ícones de navegação, engajamento e envio de comentários
import {
  ChevronLeft,
  Share2,
  Heart,
  MessageCircle,
  EyeOff,
  UserPlus,
  UserCheck,
  ArrowUp,
} from "lucide-react-native";

// Uso os insets para que o topo e a barra de digitação fiquem seguros
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tema e a tipagem do Post
import { theme } from "../../theme/theme";
import { Post } from "../postCard/postCard";

// Estrutura de dados de cada comentário
interface Comment {
  id: string;
  name: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
}

// Props recebidas pela tela de detalhes
interface PostDetalhesProps {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
  onHidePress?: (post: Post) => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
  // O ? torna o callback opcional
}

// Comentários iniciais fiéis aos nomes do protótipo
const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    name: "Lucas Tavares",
    initials: "LT",
    time: "há 1 h",
    text: "A luz dessa janela é tudo.",
    likes: 1,
  },
  {
    id: "c2",
    name: "Bia Salles",
    initials: "BS",
    time: "há 42 min",
    text: "Salvando para inspirar meu próximo projeto.",
    likes: 2,
  },
  {
    id: "c3",
    name: "Rafa Moraes",
    initials: "RM",
    time: "há 12 min",
    text: "Preciso de um café assim hoje.",
    likes: 0,
  },
];

// Componente da Tela 02 (Detalhes da Publicação)
export default function PostDetalhes({
  visible,
  post,
  onClose,
  onHidePress,
}: PostDetalhesProps) {
  const insets = useSafeAreaInsets();

  // Aqui eu guardo os comentários da publicação
  // useState<Comment[]> função que retorna um array de Comment e uma função para atualizá-lo
  // (INITIAL_COMMENTS) é o valor inicial do estado
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);

  // Aqui eu guardo o texto do novo comentário sendo digitado
  // useState<string> função que retorna uma string e uma função para atualizá-lo
  // ("") é o valor inicial do estado
  const [newComment, setNewComment] = useState<string>("");

  // Aqui eu guardo se o usuário está seguindo o autor
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (false) é o valor inicial do estado
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Aqui eu guardo se o post está curtido localmente
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (post?.isLiked ?? true) é o valor inicial do estado
  const [liked, setLiked] = useState<boolean>(post?.isLiked ?? true);

  // Aqui eu guardo a contagem de likes para atualizar na hora
  // useState<number> função que retorna um número e uma função para atualizá-lo
  // (post ? post.likes : 25) é o valor inicial do estado
  const [likesCount, setLikesCount] = useState<number>(post ? post.likes : 25);

  if (!post) return null;

  // Função nativa para compartilhar o post usando o menu nativo do celular
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.author.name}: "${post.caption}"`,
      });
    } catch {
      // Ignora cancelamentos
    }
  };

  // Função para adicionar um novo comentário digitado pelo usuário
  const handleSendComment = () => {
    if (!newComment.trim()) return;
    const commentItem: Comment = {
      id: Date.now().toString(),
      name: "Você",
      initials: "VC",
      time: "agora",
      text: newComment.trim(),
      likes: 0,
    };
    setComments([commentItem, ...comments]);
    setNewComment("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      {/* Container com paddingTop seguro contra a barra de status */}
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {/* Barra superior de navegação com botão voltar e compartilhar */}
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <ChevronLeft size={18} color={theme.colors.ink} />
          </TouchableOpacity>

          <Text style={styles.navTitle}>Publicação</Text>

          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Share2 size={18} color={theme.colors.ink} />
          </TouchableOpacity>
        </View>

        {/* Rolagem com a imagem ampliada, autor, ações e lista de comentários */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Foto ampliada com cantos de 22px e 330px de altura */}
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.mainPhoto as ImageStyle}
            resizeMode="cover"
          />

          {/* Dados do Autor e botão 'Seguir' inline */}
          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{post.author.initials}</Text>
            </View>

            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{post.author.name}</Text>
              <Text style={styles.authorMeta}>
                {post.author.handle} · {post.time}
                {post.author.location ? ` · ${post.author.location}` : ""}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
              activeOpacity={0.8}
            >
              {isFollowing ? (
                <UserCheck size={13} color={theme.colors.ink} />
              ) : (
                <UserPlus size={13} color="#FFFFFF" />
              )}
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && { color: theme.colors.ink },
                ]}
              >
                {isFollowing ? "Seguindo" : "Seguir"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Legenda expandida com espaçamento legível */}
          <Text style={styles.caption}>{post.caption}</Text>

          {/* Linha com ações de curtir, comentar e ocultar */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.chip, liked && styles.likeChipActive]}
              onPress={() => {
                setLiked(!liked);
                setLikesCount((c) => (!liked ? c + 1 : c - 1));
              }}
              activeOpacity={0.7}
            >
              <Heart
                size={15}
                color={liked ? theme.colors.like : theme.colors.inkSoft}
                fill={liked ? theme.colors.like : "transparent"}
              />
              <Text
                style={[
                  styles.chipText,
                  liked && { color: theme.colors.like, fontWeight: "700" },
                ]}
              >
                {likesCount}
              </Text>
            </TouchableOpacity>

            <View style={styles.chip}>
              <MessageCircle size={15} color={theme.colors.inkSoft} />
              <Text style={styles.chipText}>{comments.length}</Text>
            </View>

            <View style={styles.spacer} />

            <TouchableOpacity
              style={styles.hideChip}
              onPress={() => {
                onClose();
                onHidePress?.(post);
              }}
              activeOpacity={0.7}
            >
              <EyeOff size={15} color={theme.colors.inkSoft} />
              <Text style={styles.hideChipText}>Ocultar</Text>
            </TouchableOpacity>
          </View>

          {/* Linha divisória */}
          <View style={styles.divider} />

          {/* Cabeçalho da seção de comentários */}
          <View style={styles.commentsHead}>
            <Text style={styles.commentsTitle}>Comentários</Text>
            <Text style={styles.commentsCount}>{comments.length}</Text>
          </View>

          {/* Lista com cada comentário mapeado */}
          <View style={styles.commentsList}>
            {comments.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>{c.initials}</Text>
                </View>

                <View style={styles.commentBody}>
                  <View style={styles.commentNameRow}>
                    <Text style={styles.commentName}>{c.name}</Text>
                    <Text style={styles.commentTime}>{c.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{c.text}</Text>
                </View>

                <TouchableOpacity
                  style={styles.commentLikeButton}
                  activeOpacity={0.7}
                >
                  <Heart size={14} color={theme.colors.inkFaint} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Barra inferior de digitação (Composer) com padding seguro */}
        <View style={[styles.composerWrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.composer}>
            <TextInput
              style={styles.composerInput}
              placeholder="Escreva um comentário…"
              placeholderTextColor={theme.colors.inkFaint}
              value={newComment}
              onChangeText={setNewComment}
              onSubmitEditing={handleSendComment}
            />
            {/* Botão de envio roxo com seta para cima */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendComment}
              activeOpacity={0.8}
            >
              <ArrowUp size={17} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Estilos da Tela de Detalhes
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.bg,
  },
  circleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.ink,
    letterSpacing: -0.2,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 18,
  },
  mainPhoto: {
    width: "100%",
    height: 330,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceSunk,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.ink,
  },
  authorMeta: {
    fontSize: 11,
    color: theme.colors.inkFaint,
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: theme.colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: theme.radius.pill,
  },
  followingButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  caption: {
    fontSize: 14,
    lineHeight: 22.4,
    color: theme.colors.ink,
    fontWeight: "400",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  likeChipActive: {
    backgroundColor: theme.colors.likeSoft,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.inkSoft,
  },
  spacer: {
    flex: 1,
  },
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
  divider: {
    height: 1,
    backgroundColor: theme.colors.line,
  },
  commentsHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.ink,
  },
  commentsCount: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.inkFaint,
  },
  commentsList: {
    gap: 14,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceSunk,
    alignItems: "center",
    justifyContent: "center",
  },
  commentAvatarText: {
    color: theme.colors.inkSoft,
    fontSize: 11,
    fontWeight: "600",
  },
  commentBody: {
    flex: 1,
    gap: 3,
  },
  commentNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentName: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.ink,
  },
  commentTime: {
    fontSize: 10,
    color: theme.colors.inkFaint,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18.8,
    color: theme.colors.inkSoft,
  },
  commentLikeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  composerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.bg,
  },
  composer: {
    height: 50,
    backgroundColor: theme.colors.surface,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.colors.line,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 6,
  },
  composerInput: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.ink,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
});