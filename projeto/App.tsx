import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {

    const [contador, setContador] = useState(0);
    
    const adicionarUm = () => {
        setContador(contador + 1);
    }
    const removerUm = () => {
        setContador(contador - 1);
    }
    const zerar = () => {
        setContador(0);
    }

    return (
        <View style={styles.container}>
            <Text>{contador}</Text>
            <button onClick={adicionarUm}>Adicionar</button>
            <button onClick={removerUm}>Remover</button>
            <button onClick={zerar}>Zerar</button>
        </View>
    )
}
 