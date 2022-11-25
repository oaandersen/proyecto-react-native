import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import PostPerfil from '../../components/Post/PostPerfil';

class Perfil extends Component {
  constructor() {
    super()
    this.state = {
      friendPosts: [],
      user: [],
    }
  }


  componentDidMount() {
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let posteos = []
      docs.forEach(doc => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        })
        this.setState({
          friendPosts: posteos,
        }, () => console.log(this.state))
      })
    })
    db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(docs => {
      let user = []
      docs.forEach(doc => {
        user.push({
          id: doc.id,
          data: doc.data()
        })
        this.setState({
          user: user[0],
          username: user[0].data.userName,
          bio: user[0].data.miniBio,
          email: user[0].data.email
        }, () => {
          console.log(this.state)
        })
      })
    })
  }

  signOut() {
    auth.signOut().then(() => this.setState({ loggin: false }))
    this.props.navigation.navigate('Login')
  }

  deletePost() {
    db.collection('posts').doc(this.props.id).delete()
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.profilePicture}
            source={{
              uri: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
            }}
          />
        </View>
        <View>
          <Text>{this.state.username}</Text>
          <Text>{this.state.email}</Text>
          <Text>Posts: {this.state.friendPosts.length}</Text>
          <Text>{this.state.bio}</Text>
        </View>
        <FlatList style={styles.container2}
          data={this.state.friendPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <PostPerfil navigation={this.props.navigation} id={item.id} data={item.data} />}
        />
        <View>
        <TouchableOpacity onPress={() => this.deletePost()}><Text>Eliminar Post</Text></TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.signOut()}
          style={styles.logOut}
        >
          <Text style={styles.button}>Sign out</Text>
        </TouchableOpacity>
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  containerTexto: {
    display: "flex",
    flexDirection: 'row',
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 50,
    marginTop: 150,
    borderWidth: 1,
    borderColor: "#D4D4D4",
  },
  logOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    fontWeight: "600",
    width: 200,
    padding: 10,
    borderColor: 'red',
    borderWidth: 1
  },
  container2: {
    width: '90%',

  },
});


export default Perfil