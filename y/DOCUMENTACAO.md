# 📱 Documentação do Projeto: Mural de Perfil

Bem-vindo à documentação do meu projeto **Mural de Perfil**! Aqui eu explico tudo o que foi construído, como a arquitetura foi pensada e como transformei o design original do **Pencil** em uma aplicação funcional desenvolvida em **React Native** com **Expo** e **TypeScript**.

---

## 📌 1. Visão Geral do Aplicativo

O **Mural de Perfil** é um aplicativo mobile focado na exibição do perfil de uma criadora/designer (*Marina Costa*) e no seu mural de publicações fotográficas e visuais.

O aplicativo reproduz as telas do design:
1. **01 Mural de Perfil**: Visão principal contendo cabeçalho superior, cabeçalho de perfil (avatar, bio, métricas, ações), abas de navegação (Mural, Salvos, Sobre), feed de posts, linhas de publicações ocultas e a barra de navegação flutuante inferior.
2. **02 Publicação (Detalhes)**: Tela aberta ao clicar em uma foto ou no botão de comentários, com imagem ampliada em alta resolução, autor, legenda, lista de comentários de outros usuários e campo inferior para digitar e enviar novos comentários.
3. **03 Ocultar Publicação**: *Bottom Sheet* modal que sobe da parte inferior da tela quando eu clico em "Ocultar", permitindo ocultar a publicação do feed (ela passa para uma linha recolhida que pode ser restaurada a qualquer momento).

---

## 📁 2. Estrutura de Pastas e Arquivos

Organizei o projeto de forma modular para manter o código limpo e de fácil manutenção:

```text
muraldeperfil/
├── assets/                       # Ícones e fontes da aplicação
├── src/
│   ├── theme/
│   │   └── theme.ts              # Variáveis de cores, espaçamentos e raios do Pencil
│   ├── types/
│   │   └── declarations.d.ts     # Declarações de tipos para ícones e módulos
│   └── components/
│       ├── cabecalho/            # Barra superior (voltar, título e ação rápida)
│       │   ├── cabecalho.tsx
│       │   └── styles.ts
│       ├── perfilCartao/         # Informações do usuário, bio, números e botões de ação
│       │   ├── perfilCartao.tsx
│       │   └── styles.ts
│       ├── postCard/             # Cartão individual do feed com foto e interações
│       │   ├── postCard.tsx
│       │   └── styles.ts
│       ├── hiddenPostRow/        # Linha compacta exibindo posts ocultados
│       │   └── hiddenPostRow.tsx
│       ├── tabBar/               # Menu flutuante inferior em cápsula arredondada
│       │   └── tabBar.tsx
│       ├── postDetalhes/         # Modal de tela cheia para detalhes e comentários (Tela 02)
│       │   └── postDetalhes.tsx
│       ├── ocultarModal/         # Bottom Sheet para a ação de ocultar post (Tela 03)
│       │   └── ocultarModal.tsx
│       ├── botao/                # Componente de botão reutilizável (várias variantes)
│       │   ├── botao.tsx
│       │   └── styles.ts
│       └── cartao/               # Componente de cartão base com bordas e superfície
│           ├── cartao.tsx
│           └── styles.ts
├── App.tsx                       # Componente raiz que orquestra todo o fluxo e estados
├── package.json                  # Dependências (Expo, React Native, Lucide, SVG)
└── tsconfig.json                 # Configuração de TypeScript
```

---

## 🎨 3. Design System e Tokens (`src/theme/theme.ts`)

Todas as cores foram extraídas com precisão do arquivo `muraldeperfil.pen`:

- **Fundo da Tela (`bg`)**: `#F1F2F5`
- **Cartões e Superfícies (`surface`)**: `#FFFFFF`
- **Superfície Rebaixada (`surfaceSunk`)**: `#EAECF0`
- **Texto Principal e Botões Escuros (`ink`)**: `#121419`
- **Texto Secundário (`inkSoft`)**: `#5D6472`
- **Metadados e Linhas Sutis (`inkFaint`)**: `#8A92A1`
- **Linha de Borda (`line`)**: `#E3E6EC`
- **Cor Primária Roxa (`accent`)**: `#5B4BF5`
- **Fundo Roxo Claro (`accentSoft`)**: `#EDEBFF`
- **Cor de Curtida (`like`)**: `#E23A61`
- **Fundo Rosado Suave (`likeSoft`)**: `#FDEBEF`

