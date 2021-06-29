import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList, StatusBar, ToastAndroid, } from "react-native";
//import { socketB } from '../App'
import { io } from 'socket.io-client'
import { SERVER_URL } from '../config'

const socketB = io(SERVER_URL)

export const player = {
    host: false,
    roomId: null,
    username: "",
    socketId: "",
    turn: false,
    win: false,
    points: 0
}

const DATA = [{
    id: 1,
    roomID: 'AZER2',
    playerName: 'azert'
},
{
    id: 2,
    roomID: 'AZER3',
    playerName: 'azery'
},
{
    id: 3,
    roomID: 'AZER4',
    playerName: 'azeru'
},
{
    id: 4,
    roomID: 'AZER5',
    playerName: 'azeri'
},
{
    id: 5,
    roomID: 'AZER6',
    playerName: 'azero'
},
{
    id: 6,
    roomID: 'AZER7',
    playerName: 'azerp'
},
{
    id: 7,
    roomID: 'AZER8',
    playerName: 'azeroq'
},
{
    id: 8,
    roomID: 'AZER9',
    playerName: 'azerps'
},
{
    id: 9,
    roomID: 'AZER10',
    playerName: 'azerod'
},
{
    id: 10,
    roomID: 'AZER11',
    playerName: 'azerpf'
},
];

/* const getItem = (data, index) => ({
    roomID: room.id,
    playerName: room.players[0].username
});

const getItemCount = (data) => 20; */

function Item({ roomId, username }) {
    /* const handlePress = (id) => {
        const salons = rooms.find((salon) => {
            return salon.id === id
        })
    } */

    return (
        <TouchableOpacity style={styles.touchableBtn}>
            <Text style={styles.title}>RoomID: {roomId}</Text>
            <Text style={styles.title}>Players: {username}</Text>
        </TouchableOpacity>
    )
};

export default class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNumber: '',
            playerName: "",
            rend: null,
        };
        this.getUserData = this.getUserData.bind(this);

    }

    getUserData() {
        player.username = this.state.playerName
        player.host = true
        player.turn = true
        player.socketId = socketB.id

        socketB.emit('playerData', player)

    }

    componentDidMount() {

    }

    render() {
        const { navigation } = this.props
        let opponentUsername
        var i = 0
        socketB.emit('get rooms')
        socketB.on('list rooms', (rooms) => {
            //console.log(rooms)
            if (rooms.length > 0) {
                rooms.forEach(room => {
                    if (room.players.length == 1) {
                        this.setState({
                            rend: <FlatList
                                data={room.players}
                                renderItem={() => (
                                    <Item roomId={room.players[0].roomId} username={room.players[0].username} />
                                )}
                                style={{ backgroundColor: '#696969' }}
                            />
                        })
                    }

                });
            }
           
            rooms.forEach(room => {
                if (this.state.rend !== null || undefined) {
                    //rend = <ListAccessoriesShowcase />
                    this.setState({
                        rend: <FlatList
                            data={room.players}
                            renderItem={() => (
                                <Item roomId={room.players[0].roomId} username={room.players[0].username} />
                            )}
                            style={{ backgroundColor: '#696969' }}
                        />
                    })

                }
            })
        })
    


        socketB.on('start game', (players) => {
            startGameMagicNumber(players)
            startGameQuickWord(players)
        })

        function startGameMagicNumber(players) {
            navigation.navigate('MagicNumber')

            const otherPlayer = players.find(p => p.socketId != player.socketId)
            opponentUsername = otherPlayer.username

            if (player.host && player.turn) {

                ToastAndroid.show("Your turn !", ToastAndroid.SHORT);

            }
        }

        function startGameQuickWord(players) {
            navigation.navigate('QuickWord')

            const otherPlayer = players.find(p => p.socketId != player.socketId)
            opponentUsername = otherPlayer.username

            if (player.host && player.turn) {

                ToastAndroid.show("Your turn !", ToastAndroid.SHORT);

            }
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container, { backgroundColor: '#696969', alignItems: "center" }}>
                    <Text style={styles.basicText}>Player name</Text>
                    <TextInput
                        style={styles.inputText, { borderWidth: 1 }}
                        //onSubmitEditing={() => { numberInput.focus(); }}
                        onChangeText={(playerName) => this.setState({ playerName })}
                    />
                    <Text style={styles.basicText}>Room</Text>
                    <TextInput
                        style={styles.inputText, { borderWidth: 1 }}
                        //onSubmitEditing={() => { numberInput.focus(); }}
                        onChangeText={(roomNumber) => this.setState({ roomNumber })}
                    />

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.getUserData}>
                        <Text style={styles.basicText}>CREATE ROOM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('QuickWord')}>
                        <Text style={styles.basicText}>JOIN ROOM QUICK WORD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => navigation.navigate('MagicNumber')}>
                        <Text style={styles.basicText}>JOIN ROOM MAGIC NUMBER</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Rooms avaible tap to join</Text>
                </View>
                {/* <FlatList
                data={rooms}
                renderItem={({ item }) => (
                    <Item roomId={item.roomId} username={item.username} />
                )}
                style={{backgroundColor:'#696969'}}
            /> */}
                {this.state.rend}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#696969',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,

    },
    inputView: {
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        color: "white",
        marginBottom: 20
    },
    btn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    basicText: {
        fontSize: 15,
        color: "white"
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#818181",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    },
    scrollView: {
        backgroundColor: 'grey',
        marginHorizontal: 20,
    },
    touchableBtn: {
        backgroundColor: "#818181",
        margin: 5,

    },
});