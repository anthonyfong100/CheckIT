import React, { Component } from 'react';
import { Text, View, Modal, Image, StyleSheet, Alert } from 'react-native';
import { Button, Icon } from 'native-base'

class TutorialModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fridgeModal1: false,
            recipeModal: false,
            shoppingModal: false
        }
    }

    componentWillReceiveProps() {
        this.setState({
            fridgeModal1: this.props.fridgeModal
        })
    }

    // componentDidMount() {
    //     this.setState({
    //         fridgeModal1: this.props.fridgeModal
    //     })
    // }

    render() {
        let fridgeModalInput = this.state.fridgeModal1
        let recipeModalInput = this.state.recipeModal
        let shoppingModalInput = this.state.shoppingModal
        return (
            <View >

                <Modal visible={this.state.fridgeModal1} transparent={true}
                // onRequestClose={() => this.props.closeFunction}
                >
                    <View style={styles.modalView}>
                        <Image source={require('../../assets/fridgePicture.jpg')} />
                        <Button rounded onPress={() => this.setState({
                            recipeModal: true, fridgeModal: false
                        })} >
                            <Icon name="ios-skip-forward" />
                        </Button>
                    </View>
                </Modal>
                <Modal visible={recipeModalInput} transparent={true} >
                    <View style={styles.modalView}>
                        <Image source={require('../../assets/recipePicture.jpg')} />
                        <Button rounded onPress={() => this.setState({
                            shoppingModal: true, recipeModal: false
                        })} >
                            <Icon name="ios-skip-forward" />
                        </Button>
                    </View>
                </Modal>
                <Modal visible={shoppingModalInput} transparent={true} >
                    <View style={styles.modalView}>
                        <Image source={require('../../assets/shoppingPicture.jpg')} />
                        <Button rounded onPress={() => this.setState({
                            shoppingModal: false,
                            fridgeModal1: false,
                            recipeModal: false
                        })}>
                            <Icon name="ios-close" />
                        </Button>
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalView: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default TutorialModal;