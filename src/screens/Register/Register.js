import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth, db} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state ={
            username:'',
            email:'',
            password:'',
            bio:'',
        }
    }

    registrarUsuario(username, email, password, bio){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {
            return(
                db.collection('users').add({
                    email:email,
                    username:username,
                    bio:bio,
                    createdAt:Date.now()
                })
            )
        })
        .then(resp => this.props.navigation.navigate('Home'))
        .catch(err => console.log(err))      
    }

  render() {
    return (
    <View style={styles.container}>
        <View>
            <Text style={styles.titulo} >Register</Text>
            <TextInput
                style={styles.input}
                placeholder='username'
                keyboardType='default'
                onChangeText={text => this.setState({username: text})}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                placeholder='biografi'
                keyboardType='default'
                onChangeText={text => this.setState({bio: text})}
                value={this.state.bio}
            />
            <TextInput
                style={styles.input}
                placeholder='pepito@gmail.com'
                keyboardType='email-address'
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='password'
                keyboardType='default'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password)}>
                    <Text style={styles.sign}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text style={styles.sign}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        felx: 1,
        backgroundColor: '#f1f1f1',
        width: '100%',
        marginVertical: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent:'center'
      },
      titulo:{
        color: '#34434D',
    fontSize: 80,
    fontWeight:  'bold',
      },
      text:{
        color: '#000',
        fontSize: 20,
      },
        input:{
    padding: 10,
    paddingStart: 20,
    width:'80%',
    height: 50,
    marginTop:20,
    borderRadius: 30,
    backgroundColor: '#fff',
    color: 'gray',
        },
        sign:{
          fontSize:14,
          color: 'gray',
          marginTop: 20,
          width:'80%',
          height: 50,
          borderRadius: 25,
          padding: 10,
        },
    containerRedirect:{
        marginTop: 32
    }
  })
  

export default Register