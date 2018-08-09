import React, {Component} from 'react';
import {View, TextInput, Text, Button, Toast} from 'react-native-ui-lib';


class Login extends React.Component {
	state = {
    rollno: '',
    password: '',
    securityFlag: false,
    secQues: '',
    showToast: false,
  };

  _handleSecurity(flag) {
    this.setState({ securityFlag: !flag });
  }

  _handleLogin(value) {
    fetch('https://922ed2fe.ngrok.io/sec?user_id=' + value, {
      method: 'GET',
    })
      .then(response => response.json())

      .then(responseJson => {
        if (responseJson.flag === false) {
          this.setState({ secQues: responseJson.sec });
        }
        return responseJson.flag;
      })
      .then(flag => {
        this._handleSecurity(flag);
      })
      .catch((error) => console.log(error))
      ;
  }

  _handleSubmit() {
  	// this.setState({showToast: true});
  	this.props.navigation.navigate('UserPage');
  }

  render() {

	  	let { rollno, password, securityFlag, secQues, secval } = this.state;

	    return (
	      <View>
	      <View paddingH-25 paddingT-120>
	        <Text blue10 text30>Welcome</Text>
	        <Text> </Text>

	        <TextInput 
	         text50
	         onBlur={() => this._handleLogin(rollno)}
	         floatingPlaceholder={true}
	         floatOnFocus={true}
	         placeholder="Roll Number"
	         onFocus={() => this.setState({ securityFlag: false })}
	         onChangeText={rollno => this.setState({ rollno })}
	         dark10/>

	        <TextInput
	         text50
	         floatingPlaceholder={true}
	         floatOnFocus={true}
	         placeholder="Password" 
	         value={password} 
	         secureTextEntry 
	         dark10/>

      		{securityFlag && (
	          
	          <TextInput
	           text50 
	           floatingPlaceholder={true}
	           floatOnFocus={true}
	           placeholder={secQues}
	           secureTextEntry 
	           dark10/>
	        )}

	        <View marginT-100 center>
	          <Button
	           text60 
	           white 
	           onPress={() => this._handleSubmit()}
	           background-orange30 
	           label="Login"/>
	        </View>
	        <Toast
		      visible={this.state.showToast}
		      message="Incorrect Login"
		      allowDismiss
		      onDismiss={() => this.setState({showToast: false})}
		      autoDismiss={3000}
		      centerMessage
			/>
	      </View>
	      </View>
	    );
	  }
}

export default Login;