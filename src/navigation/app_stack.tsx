import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, DashBoard } from "../screens"

const { Navigator, Screen } = createStackNavigator();

const AppStack: FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home_screen" component={Home} />
            <Screen name="dashboard_screen" component={DashBoard} />
        </Navigator>
    )
}

export default AppStack 