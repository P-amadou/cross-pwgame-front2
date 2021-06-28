import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, VirtualizedList, ScrollView, StatusBar, ToastAndroid } from "react-native";
import { socketB } from '../App'

const player = {
    host: false,
    roomId: null,
    username: "",
    socketId: "",
    turn: false,
    win: false
}
const DATA = [];

const getItem = (data, index) => ({
    roomID: room.id,
    playerName: room.players[0].username
});

const getItemCount = (data) => 20;

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNumber: '',
            playerName: ""
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
    render() {
        const { navigation } = this.props
        let opponentUsername
        socketB.emit('get rooms')
        /* socketB.on('list rooms',(rooms)=>{
                    let rend 
                    if (room.players.length > 1) {
                        
                        //rend = <ListAccessoriesShowcase />
                        return(
                            rend
                        )
                    }
        
                    if (rend !== null || undefined) {
                        //rend = <ListAccessoriesShowcase />
                        return(
                            rend
                        )
                    }
                }) */

        socketB.on('start game', (players) => {
            startGame(players)
        })

        function startGame(players) {
            navigation.navigate('MagicNumber')

            const otherPlayer = players.find(p => p.socketId != player.socketId)
            opponentUsername = otherPlayer.username

            if (player.host && player.turn) {

                ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);

            }
        }
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Player name</Text>
                    <TextInput
                        style={styles.inputText}
                        //onSubmitEditing={() => { numberInput.focus(); }}
                        onChangeText={(playerName) => this.setState({ playerName })}
                    />
                    <Text>Room</Text>
                    <TextInput
                        style={styles.inputText}
                        //onSubmitEditing={() => { numberInput.focus(); }}
                        onChangeText={(roomNumber) => this.setState({ roomNumber })}
                    />
                    <TouchableOpacity
                        style={styles.signupBtn}
                        onPress={this.getUserData}>
                        <Text style={styles.loginText}>VALIDATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signupBtn}
                        onPress={() => navigation.navigate('QuickWord')}>
                        <Text style={styles.loginText}>JOIN ROOM QUICK WORD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtn}
                        onPress={() => navigation.navigate('MagicNumber')}>
                        <Text style={styles.loginText}>JOIN ROOM MAGIC NUMBER</Text>
                    </TouchableOpacity>
                    {/* <View>
                        <Text>Rooms Avaible</Text>
                        {{}}
                        <VirtualizedList
                            key={getItem.index}
                            data={DATA}
                            initialNumToRender={4}
                            renderItem={({ item }) => <Item title={item.playerName} />}
                            keyExtractor={item => item.roomID}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                    </View> */}

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    signupBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
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
});