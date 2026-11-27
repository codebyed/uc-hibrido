// React e hook useState para gerenciar o estado da minha aplicação
import { useState } from "react";

// Componentes nativos do React Native que uso para montar a estrutura visual
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

// StatusBar do Expo para controlar o estilo dos ícones superiores (bateria, wifi, hora)
import { StatusBar } from "expo-status-bar";

// Provider e hook de Safe Area para respeitar o corte da tela (notch) e a barra de navegação do celular
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

// Componentes customizados que criei baseados no design do Pencil
import Cabecalho from "./src/components/cabecalho/cabecalho";
import PerfilCartao from "./src/components/perfilCartao/perfilCartao";
import PostCard, { Post } from "./src/components/postCard/postCard";
import HiddenPostRow from "./src/components/hiddenPostRow/hiddenPostRow";
import TabBar, { TabKey } from "./src/components/tabBar/tabBar";
import PostDetalhes from "./src/components/postDetalhes/postDetalhes";
import OcultarModal from "./src/components/ocultarModal/ocultarModal";

// Importo as cores e variáveis do meu tema global
import { theme } from "./src/theme/theme";

// Propriedades iniciais dos posts
const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: {
      name: "Marina Costa",
      handle: "@marina",
      initials: "MC",
      location: "Bahia",
    },
    time: "há 2 h",
    // Imagem do café/mesa do primeiro post
    imageUrl:
      "https://images.unsplash.com/photo-1659284994810-a552bd8ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTQ4NTMyNjh8&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Primeiro dia na nova estação: café, luz baixa e a lista de ideias para a semana. O mural ficou mais leve desde que comecei a desenhar de manhã.",
    likes: 25,
    commentsCount: 3,
    isLiked: true,
    isHidden: false,
  },
  {
    id: "post-2",
    author: {
      name: "Rafa Moraes",
      handle: "@rafa.moraes",
      initials: "RM",
    },
    time: "há 5 h",
    // Imagem de arquitetura/bancada do segundo post
    imageUrl:
      "https://images.unsplash.com/photo-1658079306367-565b890e56fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTQ4NTMyNTN8&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Detalhe da bancada depois da mudança. Nada combina ainda, e é isso que está funcionando.",
    likes: 24,
    commentsCount: 3,
    isLiked: false,
    isHidden: false,
  },
];

// Aqui eu defino as opções possíveis para as abas internas do perfil
type ProfileTab = "mural" | "salvos" | "sobre";

// Aqui eu crio o componente principal com toda a lógica da tela
interface MuralContentProps {
  userName: string;
  onLogout: () => void; 
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha

}

