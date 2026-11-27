// React para construir meu componente funcional
import React from "react";

// Componentes nativos de layout e toque do React Native
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Ícones do Lucide exatamente como definidos no design do Pencil
import { House, Search, LayoutGrid, User } from "lucide-react-native";

// Hook para pegar o espaçamento inferior do celular (gestos/botões)
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Cores do meu tema global
import { theme } from "../../theme/theme";

// Chaves possíveis para cada botão da barra
export type TabKey = "inicio" | "buscar" | "mural" | "perfil";

// Interface com as propriedades que a TabBar recebe
interface TabBarProps {
  currentTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
}

// Componente TabBar
export default function TabBar({ currentTab, onTabChange }: TabBarProps) {
  // Leio a distância do fundo da tela do aparelho do usuário
  // useSafeAreaInsets() retorna um objeto com top, bottom, left, right
  const insets = useSafeAreaInsets();

  // Montei a lista dos 4 itens de navegação com seus respectivos ícones e textos
  const tabs = [
    { key: "inicio" as TabKey, label: "Início", icon: House },
    { key: "buscar" as TabKey, label: "Buscar", icon: Search },
    { key: "mural" as TabKey, label: "Mural", icon: LayoutGrid },
    { key: "perfil" as TabKey, label: "Perfil", icon: User },
  ];

  return (
    // Wrapper com posição absoluta e fundo 100% transparente para flutuar sem nenhuma caixa cinza em volta
    <View
      style={[
        styles.wrapper,
        // Garanto que a barra fique sempre elevada acima da barra do celular
        { paddingBottom: Math.max(insets.bottom + 12, 24) },
      ]}
      pointerEvents="box-none" // Permite clicar através do espaço vazio ao redor da barra
    >
      {/* Cápsula branca arredondada com sombra suave do protótipo */}
      <View style={styles.bar}>
        {tabs.map((tab) => {
          // Verifico se este item é o que está ativo no momento
          // currentTab === tab.key compara strings
          const isActive = currentTab === tab.key;
          const Icon = tab.icon;
          // Se estiver ativo, uso a cor roxa (accent); se não, uso cinza claro (inkFaint)
          const color = isActive ? theme.colors.accent : theme.colors.inkFaint;

          return (
            <TouchableOpacity
              key={tab.key}
              // Se estiver ativo, aplico o estilo com o chip roxo claro de fundo
              // isActive && styles.tabItemActive -> se true aplica, se false ignora
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.7}
            >
              {/* Ícone com tamanho 19 como no Pencil */}
              <Icon size={19} color={color} />
              {/* Rótulo com peso 700 se ativo ou 500 se inativo */}
              <Text
                style={[
                  styles.tabLabel,
                  { color, fontWeight: isActive ? "700" : "500" },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Estilização da barra de navegação
const styles = StyleSheet.create({
  // Wrapper flutuante sem fundo
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  // Cápsula arredondada branca com cantos 28px, borda fina e sombra elegante
  bar: {
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.colors.line,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    shadowColor: "#121419",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  // Cada botão ocupa largura igual dentro da cápsula
  tabItem: {
    flex: 1,
    height: "100%",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  // Chip roxo claro no botão selecionado
  tabItemActive: {
    backgroundColor: theme.colors.accentSoft,
  },
  tabLabel: {
    fontSize: 10,
  },
});