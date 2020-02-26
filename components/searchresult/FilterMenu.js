import React, { Component } from 'react'
import { View,Text,TouchableOpacity,StyleSheet} from 'react-native'


export default class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        }
    }

    render() {
        return <View style={styles.menu}>
            <TouchableOpacity onPress={()=>this.orderBy('distance')}><View ><Text style={styles.text}>距离</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.orderBy('ranking')}><View ><Text style={styles.text}>默认排序</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.orderBy('stars')}><View ><Text style={styles.text}>星级</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.orderBy('review_score')}><View ><Text style={styles.text}>客人评分</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.orderBy('price','asc')}><View ><Text style={styles.text}>价格（低至高）</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.orderBy('price','desc')}><View ><Text style={styles.text}>价格（高至低）</Text></View></TouchableOpacity>
        </View>
    }

    orderBy=(rule,dir)=>{
        this.props.orderBy(rule,dir);
    }

}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: 'rgba(255,255,255,1)',
        position:'absolute',
        left:10,
        top:45,
        width:'42%',
        height:'36%',
        zIndex:3,
        borderRadius:4,
        borderColor:'#ccc',
        borderRightWidth:1.5,
        borderBottomWidth:1.5,
        padding:10,
        justifyContent:'space-around'
    },
    text:{
        fontSize:16,
    }
})