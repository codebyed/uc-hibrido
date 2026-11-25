import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

export default function App() {
  
  const [ contador, setContador ] = useState(0);

  const adicionarUm = () => setContador(() => contador + 1);
  const removerUm = () =>  setContador(() => contador - 1);
  const zerar = () =>  setContador(0);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <Text>Contador: { contador } </Text>

      <Button title='Adicionar' onPress={adicionarUm} />
      <Button title='Remover' onPress={removerUm} />
      <Button title='Zerar' onPress={zerar} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
