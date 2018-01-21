import React from 'react'
import { Alert, Button, Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import BackgroundImage from '../common/BackgroundImage/'
import { getAvailablePlayers } from '../services/dataHandler'
import ReadyCheck from '../common/ReadyCheck'
import PlusAnimation from '../animations/PlusAnimation'
import PlayerList from '../common/PlayerList'

export default class StartView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            names: []
        }
    }

    componentDidMount() {
        this.fetchData().done()
    }

    async fetchData() {
        const players = await getAvailablePlayers()

        this.setState({
            count: players.length,
            names: players
        })
    }
    onPress = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    countPlayersMax(count) {
        return count > 5 ? 5 : count
    }

    render() {
        return (
            <BackgroundImage>
                <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
                {/* Container for players & buttons */}
                    <View style={{flex: 1}}/>
                    

                    <View style={{flex: 2}}>
                        <View style={styles.countContainer}>
                            
                            <Text style={styles.countText}>
                                {this.countPlayersMax(this.state.count)} / 5 players
                            </Text>
                            <PlayerList players={this.state.names} />
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableHighlight style={styles.buttonBlue} onPress={this.onPress}>
                                <View style={{ flexDirection: 'row' }}>
                                    <PlusAnimation />
                                    <Text style={styles.whiteText}>1 CS:GO</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.buttonYellow}>
                                <Text style={styles.blackText}> Settings </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    

                    <Image
                        source={require('../images/csgologo.png')}
                        style={styles.csgologoImage}>
                    </Image>
                </View>
            </BackgroundImage>
        );
    }
}

const resizeMode = 'contain'
const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '20%',
    },
    csgologoImage: {
        width: dimensions.width * 0.75,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    whiteText: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        textShadowColor: 'rgba(1,1,1,1)',
        textShadowOffset: { width: 1, height: 1 },
        fontSize: 22,
    },
    blackText: {
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 15,
    },
    buttonBlue: {
        alignItems: 'center',
        backgroundColor: '#5CC8FF',
        padding: 10,
        marginBottom: 20,
        width: 150,
    },
    buttonYellow: {
        alignItems: 'center',
        backgroundColor: '#FFE74C',
        padding: 10,
        width: 150,
    },
    countContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    countText: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    }
})
