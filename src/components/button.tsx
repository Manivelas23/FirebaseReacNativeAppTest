import React, { FC } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    title: string,
    onPress: () => void,
}

const App: FC<Props> = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        borderRadius: 8
    },
    text: {
        color: "white"
    }
})