import React, { Component } from 'react'
import { View, Image, FlatList, Text } from 'react-native'
import { encode } from 'base-64'
import SRTopBar from './searchresult/SRTopBar'
import FilterBar from './searchresult/FilterBar'
import HotelBox from './searchresult/HotelBox'
import FilterMenu from './searchresult/FilterMenu'

var headers = new Headers();
headers.append('Authorization', 'Basic ' + encode('*****' + ":" + '******'));


export default class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            destid: 0,
            isLoading: true,
            hotels: [],
            rows: 100, //pagesize
            offset: 0,
            filterVisible: false,
            group: '',
        };
    }

    UNSAFE_componentWillMount() {
        this.getSearchResult();
    }


    render() {
        return <View style={{ flex: 1 }}>
            <SRTopBar></SRTopBar>
            <FilterBar onPressFilter={this.showFilter}></FilterBar>
            {this.renderFilter()}
            {this.renderList()}
        </View>
    }

    renderList = () => {
        if (this.state.isLoading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: '10%' }}><Image source={require('../images/loading_1.gif')} style={{ height: '70%', width: '100%' }}></Image></View>
        }
        else if (this.state.hotels != null && this.state.hotels.length > 0) {
            return <View style={{ backgroundColor: '#e6e6e6', padding: 6 }}>
                <FlatList data={this.state.hotels} extraData={this.state} renderItem={({ item }) => this.renderItem(item)} keyExtractor={(item, index) => item.hotel_id.toString()} onEndReachedThreshold={0.5} onEndReached={(rule, dir) => this.loadNext()} ItemSeparatorComponent={this.renderSeparator}>
                </FlatList></View>
        } else {
            return <Text>ERROR 404,未查找到数据</Text>
        }
    }


    orderBy = (rule, dir) => {
        this.setState({
            hotels: [],
            isLoading: true,
            offset: 0,
            filterVisible: !this.state.filterVisible,
        }, function () {
            this.loadAvailability(rule, dir)
        }
        );
    }

    showFilter = () => {
        this.setState({
            filterVisible: !this.state.filterVisible,
        })
    }

    renderFilter = () => {
        if (this.state.filterVisible) {
            return <FilterMenu orderBy={this.orderBy}></FilterMenu>

        }
        else return;
    }

    loadNext = (rule, dir) => {
        this.setState({
            offset: this.state.offset + this.state.rows,
        }, function () {
            this.loadAvailability(rule, dir);
        })
    }

    renderItem = (item) => {
        return <HotelBox item={item}></HotelBox>
    }

    renderSeparator = () => {
        return <View style={{ marginBottom: 10 }}></View>
    }

    getSearchResult = () => {
        let desturl = `https://distribution-xml.booking.com/2.6/json/autocomplete?language=en;text=${this.props.dest}`;
        fetch(desturl, {
            method: 'GET',
            headers: headers,
        }).then(res => res.json())
            .then(data => {
                if (data.result) {
                    this.setState({
                        destid: data.result[0].id,
                    }, function () {
                        this.getGroup();
                    })
                } else {
                    this.setState({
                        isLoading: false,
                    })
                };
            })
    }

    getGroup = () => {
        let tempGroup = '';
        for (var i = 0; i < this.props.adult; i++) {
            tempGroup = tempGroup + 'A,'
        }
        for (var j = 0; j < this.props.child; j++) {
            tempGroup = tempGroup + '6,'
        }
        this.setState({
            group: tempGroup,
        }, function () {
            this.loadAvailability();
        });
    }

    loadAvailability = (rule, dir) => {
        let url = '';
        if (rule && (rule == 'price')) {
            if (this.props.roomNumber > 1) {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&no_rooms=${this.props.roomNumber}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn&order_by=${rule}&order_dir=${dir}`
            } else {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn&order_by=${rule}&order_dir=${dir}`

            }
        } else if (rule && (rule != 'price')) {
            if (this.props.roomNumber > 1) {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&no_rooms=${this.props.roomNumber}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn&order_by=${rule}`
            } else {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn&order_by=${rule}`

            }
        } else {
            if (this.props.roomNumber > 1) {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&no_rooms=${this.props.roomNumber}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn`
            } else {
                url = `https://*****.booking.com/2.6/json/hotelAvailability?checkin=${this.props.checkin}&checkout=${this.props.checkout}&city_ids=${this.state.destid}&room1=${this.state.group}&extras=room_details,hotel_details&rows=${this.state.rows}&offset=${this.state.offset}&language=zh-cn`

            }

        }

        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then(res => res.json())
            .then(data => {
                if (data.result) {
                    this.setState({
                        hotels: this.state.hotels.concat(data.result),
                        isLoading: false,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                    })
                }
            })
    }
}