---

## ⚙️ 4. Como Funcionam os Componentes

### 1. `App.tsx` (O Coração da Aplicação)
- **O que faz**: É onde eu gerencio os estados principais do aplicativo.
- **Estados controlados**:
  - `posts`: lista dos posts que aparecem no feed.
  - `hiddenPosts`: lista de posts que o usuário ocultou.
  - `activeTab`: aba selecionada no perfil ("Mural", "Salvos" ou "Sobre").
  - `currentBottomTab`: botão ativo na barra inferior ("Início", "Buscar", "Mural", "Perfil").
  - `selectedPostForDetail`: post atual aberto na tela de detalhes.
  - `selectedPostForHide`: post atual selecionado para o menu de ocultação.
- **Proteção contra barras do celular**: Envolvi a aplicação em `SafeAreaProvider` e leio `insets.top` e `insets.bottom` para garantir que o conteúdo nunca fique atrás do notch, da câmera ou dos botões virtuais do Android.

### 2. `Cabecalho` (`src/components/cabecalho/`)
- Barra de topo com o título central "Mural" e botões circulares brancos com cantos arredondados de 19px, com ícones `ChevronLeft` e `EyeOff`.

### 3. `PerfilCartao` (`src/components/perfilCartao/`)
- Apresenta o avatar de 84x84 com as iniciais "MC" e efeito de profundidade.
- Nome com tamanho 26, identificador `@marina.costa` e biografia legível.
- Tabela de estatísticas com 3 métricas (**128** mural, **12,4 mil** seguidores, **312** seguindo) separadas por divisores verticais de 1px.
- Botão interativo **Seguir / Seguindo** que troca de estado, cor e ícone ao ser clicado.

### 4. `PostCard` (`src/components/postCard/`)
- Representa as publicações fotográficas.
- Inclui avatar pequeno do autor, data relativa e menu de 3 pontinhos.
- Foto com `height: 250` e cantos arredondados (`14px`).
- Chip interativo de **Curtir** com contador dinâmico (ao curtir, o coração fica vermelho preenchido e o fundo rosado).
- Chip de **Comentários** que abre o modal de detalhes.
- Chip **Ocultar** que aciona o Bottom Sheet.

### 5. `HiddenPostRow` (`src/components/hiddenPostRow/`)
- Quando eu oculto uma foto, ela sai do feed e vira essa linha discreta com contorno cinza.
- Ao clicar no texto roxo **"Mostrar"**, a publicação é automaticamente restaurada para o feed.

### 6. `TabBar` (`src/components/tabBar/`)
- **Como fiz o menu flutuante**: Utilizei `position: "absolute"`, `bottom: 0`, `backgroundColor: "transparent"` e `pointerEvents: "box-none"`.
- A cápsula branca flutua livremente acima do feed, sem nenhuma caixa ou faixa cinza ao redor.
- A distância inferior é calculada dinamicamente (`Math.max(insets.bottom + 12, 24)`) para respeitar qualquer aparelho (Android com 3 botões ou iPhone com barra de gestos).

### 7. `PostDetalhes` (`src/components/postDetalhes/`)
- Modal de tela cheia que abre ao tocar na foto.
- Apresenta imagem de 330px, informações completas do autor, botão de seguir, comentários reais de outros usuários e uma barra inferior (*composer*) com campo de digitação e botão de envio roxo para adicionar novos comentários em tempo real.

### 8. `OcultarModal` (`src/components/ocultarModal/`)
- *Bottom Sheet* modal com animação suave e fundo escurecido.
- Opção focada em:
  - *Ocultar do meu mural* (`EyeOff`): remove a publicação da visualização sem apagar nada.
- Botão preto de confirmação e botão cancelar.

---

## 🚀 5. Como Executar o Projeto

No terminal, dentro da pasta do projeto:

```bash
# Iniciar o servidor de desenvolvimento do Expo
npx expo start
```

- Pressione **`a`** para abrir no emulador Android.
- Pressione **`i`** para abrir no simulador iOS.
- Pressione **`w`** para abrir no navegador web.
- Ou escaneie o QR Code usando o aplicativo **Expo Go** no seu celular físico.

---

## ✅ 6. Validação e Tipagem

O projeto utiliza **TypeScript estrito** e está 100% validado com `npx tsc --noEmit` retornando **0 erros**.
