import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'

export default class ProfileFriends extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      mailFriend: props.route.params.email,
      postsFriend: []
    }
  }

  componentDidMount() {
    db.collection('users').where("email", "==", this.props.email).
      onSnapshot(docs => {
        let userProfile = {}
        docs.forEach(doc => {
          userProfile = doc.data();
        })
        this.setState({
          user: userProfile
        }, () => console.log(this.state.user))
      })

    db.collection('posts').where('owner', '==', this.state.mailFriend).onSnapshot(docs => {
      let posts = []
      docs.forEach(doc => posts.push({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({
        postsFriend: posts
      }, () => console.log(this.state.postsFriend))
    })
  }
  render() {
    return (
      <View>
        <Text>ProfileFriends</Text>
        <View>
          <Text >User: {this.state.user.username} </Text>
          <Text>Email: {this.state.user.email}</Text>
          {
            this.state.user.bio ? <Text>Biografia: {this.state.user.bio}</Text> : ''
          }
          {
            this.props.postsFriend ?
              <View >
                <Text> Posts </Text>
                <FlatList
                  data={this.state.postsFriend}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <PostPerfil id={item.id} data={item.data} />}
                />
                <View>
                  <Text>Cantidad de Posts: {this.state.postsFriend.length}</Text>
                </View>
              </View>
              : <Text> El usuario no posee posts creados</Text>
          }
        </View>
      </View>
    )
  }
}