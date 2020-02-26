import React, { Component } from 'react'
import { View,Text,TouchableOpacity} from 'react-native'


export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        }
    }

    render() {
        return <View style={{backgroundColor: 'rgba(255,255,255,1)',position:'absolute',right:25,top:42,width:'37%',height:'11%',zIndex:3,borderRadius:4,borderColor:'#ccc',borderRightWidth:1.5,borderBottomWidth:1.5,padding:10,justifyContent:'space-between'}}>
            <TouchableOpacity onPress={this.hideSetting}><View ><Text style={{fontSize:16}}>语言</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={this.hideSetting}><View ><Text style={{fontSize:16}}>货币</Text></View></TouchableOpacity>
        </View>
    }
    hideSetting=()=>{
        this.props.onPress();
    }
}