function MuralContent({ userName, onLogout }: MuralContentProps) {
  // Aqui eu pego os insets seguros do aparelho (topo para status bar e base para a barra de gestos)
  const insets = useSafeAreaInsets();

  // Aqui eu guardo os posts ativos que estão visíveis no feed
  // useState<Post[]> função que retorna um array de posts e uma função para atualizá-lo
  // (INITIAL_POSTS) é o valor inicial do estado
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  // Aqui eu guardo a lista de publicações que o usuário optou por ocultar
  // useState<{ id: string; author: string }[]> função que retorna um array de objetos com id e author e uma função para atualizá-lo
  // ([{ id: "hidden-1", author: "Bia Salles" }]) é o valor inicial do estado
  const [hiddenPosts, setHiddenPosts] = useState<{ id: string; author: string }[]>([
    { id: "hidden-1", author: "Bia Salles" },
  ]);

  // Aqui eu guardo qual aba do perfil está ativa no momento (Mural, Salvos ou Sobre)
  // useState<ProfileTab> função que retorna um valor do tipo ProfileTab e uma função para atualizá-lo
  // ("mural") é o valor inicial do estado
  const [activeTab, setActiveTab] = useState<ProfileTab>("mural");

  // Aqui eu guardo qual botão da barra inferior de navegação está selecionado
  // useState<TabKey> função que retorna um valor do tipo TabKey e uma função para atualizá-lo
  // ("mural") é o valor inicial do estado
  const [currentBottomTab, setCurrentBottomTab] = useState<TabKey>("mural");

  // Aqui eu guardo o post selecionado para abrir a tela cheia de detalhes (Modal 02)
  // useState<Post | null> função que retorna um valor do tipo Post ou null e uma função para atualizá-lo
  // (null) é o valor inicial do estado
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null);

  // Aqui eu guardo o post selecionado para abrir o bottom sheet de ocultação (Modal 03)
  // useState<Post | null> função que retorna um valor do tipo Post ou null e uma função para atualizá-lo
  // (null) é o valor inicial do estado
  const [selectedPostForHide, setSelectedPostForHide] = useState<Post | null>(null);

  // Função para ocultar um post do feed e adicioná-lo à lista de ocultos
  // (postId: string) é o parâmetro da função, que é o id do post que será ocultado
  const handleHidePost = (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (target) {
      // Removo o post dos visíveis
      setPosts(posts.filter((p) => p.id !== postId));
      // Adiciono na listinha de posts ocultos
      setHiddenPosts([
        ...hiddenPosts,
        { id: target.id, author: target.author.name },
      ]);
    }
  };

  // Função para restaurar uma publicação oculta de volta para o feed
  // (hiddenId: string) é o parâmetro da função, que é o id do post que será restaurado
  const handleRestorePost = (hiddenId: string) => {
    // Removo da lista de ocultos
    setHiddenPosts(hiddenPosts.filter((h) => h.id !== hiddenId));
    // Se for um dos posts iniciais, eu reinseri-lo no topo do feed
    const original = INITIAL_POSTS.find((p) => p.id === hiddenId);
    if (original) {
      setPosts((prev) => [original, ...prev]);
    }
  };

  return (
    // Aqui eu aplico o container com o paddingTop dinâmico para não ficar por baixo da barra do celular
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Aqui eu configuro os ícones da barra de status como escuros para contrastar com o fundo claro */}
      <StatusBar style="dark" />

      {/* Aqui eu renderizo o cabeçalho superior com título "Mural" e botões circulares de ação */}
      <Cabecalho
        title="Mural"
        onBack={() => {}}
        onLogout={onLogout}
      />

      {/* Aqui eu monto o ScrollView onde o usuário rola todo o feed e conteúdo */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Aqui eu coloco o bloco do perfil do usuário com foto, bio, números e botões */}
        <View style={styles.section}>
          <PerfilCartao
            name={userName}
            handle={`@${userName.toLowerCase().replace(/\s+/g, ".")} · Produto & fotografia`}
            bio="Desenho interfaces e coleciono cafés nas manhãs calmas."
            stats={{
              posts: 128,
              followers: "12,4 mil",
              following: 312,
            }}
          />
        </View>

        {/* Aqui eu construo a barra com as abas do perfil (Mural, Salvos e Sobre) */}
        <View style={styles.tabsBox}>
          <View style={styles.tabsRow}>
            {/* Aba Mural */}
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "mural" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("mural")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "mural" && styles.tabLabelActive,
                ]}
              >
                Mural
              </Text>
            </TouchableOpacity>

            {/* Aba Salvos */}
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "salvos" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("salvos")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "salvos" && styles.tabLabelActive,
                ]}
              >
                Salvos
              </Text>
            </TouchableOpacity>

            {/* Aba Sobre */}
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "sobre" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("sobre")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "sobre" && styles.tabLabelActive,
                ]}
              >
                Sobre
              </Text>
            </TouchableOpacity>
          </View>

          {/* Linha divisória sutil abaixo das abas */}
          <View style={styles.tabsRule} />
        </View>

        {/* Aqui eu renderizo o conteúdo condicional de acordo com a aba selecionada */}
        <View style={styles.section}>
          {activeTab === "mural" && (
            <View style={styles.feed}>
              {/* Aqui eu percorro e renderizo cada post ativo no feed */}
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onCommentPress={(p) => setSelectedPostForDetail(p)}
                  onHidePress={(p) => setSelectedPostForHide(p)}
                />
              ))}

              {/* Aqui eu renderizo os cartões simplificados de posts que foram ocultados */}
              {hiddenPosts.map((hp) => (
                <HiddenPostRow
                  key={hp.id}
                  authorName={hp.author}
                  onRestore={() => handleRestorePost(hp.id)}
                />
              ))}
            </View>
          )}

          {/* Aqui é o placeholder caso o usuário clique na aba 'Salvos' */}
          {activeTab === "salvos" && (
            <View style={styles.emptyTab}>
              <Text style={styles.emptyTabText}>
                Nenhuma publicação salva ainda.
              </Text>
            </View>
          )}

          {/* Aqui é a descrição na aba 'Sobre' */}
          {activeTab === "sobre" && (
            <View style={styles.emptyTab}>
              <Text style={styles.emptyTabText}>
                Marina Costa é designer de produto e entusiasta de fotografia
                na Bahia.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Aqui eu renderizo a barra flutuante inferior apenas quando nenhum modal/popup estiver aberto */}
      {!selectedPostForHide && !selectedPostForDetail && (
        <TabBar
          currentTab={currentBottomTab}
          onTabChange={(tab) => setCurrentBottomTab(tab)}
        />
      )}

      {/* Aqui eu controlo a abertura do modal da Tela 02 (Detalhes da Publicação) */}
      <PostDetalhes
        visible={!!selectedPostForDetail}
        post={selectedPostForDetail}
        onClose={() => setSelectedPostForDetail(null)}
        onHidePress={(p) => setSelectedPostForHide(p)}
      />

      {/* Aqui eu controlo a abertura do bottom sheet da Tela 03 (Ocultar Publicação) */}
      <OcultarModal
        visible={!!selectedPostForHide}
        post={selectedPostForHide}
        onClose={() => setSelectedPostForHide(null)}
        onConfirmHide={handleHidePost}
      />
    </View>
  );
}

// Aqui eu exporto o componente App encapsulando tudo dentro do SafeAreaProvider
// A tela de login foi removida: o mural de perfil agora abre direto
export default function App() {
  return (
    <SafeAreaProvider>
      <MuralContent userName="Marina Costa" onLogout={() => {}} />
    </SafeAreaProvider>
  );
}

// Aqui eu concentro todos os estilos da tela principal
const styles = StyleSheet.create({
  // Fundo principal da tela usando a cor oficial do tema
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  // Espaçamento do conteúdo com 110 de padding inferior para não ficar embaixo da barra flutuante
  content: {
    paddingBottom: 110,
    gap: 20,
  },
  // Margem lateral padrão de 20 para alinhamento
  section: {
    paddingHorizontal: 20,
  },
  tabsBox: {
    paddingHorizontal: 20,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 22,
  },
  tabItem: {
    paddingBottom: 9,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  // Linha preta indicadora da aba selecionada
  tabItemActive: {
    borderBottomColor: theme.colors.ink,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.inkFaint,
  },
  // Texto em negrito e cor preta para a aba ativa
  tabLabelActive: {
    fontWeight: "700",
    color: theme.colors.ink,
  },
  // Linha horizontal sutil cinza que cruza as abas
  tabsRule: {
    height: 1,
    backgroundColor: theme.colors.line,
  },
  feed: {
    gap: 0,
  },
  emptyTab: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyTabText: {
    fontSize: 13,
    color: theme.colors.inkFaint,
    textAlign: "center",
  },
});
