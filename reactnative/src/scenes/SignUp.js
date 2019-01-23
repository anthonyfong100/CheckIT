import React, { Component } from "react";
import { View, Text } from "react-native";
// import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../Auth";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from "react-redux";
import { Spinner } from "../common";

class SignUp extends Component {
  state = { confirmation: '' }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password } = this.props;
      const { confirmation } = this.state.confirmation;
      /*if (password !== confirmation) {
        return 
        {this.renderError()}
        
      } else {*/
      this.props.loginUser({ email, password })
      
  } // TODO create signUpUser method

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

  renderSignUpButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } 
    return (
      <Button style={{ marginTop:10, color: '#3C5A99' }}
        full
        rounded
        success
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ color: '#fff' }}>Sign Up</Text>
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

          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input 
              secureTextEntry
              autoCorrect={false}
              autoCapitalize='none'
              value={this.state.confirmation}
              onChangeText={(confirmation) => this.setState({ confirmation })}
            />
          </Item>

          {this.renderSignUpButton()}
        </Form>
      </Container>
    );
  }
}

const styles= {
  container: {
    flex: 1,
    nbackgroundColor: '#fff',
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
  const { email, password, error, loading, isLoggedIn } = auth;
  return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
}) (SignUp);