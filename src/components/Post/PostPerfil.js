import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import Comments from '../../screens/Comments/Comments'

class PostPerfil extends Component {

    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            likesCount:props.data.likes.length,
            commentCount: props.data.comments.length,
            isMyLike: false
        }
    }

  render() {
    return (
      <View style={styles.post}>
        <Text>{this.props.username}</Text>
        <Image source={this.props.data.photo} resizeMode={'contain'}/>

        <View >
        <Text  >{this.props.data.description}</Text>
        <View>
        <Text>{this.state.likesCount}</Text> 
        <Text>{new Date(this.props.data.createdAt).toDateString()}</Text> 
        
        </View>
      </View>
      </View>
    )
  }
  
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      marginBottom: 20,
      
  },
  camarabody:{
      height:500
  },
  image:{
      height: 300,
      width: 300,
      resizeMode: 'contain',
      margin: 15,
      
      
  },
  post:{
    marginBottom: 60,
    backgroundColor: 'lightgrey',
    borderEndWidth: 10,
    borderEndColor: 'black',
  },
  tituloPost:{
    fontSize: '16px',
    marginBottom: 10
    
  },
  owner:{
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: 15
  },
  datosPost:{
    margin: 10
  }
})

export default PostPerfil