// React e o hook de estado para controlar as curtidas do post
import React, { useState } from "react";

// Componentes nativos de imagem, texto e botões
import { View, Text, Image, TouchableOpacity, ImageStyle } from "react-native";

// Ícones de coração, balão de mensagem, olho e reticências
import { Heart, MessageCircle, EyeOff, Ellipsis } from "lucide-react-native";

// Estilos locais e o tema
import { styles } from "./styles";
import { theme } from "../../theme/theme";

// Estrutura de dados (TypeScript) de cada publicação
export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    initials: string;
    location?: string;
    // O ? torna o campo opcional
  };
  time: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isHidden?: boolean;
}

// Funções e eventos que o cartão pode disparar
interface PostCardProps {
  post: Post;
  onLikePress?: (id: string) => void;
  onCommentPress?: (post: Post) => void;
  onHidePress?: (post: Post) => void;
  onMorePress?: (post: Post) => void;
  // O ? torna o callback opcional
  // (id: string) => void significa: recebe string, não retorna nada
}

// Componente PostCard que representa cada item do feed
export default function PostCard({
  post,
  onLikePress,
  onCommentPress,
  onHidePress,
  onMorePress,
}: PostCardProps) {
  // Aqui eu guardo se este post já foi curtido pelo usuário
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (post.isLiked ?? false) é o valor inicial do estado
  const [liked, setLiked] = useState<boolean>(post.isLiked ?? false);

  // Aqui eu guardo a contagem numérica de likes para atualizar na hora
  // useState<number> função que retorna um número e uma função para atualizá-lo
  // (post.likes) é o valor inicial do estado
  const [likesCount, setLikesCount] = useState<number>(post.likes);

  // Função que alterna o like, incrementando ou decrementando o contador
  const handleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    if (onLikePress) {
      onLikePress(post.id);
    }
  };

  return (
    <View style={styles.card}>
      {/* Cabeçalho do post com dados do autor */}
      <View style={styles.header}>
        {/* Avatar menor com iniciais do autor */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.author.initials}</Text>
        </View>

        {/* Nome e tempo de publicação */}
        <View style={styles.identity}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.meta}>
            {post.author.handle} · {post.time}
          </Text>
        </View>

        {/* Botão de mais opções */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => onMorePress?.(post)}
          activeOpacity={0.7}
        >
          <Ellipsis size={16} color={theme.colors.inkSoft} />
        </TouchableOpacity>
      </View>

      {/* Foto principal da publicação com toque que abre os detalhes */}
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onCommentPress?.(post)}
      >
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.photo as ImageStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Legenda do post */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Barra de ações inferiores (Curtir, Comentar e Ocultar) */}
      <View style={styles.actions}>
        {/* Chip interativo de Curtir */}
        <TouchableOpacity
          style={[styles.chip, liked && styles.likeChipActive]}
          onPress={handleLike}
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

        {/* Chip de Comentários */}
        <TouchableOpacity
          style={styles.chip}
          onPress={() => onCommentPress?.(post)}
          activeOpacity={0.7}
        >
          <MessageCircle size={15} color={theme.colors.inkSoft} />
          <Text style={styles.chipText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        {/* Espaçador flexível para empurrar o botão de Ocultar para a direita */}
        <View style={styles.spacer} />

        {/* Chip para abrir a opção de Ocultar */}
        <TouchableOpacity
          style={styles.hideChip}
          onPress={() => onHidePress?.(post)}
          activeOpacity={0.7}
        >
          <EyeOff size={15} color={theme.colors.inkSoft} />
          <Text style={styles.hideChipText}>Ocultar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}