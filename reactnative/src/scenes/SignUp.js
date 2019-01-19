import React, { Component } from "react";
import { View, Text } from "react-native";
// import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../Auth";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
/*
export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Email</FormLabel>
      <FormInput placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />
      <FormLabel>Confirm Password</FormLabel>
      <FormInput secureTextEntry placeholder="Confirm Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="transparent"
        textStyle={{ color: "#bcbec1" }}
        title="Sign In"
        onPress={() => navigation.navigate("SignIn")}
      />
    </Card>
  </View>
);

*/

class SignUp extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect= {false}
              autoCapitalize= 'none'/>
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry
              autoCorrect={false}
              autoCapitalize='none'
            />
          </Item>

          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input 
              secureTextEntry
              autoCorrect={false}
              autoCapitalize='none'
            />
          </Item>

          <Button style={{ marginTop:20}}
            full
            rounded
            success
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

export default SignUp;