import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged(user => {
        if(user !== null){
          this.props.navigation.navigate('TabNavigation')
        }
      })
      /* auth.signOut() */
    }


    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }
  render() {
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.titulo} >Hello</Text>
          <Text style={styles.text} >Sign in to your account</Text>
          <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='pepito@gmail.com'
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='password'
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
          />
          <View>
              <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                  <Text style={styles.sign}>Sign in</Text>
              </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.text} >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
              <Text style={styles.sign}>Register</Text>
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
    }
})

export default LoginScreen