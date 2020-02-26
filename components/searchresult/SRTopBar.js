import React, { Component } from 'react'
import { View,StyleSheet,TouchableOpacity,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class SRTopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <View style={styles.topBar}>
          <TouchableOpacity onPress={()=>{Actions.pop()}} style={{zIndex:2}}><Icon name='chevron-left' size={22} color="#fff" /></TouchableOpacity>
          <Text style={{position:'absolute',right:0,left:0,textAlign:'center',color:'#fff',fontSize:16,}}>搜索结果</Text>
        </View>
    }

}

const styles = StyleSheet.create({
    topBar:{
        height:54,
        backgroundColor:'#003580',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        padding:20
    },
})