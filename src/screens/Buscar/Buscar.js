import Busqueda from '../../components/Busqueda/Busqueda';
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

          })
      
          })
        }
      
  
    buscarData(valor) { 
        let userFiltrado = this.state.guardarValor.filter(elm => {
            if(elm.data.email.toLowerCase().includes(valor)){
                return elm
            }
        })
        this.setState({
            guardarValor: userFiltrado,
            buscar:valor
        })
      }
//TextInput ocupa en onChangeText y esta prop ejecuta un callback
//En esa ejecucion podemos pasar el metodo con el que vamos a filtrar

    
  render() {
    return (
        <View>
        <FlatList
            data={this.state.guardarValor}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 'hola mundo'}
          />
      <TextInput
      placeholder='Browse...'
      keyboardType='default'
      onChangeText={search => this.buscarData(search)}
      value={this.state.buscar}
      />
        </View>
    )
  }
}