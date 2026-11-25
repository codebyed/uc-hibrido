import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

export default function BirthdayInvitation() {
  // Função chamada quando aperta o botão
  const handleConfirmarPresenca = () => {
    Alert.alert('Presença Confirmada!', 'Obrigado por confirmar sua presença! 🎉');
  };

  return (
    <View style={styles.container}>
      {/* Imagem do convite - pegando da internet */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop' }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Área onde fica os textos e botão */}
      <View style={styles.content}>
        {/* Título principal */}
        <Text style={styles.title}>🎂 Aniversário do João! 🎂</Text>

        {/* Data da festa */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>📅 Data:</Text>
          <Text style={styles.value}>15 de Dezembro de 2026</Text>
        </View>

        {/* Local da festa */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>📍 Local:</Text>
          <Text style={styles.value}>Salão de Festas "Feliz Aniversário"</Text>
        </View>

        {/* Observação extra */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>📝 Observação:</Text>
          <Text style={styles.value}>
            Venha com roupa confortável! Teremos bolo, doces e muita diversão.
            Não esqueça seu presente! 🎁
          </Text>
        </View>

        {/* Botão de confirmar presença */}
        <TouchableOpacity style={styles.button} onPress={handleConfirmarPresenca} activeOpacity={0.8}>
          <Text style={styles.buttonText}>✅ Confirmar Presença</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos do convite
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2f95dc',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 80,
  },
  value: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});