import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth, db} from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state ={
            username:'',
            email:'',
            password:'',
            bio:'',
            mensaje:'',
            errorMensaje: '',
            profileImage:'',
        }
    }

    registrarUsuario(username, email, password, bio){
if (username.length >= 4 && email.includes('@') && password.length >= 4 && bio.length >= 0){

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
        .catch(err => console.log(this.setState({mensaje:err.message})))      
    } else if (username.length <= 4){
        this.setState({mensaje:'El Username requiere un minimo de 4 caracteres'})
    } else if (!email.includes('@')){
        this.setState({mensaje:'El mail no esta cargado correctamente'})        
    } else if (password.length <= 5){
        this.setState({mensaje:'La contrasena necesita un minimo de 6 caracteres'})        
    }else if (bio.length <= 0){
        this.setState({mensaje:'No puede quedar ningun campo vacio'})        
    }
}
buscarImagen(){
    ImagePicker.launchImageLibraryAsync()
    .then(resp => {
        fetch(resp.uri)
        .then(data => data.blob())
        .then(img => {
            console.log(storage)
            const ref = storage.ref(`profilePics/${Date.now()}.jpg`)
            ref.put(img)
            .then(()=> {
                ref.getDownloadURL()
                .then(url => {
                        this.setState({profileImage:url})
                    }
                )
            })
        })
        .catch(err => console.log(err))
    })
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
                        <TouchableOpacity onPress={()=> this.buscarImagen()}>
                <Text style={styles.foto}>Browse profile image</Text>
            </TouchableOpacity>
            </View>
            <Text>{this.state.mensaje}</Text>
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password, this.state.bio)}>
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
    },
    foto:{
        fontSize:15,
        color: 'black',
        marginTop: 20,
        width:'80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
      },
  })
  

export default Register