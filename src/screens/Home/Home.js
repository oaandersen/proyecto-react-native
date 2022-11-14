import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React, {Component} from 'react'
import Post from '../../components/Post/Post'
import {db} from '../../firebase/config'
import Busqueda from '../../components/Busqueda/Busqueda';
class Home extends Component {
  constructor(){
    super()
    this.state={
      allPosts:[],
    }
  }

  componentDidMount(){
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => {
        publicaciones.push({
          id:doc.id,
          data:doc.data()
        })
      })

    this.setState({
      allPosts: publicaciones
    })

    })
  }
  buscarData(valor) {
    if (valor !== "") {
      fetch(db.users = valor)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          this.setState({
            guardarValor: data.data,
            readySearch: true,
          })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({
        guardarValor: []
      })
    }
  }
  render(){
    return (
      <>
        <View style={styles.container1}>
          < Busqueda metodoBuscar = {
        (valor) => this.buscarData(valor)
      }
      />
        </View>
        <View style={styles.container3}>
          <FlatList
            style={styles.container2}
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post style={styles.post} navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
          
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'right',
    alignItems:'right',
      color: '#34434D',
  fontSize: 80,
  fontWeight:  'bold',
  
  
  },
  container2:{
    width: '90%',
    
  },
  container3:{
    flex:5,
    alignItems:'center',

  },
  image:{
    height: 300
  },
  post:{

  }
  
})

export default Home