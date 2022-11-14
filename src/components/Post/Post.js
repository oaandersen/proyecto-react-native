import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import Comments from '../../screens/Comments/Comments'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount:props.data.likes.length,
            commentCount: props.data.comments.length,
            isMyLike: false
        }
    }

    componentDidMount(){
      let myLike = this.props.data.likes.includes(auth.currentUser.email)
      if(myLike){
        this.setState({
          isMyLike:true
        })
      }
    }

    like(){
      db
      .collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          isMyLike:true,
          likesCount: this.state.likesCount + 1
        })
      })
      .catch(err => console.log(err))

    }

    unlike(){
      db
      .collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          isMyLike:false,
          likesCount: this.state.likesCount - 1
        })
      })
      .catch(e => console.log(e))
    }
    

  render() {
    console.log(this.props)
    return (
      <View style={styles.post}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate(
          'Feed',
          {
            screen: 'FriendProfile',
            params:{
              email:this.props.data.owner
            }
          }
        )}>
          <Text style={styles.owner} >{this.props.data.owner}</Text>
        </TouchableOpacity>
        <Text>{this.props.username}</Text>
        <Image style={styles.image} source={this.props.data.photo} resizeMode={'contain'}/>

        <View style={styles.datosPost}>
        <Text style={styles.tituloPost} >{this.props.data.description}</Text>
        <View>
        <Text>{this.state.likesCount}</Text>  
       
        {
           this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='black' size={16} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={16} />
                </TouchableOpacity>

        }
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments',
            {id:this.props.id}
            )}>
            <Text>Agregar comentario</Text>
          </TouchableOpacity>
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
    backgroundColor: '',
    textAlign: 'center',
    marginTop: 15
  },
  datosPost:{
    margin: 10
  }
})

export default Post