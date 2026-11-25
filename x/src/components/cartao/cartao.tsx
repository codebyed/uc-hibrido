import { View } from "react-native";

import { styles } from "./styles";

export default function Cartao({ children }: any) {
    return (
        <View style={styles.card}>{ children }</View>
    )
}