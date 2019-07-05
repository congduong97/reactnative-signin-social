import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import FBSDK, { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Login extends Component {
	state = {
		token: null,
		login: false
	};
	onLoginFacebook = () => {
		LoginManager.logInWithPermissions([ 'public_profile' ]).then(
			function(result) {
				if (result.isCancelled) {
					alert('Login cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						alert('Login success with permissions: ' + data.accessToken.toString());
					});
				}
			},
			function(error) {
				alert('Login fail with error: ' + error);
			}
		);
	};
	signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			alert('YOu are login : ' + userInfo.idToken);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
				alert(error.code);
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
				alert(error.code);
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
				alert(error.code);
			} else {
				// some other error happened
				alert('nothing');
			}
		}
	};
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Button onPress={this.onLoginFacebook} title="Facebook" />
				<GoogleSigninButton
					onPress={this.signIn}
					style={{ width: 192, height: 54 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
				/>
				<Text>Hello</Text>
			</View>
		);
	}
}
