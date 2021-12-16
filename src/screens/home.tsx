import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const App: FC = () => {

    const singOut = () => {
        firebase.auth().signOut()
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Sing Out" onPress={singOut} />

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