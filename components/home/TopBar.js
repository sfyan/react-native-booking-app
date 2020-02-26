import React, { Component } from 'react'
import { View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <View style={styles.topBar}>
          <TouchableOpacity onPress={this.openMenu}><Icon name='bars' size={22} color="#fff" /></TouchableOpacity>
          <Image source={require('../../images/booking.png')} style={styles.img}/>
          <View style={styles.iconGroup}><Icon name='commenting-o' size={22} color="#fff" />
          <TouchableOpacity onPress={this.openSetting}><Icon name='ellipsis-v' size={20}  color="#fff" style={{top:2}}/></TouchableOpacity></View>

        </View>
    }

    openMenu=()=>{
        this.props.onPress();
    }

    openSetting=()=>{
        this.props.onPressSetting();
    }
}

const styles = StyleSheet.create({
    topBar:{
        height:54,
        backgroundColor:'#003580',
        justifyContent:'space-evenly',
        flexDirection:'row',
        alignItems:'center'
    },
    iconGroup:{
        width:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:50
    },
    img:{
        width:120,
        height:20,
        marginTop:3
    }

})