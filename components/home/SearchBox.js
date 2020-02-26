import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Datepicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import { Actions } from 'react-native-router-flux';



const currentDate = new Date();
var formatedMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
const today = currentDate.getFullYear() + '-' + formatedMonth + '-' + currentDate.getDate();

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Sean',
            checkin: today,
            checkout: this.AddDate(currentDate,1),
            isChecked: false,
            dest:'',
        };
    }

    render() {
        return <View style={{ height: 360, backgroundColor: '#f5f5f5', padding: 20 }}>
            <Text style={styles.header}>{this.state.userName},  你好！</Text>
            <Text style={styles.article}>搜索目的地/住宿</Text>
            <View style={styles.box}>
                <View style={styles.cell}><Icon name='search' size={22} color='#ccc' style={styles.icon} />
                <TextInput placeholder='请输入目的地' placeholderTextColor='#939393' style={{ fontSize: 15 }} onChangeText={this.searchTextChange}></TextInput></View>
                <View style={styles.cell}><Icon name='calendar' size={22} color='#ccc' style={styles.icon} />
                    <Datepicker style={{ width: 115 }}
                        date={this.state.checkin}
                        mode="date"
                        placeholder={today}
                        format="YYYY年MM月DD日"
                        minDate={currentDate}
                        maxDate={new Date(2030, 11, 31)}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateText: {
                                fontSize: 15,
                            },
                            placeholderText: {
                                fontSize: 15,
                                color: '#000'
                            },
                            dateInput: {
                                borderWidth: 0,
                                margin: 0,
                                padding: 0
                            }
                        }}
                        onDateChange={(date) => { this.setState({ checkin: this.formatDate(date) });
                        if(this.state.checkout<this.formatDate(date)){this.setState({checkout: this.AddDate(this.formatDate(date),1)})} }} />
                    <Text>-</Text>
                    <Datepicker style={{ width: 115 }}
                        date={this.state.checkout}
                        mode="date"
                        placeholder={this.state.checkout}
                        format="YYYY年MM月DD日"
                        minDate={this.state.checkout}
                        maxDate={new Date(2030, 11, 31)}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateText: {
                                fontSize: 15,
                            },
                            placeholderText: {
                                fontSize: 15,
                            },
                            dateInput: {
                                borderWidth: 0,
                                margin: 0,
                                padding: 0
                            }
                        }}
                        onDateChange={(date) => { this.setState({ checkout: this.formatDate(date)  }) }} /></View>
                <View style={styles.cell}><Icon name='user-o' size={22} color='#ccc' style={styles.icon} />
                    <TouchableOpacity onPress={this.showGroup}><Text style={{ color: '#000', fontSize: 15 }}>{this.props.roomNumber}间房 • {this.props.adult}位成人 • {this.props.child}名儿童</Text></TouchableOpacity></View>
                <TouchableOpacity onPress={() => { Actions.searchresult({dest:this.state.dest,checkin:this.state.checkin,checkout:this.state.checkout,roomNumber:this.props.roomNumber,adult:this.props.adult,child:this.props.child}) }}><View style={styles.celllast}><Text style={{ color: '#fff', fontSize: 16 }}>搜索</Text></View></TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <CheckBox
                    onClick={() => {
                        this.setState({
                            isChecked: !this.state.isChecked
                        })
                    }}
                    isChecked={this.state.isChecked}
                    leftText={"我要出差"}
                /></View>
        </View>

    }

    AddDate = (date,days)=>{
        let tempdate = new Date(date);
        tempdate.setFullYear(tempdate.getFullYear());
        tempdate.setMonth(tempdate.getMonth());
        tempdate.setDate(tempdate.getDate()+days);
        let formatedMonth = ("0" + (tempdate.getMonth() + 1)).slice(-2);
        let formatedDate = ("0"+tempdate.getDate()).slice(-2)

        return tempdate.getFullYear()+'-'+formatedMonth+'-'+formatedDate;
    }

    formatDate = (date)=>{
        let newdate;
        newdate=date.replace('年','-');
        newdate=newdate.replace('月','-');
        newdate=newdate.replace('日','');
        return newdate;
    }

    showGroup = () => {
        this.props.onPressGroup();
    }

    searchTextChange = (text)=>{
        this.setState({
            dest:text,
        })
    }
    
}

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
        marginRight: 10,

    },
    box: {
        borderWidth: 4,
        borderColor: '#feba02',
        borderRadius: 6,
        marginTop: 10,
        backgroundColor: '#feba02'
    },
    cell: {
        borderRadius: 5,
        borderBottomColor: '#ffbb02',
        backgroundColor: '#fff',
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,

    },
    celllast: {
        borderRadius: 5,
        borderBottomColor: '#feba02',
        backgroundColor: '#0070c2',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    article: {
        fontSize: 16,
    }
});