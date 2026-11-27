// Componentes nativos para estruturar os dados do perfil
import { View, Text, TouchableOpacity } from "react-native";

// React e o hook useState para alternar entre "Seguir" e "Seguindo"
import React, { useState } from "react";

// Ícones de usuário, balão de mensagem e reticências
import {
  UserPlus,
  UserCheck,
  MessageCircle,
  Ellipsis,
} from "lucide-react-native";

// Estilos locais, o tema e o meu componente Botao reutilizável
import { styles } from "./styles";
import { theme } from "../../theme/theme";
import { Botao } from "../botao/botao";

// Informações que o cartão de perfil pode receber
export interface PerfilCartaoProps {
  name?: string;
  role?: string;
  email?: string;
  handle?: string;
  bio?: string;
  stats?: {
    posts: string | number;
    followers: string | number;
    following: string | number;
  };
  onMessagePress?: () => void;
  onMorePress?: () => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
  // O ? torna o callback opcional
}

// Propriedades opcionais com valores padrão
export default function PerfilCartao({
  name = "Marina Costa",
  handle = "@marina.costa · Produto & fotografia",
  bio = "Desenho interfaces e coleciono manhãs com cafés.",
  stats = {
    posts: "128",
    followers: "12,4 mil",
    following: "312",
  },
  onMessagePress,
  onMorePress,
}: PerfilCartaoProps) {
  // Aqui eu guardo o estado local de seguir/deixar de seguir
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (false) é o valor inicial do estado
  const [following, setFollowing] = useState<boolean>(false);

  // Função para extrair as iniciais do nome para exibir no avatar (ex: MC)
  const getInitials = (n: string) => {
    const parts = n.trim().split(" ");
    if (parts.length >= 2) {
      // parts[0][0] = primeira letra do primeiro nome
      // parts[parts.length - 1][0] = primeira letra do último nome
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    // Se só tem um nome, pega as duas primeiras letras
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Avatar circular com as iniciais brancas */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(name)}</Text>
      </View>

      {/* Nome de exibição principal com tamanho 26 */}
      <Text style={styles.name}>{name}</Text>

      {/* Identificador com arroba e área de atuação */}
      <Text style={styles.handle}>{handle}</Text>

      {/* Biografia do usuário */}
      <Text style={styles.bio}>{bio}</Text>

      {/* Cartão de estatísticas (Mural, Seguidores, Seguindo) */}
      <View style={styles.statsCard}>
        {/* Quantidade de itens no mural */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.posts}</Text>
          <Text style={styles.statLabel}>mural</Text>
        </View>

        {/* Divisor vertical */}
        <View style={styles.statDivider} />

        {/* Quantidade de seguidores */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.followers}</Text>
          <Text style={styles.statLabel}>seguidores</Text>
        </View>

        {/* Divisor vertical */}
        <View style={styles.statDivider} />

        {/* Quantidade de pessoas que o perfil segue */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.following}</Text>
          <Text style={styles.statLabel}>seguindo</Text>
        </View>
      </View>

      {/* Linha com os botões de ação do perfil */}
      <View style={styles.actionsRow}>
        {/* Botão de Seguir com alternância interativa de ícone e rótulo */}
        <Botao
          onPress={() => setFollowing(!following)}
          text={following ? "Seguindo" : "Seguir"}
          variant={following ? "secondary" : "primary"}
          icon={
            following ? (
              <UserCheck size={15} color={theme.colors.ink} />
            ) : (
              <UserPlus size={15} color="#FFFFFF" />
            )
          }
          style={styles.followButton}
        />

        {/* Botão para enviar mensagem privada */}
        <Botao
          onPress={onMessagePress || (() => {})}
          text="Mensagem"
          variant="secondary"
          icon={<MessageCircle size={15} color={theme.colors.ink} />}
          style={styles.messageButton}
        />

        {/* Botão de reticências para mais opções */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={onMorePress}
          activeOpacity={0.7}
        >
          <Ellipsis size={18} color={theme.colors.ink} />
        </TouchableOpacity>
      </View>
    </View>
  );
}