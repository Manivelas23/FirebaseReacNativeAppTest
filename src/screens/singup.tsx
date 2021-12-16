import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "../components";
import { Button } from "../components";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


interface Props {
    navigation: any
}



const App: FC<Props> = (props) => {

    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const singUp = async () => {
        if (name && email && password) {
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password) as any
                if (user) {
                    const db = firebase.firestore()
                    await db.collection('users').doc(user.uid).set({
                        name,
                        email,
                        password
                    })
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert(`Error`, `Missing Fields`)
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sing Up</Text>
            <Input placeholder="Name" onChangeText={(text) => { setName(text) }} />
            <Input placeholder="Email" onChangeText={(text) => { setEmail(text) }} />
            <Input placeholder="Password" onChangeText={(text) => { setPassword(text) }} />
            <Button title="Sing Up" onPress={singUp} />
            <View style={styles.loginText}>
                <Text style={{ marginHorizontal: 5 }}>Already have an account?</Text>
                <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { props.navigation.navigate('login') }}>
                    <Text style={{ color: "white" }} >Login Here</Text>
                </TouchableOpacity>
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
        backgroundColor: "blue"
    },
    text: {
        backgroundColor: "#121212",
        color: "teal",
        fontSize: 30
    },
    loginText: {
        flexDirection: "row",
        marginVertical: 20
    }
})