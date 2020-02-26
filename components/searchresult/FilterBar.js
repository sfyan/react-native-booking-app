import React, { Component } from 'react'
import { View,StyleSheet,TouchableOpacity,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <View>
            <TouchableOpacity onPress={this.openFilter} style={styles.filterBar}><View style={styles.icon}>
              <Icon name='sort-amount-asc' size={15} color="#003580" />
              <Text style={styles.text}> 排序</Text>
              </View></TouchableOpacity>
              </View>
    }

    openFilter=()=>{
        this.props.onPressFilter();
    }

}

const styles = StyleSheet.create({
    filterBar:{
        height:40,
        backgroundColor:'#fff',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        padding:20,
        borderColor:'#ccc',
        borderWidth:1,
    },
    text:{
        textAlign:'center',
        color:'#000',
        fontSize:15,
    },
    icon:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:40,
        height:40
    }
})