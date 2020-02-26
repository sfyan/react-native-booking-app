import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, Modal,Button,TouchableHighlight } from 'react-native'
import Swiper from 'react-native-swiper'
import TopBar from './home/TopBar'
import SearchBox from './home/SearchBox'
import DiscountSection from './home/DiscountSection'
import Menu from './home/Menu'
import Setting from './home/Setting'


var bannerList = require('../data/data.js')


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swipercontent: [],
            showGroups: false,
            modalVisible: false,//模态场景是否可见
            menuVisible:false,
            settingVisible:false,
            roomNumber:1,
            adult:1,
            child:0,
            scroll:true,
            roomNumberDisabled:false,
            adultDisabled:false,
            childDisabled:false,
        };
    }

    UNSAFE_componentWillMount() {

        this.setState(
            {
                swipercontent: bannerList
            }
        )
    }

    render() {
        return <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#00224f" barStyle="light-content" />
            {this.renderSetting()}
            <TopBar onPress={this.openMenu} onPressSetting={this.openSetting}></TopBar><ScrollView style={{ flex: 1 }} scrollEnabled={this.state.scroll}>
            {this.renderMenu()}
                <SearchBox onPressGroup={this.changeGroupSetting} roomNumber={this.state.roomNumber} adult={this.state.adult} child={this.state.child}></SearchBox>
                <View style={{ height: 140 }}><Swiper autoplay={true} loop={true} showsButtons={false}	>
                    {this.state.swipercontent.map((item, i) => {
                        return <View key={i} style={styles.imgBox} >
                            <Image source={{ uri: item.image }} style={styles.img} resizeMode='stretch'></Image>
                        </View>
                    })}
                </Swiper></View>
                <DiscountSection></DiscountSection></ScrollView>
            <Modal animationType={'side'}
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.SettingBox}>
                        <Text style={styles.boldtext}>选择客房和住客人数</Text>
                        <View style={styles.row}><Text>房间</Text><View style={styles.calculatorBox}>
                                {this.renderRoomMinus()}<Text style={styles.boldtext}>{this.state.roomNumber}</Text>
                            <TouchableHighlight onPress={this.roomSum} underlayColor='#ccc'><Text style={styles.squareActive}>+</Text></TouchableHighlight></View></View>
                        <View style={styles.row}><Text>成人</Text><View style={styles.calculatorBox}>{this.renderAdultMinus()}<Text style={styles.boldtext}>{this.state.adult}</Text><TouchableHighlight onPress={this.adultSum} underlayColor='#ccc'><Text style={styles.squareActive}>+</Text></TouchableHighlight></View></View>
                        <View style={styles.row}><Text>儿童</Text><View style={styles.calculatorBox}>{this.renderChildMinus()}<Text style={styles.boldtext}>{this.state.child}</Text><TouchableHighlight onPress={this.childSum} underlayColor='#ccc'><Text style={styles.squareActive}>+</Text></TouchableHighlight></View></View><View>
                            <Button onPress={this.closeGroupSetting} title='完成'></Button>
                            </View></View></View></Modal>
        </View>
    }

    renderRoomMinus=()=>{
        if(this.state.roomNumber<=1){
            return <View><Text style={styles.square}>-</Text></View>
        }else{
            return <TouchableHighlight onPress={this.roomMinus} underlayColor='#ccc'><Text style={styles.squareActive}>-</Text></TouchableHighlight>
        }
    }

    renderAdultMinus=()=>{
        if(this.state.adult<=1){
            return <View><Text style={styles.square}>-</Text></View>
        }else{
            return <TouchableHighlight onPress={this.adultMinus} underlayColor='#ccc'><Text style={styles.squareActive}>-</Text></TouchableHighlight>
        }
    }


    renderChildMinus=()=>{
        if(this.state.child<=0){
            return <View><Text style={styles.square}>-</Text></View>
        }else{
            return <TouchableHighlight onPress={this.childMinus} underlayColor='#ccc'><Text style={styles.squareActive}>-</Text></TouchableHighlight>
        }
    }

    roomMinus=()=>{
            this.setState({
                roomNumber:this.state.roomNumber-1,
            })
    }

    adultMinus=()=>{
            this.setState({
                adult:this.state.adult-1,
            })
    }

    childMinus=()=>{
        this.setState({
            child:this.state.child-1,
        })
}

    roomSum=()=>{
        this.setState(
            {
                roomNumber:this.state.roomNumber+1,
            }
        )
    }
    adultSum=()=>{
        this.setState(
            {
                adult:this.state.adult+1,
            }
        )
    }

    childSum=()=>{
        this.setState(
            {
                child:this.state.child+1,
            }
        )
    }

    openMenu =()=>{
        this.setState({
            menuVisible:!this.state.menuVisible,
            scroll:!this.state.scroll,
        })
    }

    openSetting =()=>{
        this.setState({
            settingVisible:!this.state.settingVisible,
            scroll:!this.state.scroll,
        })
    }

    renderMenu=()=>{
        if(this.state.menuVisible){
           return <View style={{backgroundColor: 'rgba(0,0,0,0.7)',position:'absolute',top:0,bottom:0,left:0,right:0,zIndex:2}}><Menu></Menu></View>

        }
        else return;
    }

    renderSetting=()=>{
        if(this.state.settingVisible){
            return <Setting onPress={this.openSetting}></Setting>
 
         }
         else return;
    }
    changeGroupSetting = () => {
        this.setState({
            showGroups: !this.state.showGroups,
            modalVisible:true,
        })
    }
    
    closeGroupSetting=()=>{
       this.setState({modalVisible:false});
    }

}

const styles = StyleSheet.create({

    imgBox:{
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#e6e6e6', 
        height: '90%'
    },
    img:{
        width: '85%', 
        height: '75%', 
        borderRadius: 5
    },
    modalBackground:{
        flex: 1, 
        backgroundColor: 'rgba(1,1,1,0.7)'
    },
    SettingBox:{
        position: 'absolute', 
        bottom: 0, 
        left:0,
        right:0, 
        backgroundColor: '#fff', 
        textAlign: 'center',
        padding:20,
    },
    boldtext:{
        fontSize:16,
        fontWeight:'bold',
    },
    square:{
        borderWidth:1,
        height:40,
        width:40,
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:4,
        color:'#ccc',
        borderColor:'#ccc'
    },
    squareActive:{
        borderWidth:1,
        height:40,
        width:40,
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:4,
        color:'#0077cc',
        borderColor:'#0077cc'
    },
    calculatorBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:120
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#ccc',
        paddingBottom:10,
        paddingTop :10
    }
});