 import { Text, View, StyleSheet,  FlatList, TextInput} from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'

export default class Buscar extends Component {

    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            buscar:'',
            guardarValor:'',
            backup:'',
            mensaje:'',
        }
    }
    componentDidMount(){
        db.collection('users')
        .orderBy('createdAt', 'desc')
        .onSnapshot(docs => {
            let search = []
            docs.forEach(doc => {
              search.push({
                id:doc.id,
                data:doc.data()
              })
            })
      
          this.setState({
            guardarValor: search,
            backup: search,

          })
      
          })
        }
      
  
    buscarData(valor) { 
      // if (valor != ''){
        
        let userFiltrado = this.state.backup.filter(elm => {
            if(elm.data.email.toLowerCase().includes(valor)){
                return elm
            }
        }) // ['','','','']

        this.setState({buscar: valor})
        if (userFiltrado.length > 0){

          this.setState({
            guardarValor: userFiltrado,
        })
        
        } else {
          this.setState( {
         mensaje:'Email not found!',
         guardarValor: [],
        })
        }




      // } else {
      //   this.setState({mensaje:'Email not found'})
      // }
    }
      
//TextInput ocupa en onChangeText y esta prop ejecuta un callback
//En esa ejecucion podemos pasar el metodo con el que vamos a filtrar

    
  render() {
    return (
        <View>
        <TextInput
        style={styles.container}
      placeholder='Browse...'
      keyboardType='default'
      onChangeText={search => this.buscarData(search)}
      value={this.state.buscar}
      />
        <FlatList
         style={styles.container2}
        data={this.state.guardarValor}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =><Text>{item.data.email}</Text>}
          />
      <Text>{this.state.mensaje}</Text>
        </View>
    )

  }
}

const styles = StyleSheet.create({
  container:{
      felx: 1,
      backgroundColor: '#d3d3d3',
      width: '100%',
      marginVertical: 20,
      padding: 15,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 10,
    },
    container2:{
      marginVertical: 5,
      padding: 15,
      marginTop:20,
      width: '100%',
      marginHorizontal: 10
    },
  })