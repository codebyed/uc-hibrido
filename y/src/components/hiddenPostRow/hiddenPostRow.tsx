// React
import React from "react";

// Blocos nativos de layout e texto
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Ícone de olho cortado para representar o post oculto
import { EyeOff } from "lucide-react-native";

// Tema com as cores oficiais
import { theme } from "../../theme/theme";

// Props que a linha de post oculto precisa receber
interface HiddenPostRowProps {
  authorName: string;
  onRestore: () => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
}

// Componente que substitui o post quando ele é ocultado
export default function HiddenPostRow({
  authorName,
  onRestore,
}: HiddenPostRowProps) {
  return (
    <View style={styles.container}>
      {/* Ícone cinza em uma caixinha arredondada */}
      <View style={styles.iconWrap}>
        <EyeOff size={16} color={theme.colors.inkFaint} />
      </View>

      {/* Textos informativos de que a publicação foi ocultada apenas para este usuário */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Publicação oculta</Text>
        <Text style={styles.desc}>{authorName} · só você não vê</Text>
      </View>

      {/* Botão roxo "Mostrar" para desfazer a ocultação e restaurar o post ao feed */}
      <TouchableOpacity onPress={onRestore} activeOpacity={0.7}>
        <Text style={styles.showText}>Mostrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da linha de post oculto
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 14,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceSunk,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.inkSoft,
  },
  desc: {
    fontSize: 11,
    fontWeight: "400",
    color: theme.colors.inkFaint,
  },
  showText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.accent,
  },
});