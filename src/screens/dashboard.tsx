import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const App: FC = () => {
    return (
        <View>
            <Text>Dashboard Screen</Text>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexDirection: "column",
        backgroundColor: "blue"
    },
    text: {
        backgroundColor: "#121212",
        color: "teal"
    }
})