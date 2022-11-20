import { View, Text } from 'react-native'
import React, {Component} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Perfil from '../screens/Perfil/Perfil'
import Posts from '../screens/Posts/Posts'
import Home from '../screens/Home/Home'
import Feed from './Feed'
import Buscar from '../screens/Buscar/Buscar'
const Tab = createBottomTabNavigator()

class TabNavigation extends Component {
	constructor(props) {
    super(props);
    console.log(props.route.params)
	}

	render() {
  return (
    <>
    
    {this.props.route.params.loggin ?
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
        // component={Perfil}
        children={(navProps) => <Perfil email={this.props.route.params.email} loggin={this.props.route.params.loggin} {...navProps}/>}
        options={{
            tabBarIcon: () => <FontAwesome name="user" size={32} color="Grey" />
        }}
        />
        <Tab.Screen
        name='Search'
        component={Buscar}
         options={{
            tabBarIcon: () => <FontAwesome name="search" size={32} color="Grey" />
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
     : null}
    </>
  )
}
}

export default TabNavigation