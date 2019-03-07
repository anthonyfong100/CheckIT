import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { emailChanged, passwordChanged, loginUser, loginUserFb } from '../actions';
import { connect } from "react-redux";
import { Spinner } from "../common";
import firebase from '@firebase/app';
import '@firebase/auth';

class SignIn extends Component {
  
  componentDidUpdate () {
    const status = this.props.isLoggedIn;
    if (status == true) {
      this.props.navigation.navigate("Fridge");
    }
  }
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
  }

  
  onFBButtonPress() {
    this.props.loginUserFb()
  }

  renderError() {
      if(this.props.error) {
          return (
              <View style={{ backgroundColor: 'white' }}>
                  <Text style={styles.errorTextStyle}>
                      {this.props.error}
                  </Text>
              </View>
          );
      }
  }

  renderSignInButton() {
    if (this.props.loading) {
      return (
        <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Spinner size="large" />
        </Item>
      )
    } 
    return (
      <Button style={{ marginTop:10, color: '#3C5A99' }}
        full
        rounded
        success
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ color: '#fff' }}>Log In</Text>
      </Button>
    )
  }



  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect= {false}
              autoCapitalize= 'none'
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </Item>
          
          {this.renderError()}
          {this.renderSignInButton()}

          <Button style={{ marginTop:10 }}
            full
            rounded
            primary
            onPress={this.onFBButtonPress.bind(this)}
          >
            <Text style={{ color: '#fff' }}>Log In with Facebook</Text>
          </Button>

          <Button style={{ marginTop:10 }}
            full
            rounded
            success
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
          <Text style={{ color: '#fff' }}>Sign Up</Text>
          </Button>
          
        </Form>
      </Container>
    );
  }
}


const styles= {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  errorTextStyle: {
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
}
}

const mapStateToProps = ({ auth }) => {
  const { email, password, user, error, loading, isLoggedIn } = auth;
  return { email, password, user, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  loginUserFb
}) (SignIn);