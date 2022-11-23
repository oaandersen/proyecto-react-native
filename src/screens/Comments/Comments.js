import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      nuevoComentario:'',
      id:'',
      data:{}
    }
  }

  componentDidMount(){  
    db.collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot(doc => {
      this.setState({
        id: doc.id,
        data: doc.data(),
      })
    })
  }

  anhadirComentario(idDoc, text){
    db.collection('posts')
    .doc(idDoc)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comment: text
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Text>Comments</Text>
        

          <FlatList
          data={this.state.data.comments}
          keyExtractor={ item => item.createdAt.toString()}
          renderItem={ ({item}) => 
          <Text> {item.comment} </Text>}/>

          {
            this.state.data.comments ?
            <Text>Cantidad de Comentarios: {this.state.data.comments.length}</Text>
            :
            ''
          }
          


        <View style={styles.addComment}>
          <TextInput
            onChangeText={text => this.setState({nuevoComentario: text})}
            style = {styles.input}
            keyboardType='default'
            placeholder='Añadi tu comentario'
            value={this.state.nuevoComentario}
          />
          <TouchableOpacity onPress={()=> this.anhadirComentario(this.state.id, this.state.nuevoComentario)}>
            <Text>Enviar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "white",
	},
	addComment: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		width: "80%",
		margin: 8,
	},
	input: {
		width: "70%",
		borderWidth: 1,
		borderColor: "#D4D4D4",
		borderRadius: 8,
		padding: 4,
		margin: 8,
	},
});


export default Comments