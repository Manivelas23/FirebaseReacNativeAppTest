import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Input } from "../components";
import { Button } from "../components";
import { NavigationProp } from "@react-navigation/native";

interface Props {
    navigation: any
}



const App: FC<Props> = (props) => {

    const [msg, setMsg] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)
    const db = firebase.firestore()


    const singOut = () => {
        firebase.auth().signOut()
    }

    const fetchCurrentUser = async () => {
        const currentUser: any = firebase.auth().currentUser
        const user_obj = await db.collection('users').doc((currentUser.uid)).get()


        setUser({
            id: user_obj.id,
            ...user_obj.data()
        })
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    const post = async () => {
        if (msg) {
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false
            }
            try {
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
            {
                user ? user.isAdmin ? (
                    <View>
                        <Button title="Dashboard" onPress={() => {
                            props.navigation.navigate('dashboard_screen')
                        }} />
                    </View>
                ) : null : null
            }
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