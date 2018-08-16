import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    AsyncStorage,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Login from './Login';
import LoginModalAltSrv from './LoginModalAltSrv';

import imgLogo from '../../../resources/imgs/logo.png';

class LoginApp extends Component {

    constructor(props) {
        super(props);

        this.state = { renderLogin: false };

        this.changeLoginState = this.changeLoginState.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.onTouchLogin = this.onTouchLogin.bind(this);

        AsyncStorage.getItem('apptype')
            .then((apptype) => {
                AsyncStorage.getItem('userlogged')
                    .then((value) => {
                        if (value === 's') {
                            if (apptype && apptype.toLowerCase() === 'familia') {
                                Actions.documentosBonyApp();
                            } else {
                                Actions.documentosApp();
                            }
                            this.changeLoginState();
                        } else {
                            this.changeLoginState();
                        }
                    });
            });
        
    }

    onTouchLogin() {
        Keyboard.dismiss();
    }

    changeLoginState() {
        this.setState({ renderLogin: true });
    }

    renderLogin() {
        if (this.state.renderLogin) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => this.onTouchLogin()}
                >
                    <View style={styles.viewPrinc}>
                        {
                        this.props.showLogoLogin &&
                        <View style={styles.viewLogo}>
                            <Image 
                                style={styles.imgLogo}
                                source={imgLogo}
                                resizeMode='stretch'
                            />
                        </View>
                        }
                        <View style={{ flex: 2 }}>
                            <Login />
                        </View>       
                        <LoginModalAltSrv />
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return (<View />);
    }

    render() {
        return this.renderLogin();
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#F0EFF4'
    },
    viewLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgLogo: {
        marginTop: 20,
        width: 200,
        height: 150,
        resizeMode: 'stretch'
    }
});

const mapStateToProps = (state) => ({
    showLogoLogin: state.LoginReducer.showLogoLogin,
    appType: state.DocumentosReducer.appType
});

export default connect(mapStateToProps, {})(LoginApp);
