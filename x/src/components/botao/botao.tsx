import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

export default function Botao({ onPress, text, active }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={ [styles.btn, active && styles.btnActive] }>
            <Text style={ [styles.btnText, active && styles.btnTextActive] }> {text} </Text>
        </TouchableOpacity>
    );
}


