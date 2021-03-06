import React from 'react';
import { Text, StatusBar, View, TextInput, TouchableOpacity, StyleSheet, Modal, Button, SafeAreaView } from 'react-native';
import { player } from '../pregame';

let numberInput;
let user1Point = 0;
let user2Point = 0;

export default class MagicNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            show: false,
            winner: false,
            loser: false,
            finalNum: '',
            plus: false,
            minus: false

        };
        this.runMagicNumber = this.runMagicNumber.bind(this);
        this.screenLoad = this.screenLoad.bind(this);

    }

    componentDidMount() {

    }
    runMagicNumber() {
        this.setState({ show: true })
        console.log("finalNum:" + this.state.finalNum);
        console.log("number:" + this.state.number);
        if (this.state.number == this.state.finalNum) {
            this.setState({ winner: true })
        } else {
            if (this.state.number > this.state.finalNum) {
                this.setState({ minus: true })
            } else {
                this.setState({ plus: true })
            }
            this.setState({ loser: true })
        }
        if (player.points >= 3) {
            player.win = true
        }
    }
    screenLoad() {
        let randNumber = Math.floor(Math.random() * 1337) + 0;
        //let finalNum = Math.ceil(randNumber)
        console.log(randNumber);
        this.setState({ finalNum: randNumber })
    }

    render() {
        const { navigation } = this.props
        if (this.state.finalNum == '') {
            this.screenLoad()
        }
        return (
            <SafeAreaView style={styles.container}>
                <View>

                    <Text>Magic Number Game</Text>
                    <View style={styles.inputView}>
                        <Text>Guess a number between 0 and 1337</Text>
                        <TextInput
                            style={styles.inputText, { borderWidth: 1 }}
                            // onSubmitEditing={() => { numberInput.focus(); }}
                            keyboardType="numeric"
                            onChangeText={(number) => this.setState({ number })}
                            ref={input => { this.textInput = input }}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn}
                        onPress={this.runMagicNumber}>
                        <Text style={styles.loginText}>SUBMIT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signupBtn}
                        onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.loginText}>Home</Text>
                    </TouchableOpacity>
                    {this.state.winner == true ?
                        <Modal transparent={true} visible={this.state.show}>
                            <View style={{ backgroundColor: "#000", flex: 1 }}>
                                <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                    <Text style={{ fontSize: 50 }}>You win congrats!</Text>
                                    <Text>Player {player.username} points : {player.points+=1}</Text>
                                    {this.textInput.clear()}
                                    <Button title="Close" onPress={() => { this.setState({ show: false, win: false, finalNum: '' }) }} />
                                </View>
                            </View>
                        </Modal> : <Text></Text>}
                    {this.state.loser == true ?
                        <Modal transparent={true} visible={this.state.show}>
                            <View style={{ backgroundColor: "#000", flex: 1 }}>
                                <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                    <Text style={{ fontSize: 50 }}>Sorry you lose</Text>
                                    {this.state.plus == true ? <Text style={{ fontSize: 25, color: 'red' }}>Number is plus</Text> : <Text style={{ fontSize: 25, color: 'red' }}>Number is minus</Text>}
                                    <Button title="Close" onPress={() => { this.setState({ show: false, loser: false, minus: false, plus: false }) }} />
                                </View>
                            </View>
                        </Modal> : <Text></Text>}
                    {player.win == true ?
                        <Modal transparent={true} visible={this.state.show}>
                            <View style={{ backgroundColor: "#000", flex: 1 }}>
                                <View style={{ backgroundColor: "#fff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                    <Text style={{ fontSize: 30 }}>{player.username}, You win the party congrats !</Text>
                                    <Text style={{fontSize:0}}>{player.win = false, player.points = 0}</Text>
                                    <Button title="Close" onPress={() => { this.setState({ show: false, winner: false, finalNum: '' }) }} />
                                </View>
                            </View>
                        </Modal> : <Text></Text>}



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
        height: 100,
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
        padding: 10,
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    signupBtn: {
        padding: 10,
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        color: "white"
    }
});