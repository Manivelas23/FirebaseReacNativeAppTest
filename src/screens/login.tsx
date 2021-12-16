import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "../components";
import { Button } from "../components";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


interface Props {
    navigation: any
}

const App: FC<Props> = (props) => {
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const login = async () => {
        if (email && password) {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        }
        else {
            Alert.alert("Missing Fields")
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text}>Log In</Text>
            <Input placeholder="Email" onChangeText={(text) => { setEmail(text) }} />
            <Input placeholder="Password" onChangeText={(text) => { setPassword(text) }} />
            <Button title="Log In" onPress={login} />
            <View style={styles.loginText}>
                <Text style={{ marginHorizontal: 5 }}>Don't have an account?</Text>
                <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { props.navigation.navigate('singup') }}>
                    <Text style={{ color: "white" }} >Sing Up Here</Text>
                </TouchableOpacity>
            </View>
        </View >
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
    },
    loginText: {
        flexDirection: "row",
        marginVertical: 20
    }
})
