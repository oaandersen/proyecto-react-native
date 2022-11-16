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
            backup: search,

          })
      
          })
        }
      
  
    buscarData(valor) { 
        let userFiltrado = this.state.backup.filter(elm => {
            if(elm.data.email.toLowerCase().includes(valor)){
                return elm
            }
        })
        this.setState({
            guardarValor: userFiltrado,
            buscar:valor
        }, ()=> console.log(this.state.guardarValor))
      }
      
//TextInput ocupa en onChangeText y esta prop ejecuta un callback
//En esa ejecucion podemos pasar el metodo con el que vamos a filtrar

    
  render() {
    return (
        <View>
        <TextInput
      placeholder='Browse...'
      keyboardType='default'
      onChangeText={search => this.buscarData(search)}
      value={this.state.buscar}
      />
        <FlatList
        data={this.state.guardarValor}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>`${item.data.email}`}
          />


        </View>
    )
  }
}