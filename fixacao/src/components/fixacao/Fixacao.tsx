import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FixacaoScreen() {
  // ============================================================
  // ESTADO: uso pra controlar o visual do botão "pressionado"
  // ============================================================
  const [btnState, setBtnState] = useState<'normal' | 'pressed'>('normal');

  return (
    // SafeAreaView evita que o conteúdo fique embaixo do notch/status bar
    <SafeAreaView style={styles.container}>
      {/* ScrollView pra rolar se o conteúdo passar da tela */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ============================================================
           EXERCÍCIO 1: Mude a cor de fundo da tela e a cor do texto do título
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 1: Cores de fundo e título</Text>
          <View style={styles.exercise1Box}>
            <Text style={styles.exercise1Title}>Título com Cor Personalizada</Text>
            <Text style={styles.exercise1Subtitle}>
              Fundo da tela: bege claro | Título: laranja/dourado
            </Text>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 2: Aplique três tamanhos de fonte diferentes em três textos.
           Deixe um deles em negrito e outro em itálico.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 2: Tamanhos de fonte</Text>
          <View style={styles.exerciseBox}>
            <Text style={styles.fontSmall}>Pequeno (12px) - Texto normal</Text>
            <Text style={styles.fontMediumBold}>Médio (18px) - Negrito</Text>
            <Text style={styles.fontLargeItalic}>Grande (24px) - Itálico</Text>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 3: Coloque borda colorida e cantos arredondados em uma imagem.
           Depois, transforme-a em um círculo perfeito.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 3: Imagem com borda e círculo</Text>
          <View style={styles.imagesRow}>
            {/* Imagem 1: borda colorida + cantos arredondados */}
            <View style={styles.imageWrapper}>
              <Text style={styles.imageLabel}>Borda + Cantos Arredondados</Text>
              <Image
                source={{ uri: 'https://picsum.photos/seed/react-native-1/150/150' }}
                style={styles.imageRounded}
              />
            </View>

            {/* Imagem 2: círculo perfeito (borderRadius = metade da largura) */}
            <View style={styles.imageWrapper}>
              <Text style={styles.imageLabel}>Círculo Perfeito</Text>
              <Image
                source={{ uri: 'https://picsum.photos/seed/react-native-2/150/150' }}
                style={styles.imageCircle}
              />
            </View>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 4: Centralize um texto no meio da tela, na horizontal e na vertical.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 4: Texto centralizado</Text>
          <View style={styles.centeredContainer}>
            <Text style={styles.centeredText}>
              Centralizado Horizontal e Verticalmente
            </Text>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 5: Crie uma caixa com margem, espaçamento interno (padding),
           borda e sombra.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 5: Caixa com margin, padding, border, shadow</Text>
          <View style={styles.boxWithShadow}>
            <Text style={styles.boxText}>
              Esta caixa possui:
              {'\n'}• Margin (margem externa)
              {'\n'}• Padding (espaçamento interno)
              {'\n'}• Border (borda)
              {'\n'}• Shadow (sombra)
            </Text>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 6: Coloque três quadrados coloridos lado a lado.
           Depois, reorganize-os em coluna e, em seguida, distribuídos
           de modo que fiquem um em cada extremidade da linha.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 6: Flexbox - Quadrados coloridos</Text>

          {/* --- Lado a lado (flexDirection: row) --- */}
          <Text style={styles.subTitle}>Lado a lado (flexDirection: row):</Text>
          <View style={styles.squaresRow}>
            <View style={[styles.square, { backgroundColor: '#e74c3c' }]} />
            <View style={[styles.square, { backgroundColor: '#2ecc71' }]} />
            <View style={[styles.square, { backgroundColor: '#3498db' }]} />
          </View>

          {/* --- Em coluna (flexDirection: column) --- */}
          <Text style={styles.subTitle}>Em coluna (flexDirection: column):</Text>
          <View style={styles.squaresColumn}>
            <View style={[styles.square, { backgroundColor: '#e74c3c' }]} />
            <View style={[styles.square, { backgroundColor: '#2ecc71' }]} />
            <View style={[styles.square, { backgroundColor: '#3498db' }]} />
          </View>

          {/* --- Distribuídos nas extremidades (justifyContent: space-between) --- */}
          <Text style={styles.subTitle}>Distribuídos (justifyContent: space-between):</Text>
          <View style={styles.squaresSpaceBetween}>
            <View style={[styles.square, { backgroundColor: '#e74c3c' }]} />
            <View style={[styles.square, { backgroundColor: '#2ecc71' }]} />
            <View style={[styles.square, { backgroundColor: '#3498db' }]} />
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 7: Crie um botão com três aparências:
           normal, pressionado (opacidade reduzida) e "desabilitado" (cinza).
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 7: Botão com 3 aparências</Text>
          <View style={styles.buttonsContainer}>
            {/* Botão Normal - azul padrão */}
            <TouchableOpacity
              style={styles.btnNormal}
              onPressIn={() => setBtnState('pressed')}
              onPressOut={() => setBtnState('normal')}
              onPress={() => alert('Botão Normal pressionado!')}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Normal</Text>
            </TouchableOpacity>

            {/* Botão Pressionado - uso state pra mudar opacidade visualmente */}
            <TouchableOpacity
              style={
                btnState === 'pressed'
                  ? styles.btnPressed
                  : styles.btnNormal
              }
              onPressIn={() => setBtnState('pressed')}
              onPressOut={() => setBtnState('normal')}
              onPress={() => alert('Botão Pressionado!')}
              activeOpacity={0.5}
            >
              <Text style={styles.btnText}>
                {btnState === 'pressed' ? 'Pressionado (Opacidade ↓)' : 'Pressione-me'}
              </Text>
            </TouchableOpacity>

            {/* Botão Desabilitado - apenas visual (cinza), disabled={true} impede toque */}
            <TouchableOpacity
              style={styles.btnDisabled}
              onPress={() => alert('Botão desabilitado - apenas visual')}
              disabled={true}
            >
              <Text style={styles.btnTextDisabled}>Desabilitado (Visual)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================================================
           EXERCÍCIO 8: Desenhe um semáforo: uma caixa escura com três
           círculos (vermelho, amarelo e verde) um embaixo do outro.
           ============================================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercício 8: Semáforo</Text>
          <View style={styles.trafficLight}>
            <View style={[styles.light, { backgroundColor: '#ff0000' }]} />
            <View style={[styles.light, { backgroundColor: '#ffcc00' }]} />
            <View style={[styles.light, { backgroundColor: '#00cc00' }]} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// STYLESHEET - Todos os estilos centralizados aqui embaixo
// ============================================================
const styles = StyleSheet.create({
  // ----------------------------------------------------------
  // GERAL / CONTAINER PRINCIPAL (Exercício 1 - fundo da tela)
  // ----------------------------------------------------------
  container: {
    flex: 1,
    backgroundColor: '#f5f0e1', // Cor de fundo da tela alterada (bege claro)
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 16,
    marginBottom: 8,
  },
  exerciseBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 1 - Cores personalizadas (título laranja)
  // ----------------------------------------------------------
  exercise1Box: {
    backgroundColor: '#2c3e50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  exercise1Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f39c12', // Cor do título alterada (laranja/dourado)
    marginBottom: 8,
  },
  exercise1Subtitle: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 2 - Três tamanhos: 12px, 18px (bold), 24px (italic)
  // ----------------------------------------------------------
  fontSmall: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 8,
  },
  fontMediumBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 8,
  },
  fontLargeItalic: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#27ae60',
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 3 - Imagem com borda e círculo perfeito
  // ----------------------------------------------------------
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  imageLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  imageRounded: {
    width: 150,
    height: 150,
    borderWidth: 4,
    borderColor: '#9b59b6',
    borderRadius: 20,
  },
  imageCircle: {
    width: 150,
    height: 150,
    borderWidth: 4,
    borderColor: '#e67e22',
    borderRadius: 75, // Metade de 150 = círculo perfeito!
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 4 - Centralizar horizontal + vertical
  // ----------------------------------------------------------
  centeredContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 5 - Caixa com margin, padding, border, shadow
  // ----------------------------------------------------------
  boxWithShadow: {
    margin: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  boxText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 22,
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 6 - Flexbox: row, column, space-between
  // ----------------------------------------------------------
  squaresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  squaresColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  squaresSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  square: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 7 - Botão 3 estados (normal, pressed, disabled)
  // ----------------------------------------------------------
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  btnNormal: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  btnPressed: {
    backgroundColor: '#3498db',
    opacity: 0.5,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#95a5a6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
    opacity: 0.7,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  btnTextDisabled: {
    color: '#ecf0f1',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ----------------------------------------------------------
  // EXERCÍCIO 8 - Semáforo (caixa escura + 3 círculos)
  // ----------------------------------------------------------
  trafficLight: {
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  light: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
});