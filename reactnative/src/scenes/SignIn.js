import React, { Component } from "react";
import { View, Text } from "react-native";
import { onSignIn } from "../Auth";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from "react-redux";

/*
export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
      />
    </Card>
  </View>
);
*/

class SignIn extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password } = this.props;
      this.props.loginUser({ email, password })
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

          <Button style={{ marginTop:20, color: '#3C5A99' }}
            full
            rounded
            success
            onPress={()=>  this.signInUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: '#fff' }}>Log In</Text>
          </Button>

          <Button style={{ marginTop:10}}
            full
            rounded
            primary
          >
            <Text style={{ color: '#fff' }}>Log In with Facebook</Text>
          </Button>

          <Button style={{ marginTop:10 }}
            full
            rounded
            success
            onPress={() => navigation.navigate("SignUp")}
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
    nbackgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
}

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
}) (SignIn);