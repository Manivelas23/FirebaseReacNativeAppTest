import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApprovalRender } from "../components";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FlatList } from "react-native-gesture-handler";

const App: FC = () => {

    const [posts, setPosts] = useState<any>(null)

    const fetchPendingPosts = async () => {
        const db = firebase.firestore()
        const posts = await db.collection('posts').where('approved', '==', false).get()
        setPosts([...posts.docs])
    }
    const onApprove = (id: string) => {
        alert(`Item with id: ${id} will be approved`)
    }

    const onReject = (id: string) => {
        alert(`Item with id: ${id} will be approved`)
    }
    useEffect(() => {
        fetchPendingPosts()
    })

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Dashboard Screen</Text> */}
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    <ApprovalRender
                        message={item.data().msg}
                        timeStamp={item.data().timeStamp}
                        approval={item.data().approved}
                        onApprove={() => { onApprove(item.id) }}
                        onReject={() => { onReject(item.id) }} />
                }} style={styles.list} />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "blue"
    },
    text: {
        backgroundColor: "#121212",
        color: "teal"
    },
    list: {
        backgroundColor: "pink"
    }
})