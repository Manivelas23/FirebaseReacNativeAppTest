import React, { FC, useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { ApprovalRender, Button } from "../components";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FlatList } from "react-native-gesture-handler";

interface Props {
    navigation: any
}

const App: FC<Props> = (props) => {
    let isCancelled = false

    const [posts, setPosts] = useState<any>(null)
    const db = firebase.firestore()


    const fetchPendingPosts = async () => {
        await db.collection('posts').where('approved', '==', false).onSnapshot((querySnapShot) => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }
    const onApprove = async (id: string) => {
        const post = await db.collection('posts').doc(id).get()
        post.ref.set({ approved: true }, { merge: true })
    }

    const onReject = async (id: string) => {
        await db.collection('posts').doc(id).delete()
    }

    useEffect(() => {
        fetchPendingPosts()
        isCancelled = true;
    }, [])

    const renderItem = ({ item }: any) => (
        <ApprovalRender
            message={item.data().msg}
            timeStamp={item.data().timeStamp}
            approval={item.data().approved}
            onApprove={() => { onApprove(item.id) }}
            onReject={() => { onReject(item.id) }} />
    );

    return (
        <View style={styles.container}>
            <Button title="Back to Home" onPress={() => { props.navigation.goBack() }} />
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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