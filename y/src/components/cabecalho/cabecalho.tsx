// React para criar o componente do cabeçalho
import React from "react";

// Blocos visuais e de interação do React Native
import { View, Text, TouchableOpacity } from "react-native";

// Ícones de seta voltar, olho para ocultar e logout
import { ChevronLeft, EyeOff, LogOut } from "lucide-react-native";

// Estilos locais e as cores do tema
import { styles } from "./styles";
import { theme } from "../../theme/theme";

// Props que o cabeçalho pode receber
interface CabecalhoProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onHideProfile?: () => void;
  onLogout?: () => void;
  // void é o tipo de uma função que não retorna nada
  // => é o operador que define uma função flecha
}

// Componente Cabecalho
export default function Cabecalho({
  title = "Mural",
  onBack,
  onHideProfile,
  onLogout,
}: CabecalhoProps) {
  return (
    // Container horizontal que distribui os botões nas pontas e o título no meio
    <View style={styles.container}>
      {/* Botão circular de voltar */}
      <TouchableOpacity
        style={styles.circleButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <ChevronLeft size={18} color={theme.colors.ink} />
      </TouchableOpacity>

      {/* Título centralizado com tipografia definida no design */}
      <Text style={styles.title}>{title}</Text>

      {/* Botão circular de ação à direita (logout ou ocultar) */}
      <TouchableOpacity
        style={styles.circleButton}
        onPress={onLogout || onHideProfile}
        activeOpacity={0.7}
      >
        {onLogout ? (
          <LogOut size={18} color={theme.colors.ink} />
        ) : (
          <EyeOff size={18} color={theme.colors.ink} />
        )}
      </TouchableOpacity>
    </View>
  );
}