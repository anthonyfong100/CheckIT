import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { emailChanged, passwordChanged, loginUser, loginUserFb } from '../actions';
import { connect } from "react-redux";
import { Spinner } from "../common";
import firebase from '@firebase/app';
import '@firebase/auth';

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';

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

  async _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      
      if (result.isCancelled) {
        console.log('login was cancelled');
      } else {
        console.log('login was a success: ' + result.grantedPermissions.toString());
       
        AccessToken.getCurrentAccessToken()
        .then((data) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken) 
          loginUserFb(credential)
        })
      }
    }, function(error) {
      console.log('An error occured: ' + error); 
    })
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
            onPress={() => this._fbAuth()}
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