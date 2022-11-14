import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Perfil from '../screens/Perfil/Perfil'
import Posts from '../screens/Posts/Posts'
import Home from '../screens/Home/Home'
import Feed from './Feed'
const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='Feed' 
        component={Feed}
        options={{
            tabBarIcon: () => <FontAwesome name='home' size={32} color='Grey' />,
            headerShown:false
        }}
        />
        <Tab.Screen
        name='Profile'
        component={Perfil}
        options={{
            tabBarIcon: () => <FontAwesome name="user" size={32} color="Grey" />
        }}
        />
        <Tab.Screen
        name='New Post'
        component={Posts}
         options={{
            tabBarIcon: () => <FontAwesome name="plus-square" size={32} color="Grey" />
        }}
        />
    </Tab.Navigator>
  )
}