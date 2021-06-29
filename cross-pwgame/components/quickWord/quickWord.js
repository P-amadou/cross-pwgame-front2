import React, { useState } from 'react';
import {Text, StatusBar, View, TextInput, TouchableOpacity, StyleSheet, Modal, Button, SafeAreaView  } from 'react-native';
import { player } from '../pregame';

let randomWords = require('random-words');
let user1Point = 0;
let user2Point = 0;
export default class QuickWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = { word: '',
    finalWord:'',winner: false,loser: false };

        this.runQuickWord = this.runQuickWord.bind(this);
        this.screenLoad = this.screenLoad.bind(this);

    }

    componentDidMount() {

    }

    runQuickWord() {
        this.setState({ show: true })
        console.log("finalWord:" + this.state.finalWord);
        console.log("word:" + this.state.word);
        if (this.state.word == this.state.finalWord) {
            this.setState({ winner: true })
        } else {
            this.setState({ loser: true })
        }
        if (player.points >= 15) {
            player.win = true
        }
    }

    screenLoad() {
        let randWord = randomWords();
        //let word = Math.ceil(randWord)
        console.log(randWord);
        this.setState({ finalWord: randWord })
    }

    render() {
        const { navigation } = this.props
        if (this.state.finalWord == '') {
            this.screenLoad()
        }
        return (
            <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ fontSize: 25,marginBottom:20 }}>Quick Word Game</Text>
                <Text style={{ fontSize: 20 ,marginBottom:20 }}>Quickly type the random displayed word</Text>
                <View style={styles.inputView}>
                    <Text style={{ fontSize: 30 }}>{this.state.finalWord}</Text>
                    
                    <TextInput 
                        style={styles.inputText,{borderWidth:1}}
                        onChangeText={(word) => this.setState({ word })}
                        ref={input => { this.textInput = input }}
                    />
                </View>

                <TouchableOpacity style={styles.loginBtn}
                        onPress={this.runQuickWord}>
                        <Text style={styles.loginText}>SUBMIT</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.signupBtn}
                    onPress={() => { navigation.navigate('Home') }}>
                    <Text style={styles.loginText}>HOME</Text>
                </TouchableOpacity>
                {this.state.winner == true ? <Modal transparent={true} visible={this.state.show}>
                        <View style={{ backgroundColor: "#000", flex: 1 }}>
                            <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={{ fontSize: 50 }}>You win congrats!</Text>
                                <Text>Player {player.username} points : {player.points++}</Text>
                                {this.textInput.clear()}
                                <Button title="Close" onPress={() => { this.setState({ show: false,win:false,finalWord:'' }) }} />
                            </View>
                        </View>
                    </Modal> : <Text></Text>}
                    {this.state.loser == true ?
                        <Modal transparent={true} visible={this.state.show}>
                            <View style={{ backgroundColor: "#000", flex: 1 }}>
                                <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                    <Text style={{ fontSize: 50 }}>Sorry you lose</Text>
                                    <Button title="Close" onPress={() => { this.setState({ show: false,loser:false,minus:false,plus:false }) }} />
                                </View>
                            </View>
                        </Modal> : <Text></Text>}
                        {player.win == true ? <Modal transparent={true} visible={this.state.show}>
                        <View style={{ backgroundColor: "#000", flex: 1 }}>
                            <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                            <Text style={{ fontSize: 30 }}>{player.username}, You win the party congrats !</Text>
                                <Text style={{fontSize:0}}>{player.win = false, player.points = 0}</Text>

                                <Button title="Close" onPress={() => { this.setState({ show: false,winner:false ,finalNum: ''}) }} />
                            </View>
                        </View>
                    </Modal> : <Text></Text>}
                    {/* {player.win == false ? <Modal transparent={true} visible={this.state.show}>
                        <View style={{ backgroundColor: "#000", flex: 1 }}>
                            <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text style={{ fontSize: 50 }}>Sorry {player.username}, you lose the party !</Text>
                                <Text style={{fontSize:0}}>{player.win = false, player.points = 0}</Text>
                                <Button title="Close" onPress={() => { this.setState({ show: false,winner:false ,finalNum: ''}) }} />
                            </View>
                        </View>
                    </Modal> : <Text></Text>} */}

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },
    inputView: {
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 150,
        marginBottom: 20,
        justifyContent: "center",
        padding: 30
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
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    signupBtn: {
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        color: "white", 
        fontSize: 15,
    }
});