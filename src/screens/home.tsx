import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Input } from "../components";
import { Button } from "../components";


const App: FC = () => {

    const [msg, setMsg] = useState<string | null>(null)
    const singOut = () => {
        firebase.auth().signOut()
    }

    const post = async () => {
        if (msg) {
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false
            }
            try {
                const db = firebase.firestore()
                await db.collection('posts').add(data)
            } catch (error) {
                console.log(error)
            }

        }
        else {
            Alert.alert("Missing Text")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Sing Out" onPress={singOut} />
            <View>
                <Input placeholder="Escriba algo aqui malparido" onChangeText={(text) => { setMsg(text) }}></Input>
                <Button title="Post" onPress={post} />
            </View>
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
        backgroundColor: "teal"
    },
    text: {
        backgroundColor: "white",
        color: "teal"
    }
})