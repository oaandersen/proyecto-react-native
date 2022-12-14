import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native';
import { db } from '../../firebase/config';
import Post from '../../components/Post/Post';

export default class FriendProfile extends Component {
  constructor() {
    super()
    this.state = {
      friendPosts: [],
      user: [],
    }
  }


  componentDidMount() {
    console.log(this.props);
    db.collection('posts').where('owner', '==', this.props.route.params.email)
      .onSnapshot(docs => {
        let posteos = []
        docs.forEach(doc => { posteos.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            friendPosts: posteos,
          }, () => console.log(this.state))
        })
      })
    db.collection('users').where('email', '==', this.props.route.params.email).onSnapshot(docs => {
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
  render() {
    return (
      <View>
        <View>
          <Text>{this.state.username}</Text>
          <Text>{this.state.email}</Text>
          <Text>Posts: {this.state.friendPosts.length}</Text>
          <Text>{this.state.bio}</Text>
        </View>
        <FlatList
          data={this.state.friendPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
        />
      </View>
    )
  }

}

