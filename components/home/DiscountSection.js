import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux';

const currentDate = new Date();
var formatedMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
const today = currentDate.getFullYear() + '-' + formatedMonth + '-' + currentDate.getDate();

export default class DiscountSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkin: today,
            checkout: this.AddDate(today, 1),
        }
    }

    render() {
        return <View style={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}>
            <Text style={styles.subtitle}>超值优惠</Text>
            <View style={{ height: 100, flexDirection: 'row', marginBottom: 6 }}>
                <TouchableHighlight style={styles.img1} onPress={() => { Actions.searchresult({ dest: '威尼斯', checkin: this.state.checkin, checkout: this.state.checkout, roomNumber: 1, adult: 2, child: 0 }) }}>
                    <ImageBackground source={{ uri: 'https://ac-q.static.booking.cn/images/city/600x400/626/626993.jpg' }} style={styles.img1} imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.discountText}>140元起</Text>
                        <Text style={styles.destText}>威尼斯</Text>
                    </ImageBackground></TouchableHighlight>
                <TouchableHighlight style={styles.imglast} onPress={() => { Actions.searchresult({ dest: '巴黎', checkin: this.state.checkin, checkout: this.state.checkout, roomNumber: 1, adult: 2, child: 0 }) }}>
                    <ImageBackground source={{ uri: 'https://ac-q.static.booking.cn/images/city/600x400/613/613090.jpg' }} style={styles.imglast} imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.discountText}>120元起</Text>
                        <Text style={styles.destText}>巴黎</Text>
                    </ImageBackground></TouchableHighlight>
            </View>
            <View style={{ height: 100, flexDirection: 'row', marginBottom: 6 }}>
                <TouchableHighlight style={styles.img2} onPress={() => { Actions.searchresult({ dest: '那不勒斯', checkin: this.state.checkin, checkout: this.state.checkout, roomNumber: 1, adult: 2, child: 0 }) }}>
                    <ImageBackground source={{ uri: 'https://ac-q.static.booking.cn/images/city/600x400/681/681835.jpg' }} style={styles.img2} imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.discountText}>90元起</Text>
                        <Text style={styles.destText}>那不勒斯</Text>
                    </ImageBackground></TouchableHighlight>
                <TouchableHighlight style={styles.img2} onPress={() => { Actions.searchresult({ dest: '布宜诺斯艾利斯', checkin: this.state.checkin, checkout: this.state.checkout, roomNumber: 1, adult: 2, child: 0 }) }}>
                    <ImageBackground source={{ uri: 'https://ac-q.static.booking.cn/images/city/600x400/664/664067.jpg' }} style={styles.img2} imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.discountText}>100元起</Text>
                        <Text style={styles.destText}>布宜诺斯...</Text>
                    </ImageBackground></TouchableHighlight>
                <TouchableHighlight style={styles.imglast} onPress={() => { Actions.searchresult({ dest: '佛罗伦萨', checkin: this.state.checkin, checkout: this.state.checkout, roomNumber: 1, adult: 2, child: 0 }) }}>
                    <ImageBackground source={{ uri: 'https://ac-r.static.booking.cn/images/city/600x400/619/619608.jpg' }} style={styles.imglast} imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.discountText}>115元起</Text>
                        <Text style={styles.destText}>佛罗伦萨</Text>
                    </ImageBackground></TouchableHighlight>
            </View>
        </View>
    }

    AddDate = (date, days) => {
        let tempdate = new Date(date);
        tempdate.setFullYear(tempdate.getFullYear());
        tempdate.setMonth(tempdate.getMonth());
        tempdate.setDate(tempdate.getDate() + days);
        let formatedMonth = ("0" + (tempdate.getMonth() + 1)).slice(-2);

        return tempdate.getFullYear() + '-' + formatedMonth + '-' + tempdate.getDate();
    }
}

const styles = StyleSheet.create({
    box1: {
        flex: 2,
        marginRight: 6,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    img1: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        flex: 2,
        marginRight: 6
    },
    img2: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        flex: 1,
        marginRight: 6
    },
    imglast: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        flex: 1,
    },
    discountText: {
        fontWeight: 'bold',
        backgroundColor: '#fcb4b5',
        color: '#fff',
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        padding: 2,
        textAlign: 'center',
        width: 70
    },
    destText: {
        color: '#fff',
        position: 'absolute',
        bottom: 0,
        padding: 10,
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: '#000',
        textShadowRadius: 15,
        textShadowOffset: { width: 2, height: 2 }
    }

});