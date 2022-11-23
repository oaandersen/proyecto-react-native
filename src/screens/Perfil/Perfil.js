import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import PostPerfil from '../../components/Post/PostPerfil'

class Perfil extends Component {
  constructor(props){ // contener info del estado inicial y admin props
    super(props) //usar props
    this.state ={ // definimos el estado inicial
      user: {}, //propiedad user arranca siendo un obj lit vacio
      postsUser: [] //postUser arranca siendo un array vacio
    }
  }

  componentDidMount(){ // manipular ciclo de vida
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

    db.collection('posts').where('owner', '==', this.props.email)
    .onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => {
        publicaciones.push({
          id:doc.id,
          data:doc.data()
        })
      })
      this.setState({
        postUser: publicaciones
      }, () => console.log(this.state.postsUser))
    })

  }

  signOut(){
    auth.signOut().then(() => this.setState({ loggin: false }))
    this.props.navigation.navigate('Login')
  }
  
  render(){
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
        <Text >Usuario: {this.state.user.username} </Text>
        <Text>Email: {this.state.user.email}</Text>
        {
          this.state.user.bio ? <Text>Biografia: {this.state.user.bio}</Text>: ''
        }
        <TouchableOpacity 
          onPress={() => this.signOut()}
          style={styles.logOut}  
        >
          <Text style={styles.button}>Cerrar sesión</Text>
        </TouchableOpacity>
        {
          this.props.postsUser ?
          <View style={{flex:1}}>
          <Text> Posts </Text>
          <FlatList
              style={styles.container2}
              data={this.state.postsUser}
              numColumns={3}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                flexGrow: 1,
                }}
              renderItem={({item}) => <PostPerfil id={item.id} data={item.data} />}
            />
            <View>
              <Text>Cantidad de Posts: {this.state.postsUser.length}</Text>
            </View>
        </View>
        : <Text> El usuario no posee posts creados</Text>
        }
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
    padding:10,
    borderColor:'red',
    borderWidth: 1
	},
  container2:{
    width: '90%',
    
  },
});


export default Perfil