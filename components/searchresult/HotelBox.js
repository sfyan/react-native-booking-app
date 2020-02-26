import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Star from './Star'

export default class HotelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <View style={styles.box}>
            <Image source={{ uri: this.props.item.photo }} style={styles.photo}></Image>
            <View style={{ marginVertical: 10, }}>
                <Text numberOfLines={2} style={styles.hotelTitle} >{this.props.item.hotel_name}</Text>
                {this.renderStars()}
                <View style={styles.row}><Text style={this.props.item.review_score?styles.score:{}}>{this.props.item.review_score}</Text>
                    <Text style={styles.scoreword}>{this.props.item.review_score_word}</Text></View>
                <View style={[styles.row, styles.badgePos]}>{this.showCCBadge()}{this.showRefundableBadge()}</View>
                <View style={styles.pricePos}><Text style={styles.currencyCode}>{this.props.item.hotel_currency_code}</Text>
                    <Text style={styles.price}>{this.props.item.net_price}</Text></View>
                <TouchableOpacity style={styles.button} onPress={()=>{Linking.openURL(this.props.item.hotel_url).catch(err=>console.error('An error occured',err))}}><View><Text style={styles.btnText}>去Booking.com预订</Text></View></TouchableOpacity>
            </View>
        </View>
    }

    renderStars = () => {
        let starArray = [];
        for (var i = 0; i < this.props.item.stars; i++) {
            starArray.push('star');
        }
        return <FlatList data={starArray}
            renderItem={() => <Star></Star>}
            keyExtractor={(item, i) => i.toString()} style={[styles.row, { marginVertical: 2 }]}>
        </FlatList>
    }

    showCCBadge = () => {
        if (this.props.item.cc_required == true) {
            return <Text style={[styles.badge, styles.ccbadge]}>需信用卡</Text>
        }
        else {
            return <Text style={[styles.badge, styles.ccbadge]}>无需信用卡</Text>
        }
    }

    showRefundableBadge = () => {
        var canRefund = true;
        for (var i = 0; i < this.props.item.rooms.length; i++) {
            if (this.props.item.rooms[i].refundable == false) {
                canRefund = false;
                break;
            }
        }
        if (canRefund) {
            return <Text style={[styles.badge, styles.refbadge]}>免费取消</Text>
        }
        else {
            return <Text style={[styles.badge, styles.refbadge]}>收费取消</Text>
        }
    }

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    box: {
        backgroundColor: '#fbfcff',
        flexDirection: 'row',
        borderColor: '#c2c2c2',
        borderBottomWidth: 1.2,
        borderRightWidth: 1.2,
    },
    photo: {
        width: 100,
        height: 140,
        marginRight: 10,
    },
    hotelTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        width: 230,
        lineHeight: 18
    },
    score: {
        backgroundColor: '#003580',
        width: 30,
        height: 30,
        borderRadius: 6,
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    scoreword: {
        textAlignVertical: 'center',
        margin: 4,
        color: "#003580",
        fontWeight: 'bold'
    },
    badgePos: {
        position: 'absolute',
        bottom: 0,
    },
    pricePos: {
        position: 'absolute',
        bottom: 30,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '32%',

    },
    badge: {
        paddingLeft: 3,
        paddingRight: 3,
        marginRight: 2,
        borderRadius: 2,
        borderWidth: 1,
        fontSize: 12,
        color: '#478f4d',
    },
    ccbadge: {
        borderColor: '#478f4d',
        color: '#478f4d',
    },
    refbadge: {
        borderColor: '#0077cc',
        color: '#0077cc',
    },
    currencyCode: {
        fontSize: 10,
        color: '#003580',
        fontWeight: 'bold',
        bottom: 2,
        marginRight: 1
    },
    price: {
        fontSize: 18,
        color: '#003580',
        fontWeight: 'bold'
    },
    button: {
        width: 100,
        backgroundColor: '#0077cc',
        height: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    btnText: {
        fontSize: 10,
        color: '#fff'
    }
})