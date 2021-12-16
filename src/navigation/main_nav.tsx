import React, { FC, useEffect, useState } from "react";
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app_stack";
import AuthStack from "../screens/auth_stack";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const AppMainNav: FC = () => {
    const [user, setUser] = useState(null) as any

    const boostrap = () => {
        firebase.auth().onAuthStateChanged((_user: any) => {
            if (_user) {
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        boostrap()
    }, [])

    return (
        <NavigationContainer>
            {user != null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default AppMainNav