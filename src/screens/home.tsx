import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Input, Button, PostRender } from "../components";
import { FlatList } from "react-native-gesture-handler";

interface Props {
    navigation: any
}

const App: FC<Props> = (props) => {

    const [posts, setPosts] = useState<any>(null)
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

    const fetchApprovedPosts = async () => {
        await db.collection('posts').where('approved', '==', true).onSnapshot((querySnapShot) => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }

    useEffect(() => {
        fetchCurrentUser()
        fetchApprovedPosts()
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
                setMsg(" ")
            } catch (error) {
                console.log(error)
            }

        }
        else {
            Alert.alert("Missing Text")
        }
    }

    const renderItem = ({ item }: any) => (
        <PostRender
            message={item.data().msg}
            timeStamp={item.data().timeStamp}
            approval={item.data().approved}
        />
    );

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            {
                posts.length > 0 ? (
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View><Text>Nothing to Display</Text></View>
                )
            }

            <Button title="Sing Out" onPress={singOut} />
            <View>
                <Input placeholder="Escriba algo aqui" onChangeText={(text) => { setMsg(text) }}></Input>
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