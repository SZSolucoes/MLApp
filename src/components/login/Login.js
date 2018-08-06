import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    ActivityIndicator,
    Image,
    Keyboard,
    Alert,
    AsyncStorage,
    Platform
} from 'react-native';

import { connect } from 'react-redux';

import {
    modificaUsername,
    modificaPassword,
    modificaHidePw,
    modificaModalVisible,
    modificaCleanLogin,
    modificaShowLogoLogin,
    modificaUserToken,
    doLogin
} from '../../actions/LoginActions';

import { doFetchDocuments } from '../../actions/DocumentosActions';

import key from '../../../resources/imgs/keypass.png';

class Login extends Component {

    constructor(props) {
        super(props);

        this.onPresAltSrv = this.onPresAltSrv.bind(this);
        this.setToken = this.setToken.bind(this);
        this.pressEntrar = this.pressEntrar.bind(this);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);
        this.state = { marginTop: 0, marginBottom: 0 };
    }

    componentDidMount() {
        AsyncStorage.getItem('usertoken')
            .then((token) => { 
                if (token) {
                    this.setToken(token);
                }
            });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onPresAltSrv() {
        this.props.modificaModalVisible(true);
    }

    setToken(token) {
        this.props.modificaUserToken(token);
    }

    keyboardShow(e) {
        this.props.modificaShowLogoLogin(false);
        if (Platform.OS === 'ios') {
            this.setState({ 
                ...this.state, 
                marginTop: 20, 
                marginBottom: e.endCoordinates.height - 20 
            });
        } else {
            this.setState({ ...this.state, marginTop: 0, marginBottom: 0 });
        }
    }
    
    keyboardHide() {
        this.props.modificaShowLogoLogin(true);
        this.setState({ ...this.state, marginTop: 0, marginBottom: 0 });
    }

    pressEntrar() {
        const username = this.props.username;
        const password = this.props.password;
        const userToken = this.props.userToken;

        Keyboard.dismiss();

        if (username && password) {
            this.props.doLogin({ username, password, userToken });
        } else {
            Alert.alert('Aviso', 'É necessário informar usuário e senha válidos.');
        }
    }

    renderAnimLogin() {
        if (this.props.indicator) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='white' />
                </View>
            );
        }
        return (
            <Text style={styles.txtMenu}>Entrar</Text>
        );
    }

    render() {
        return (
            <View 
                style={[
                    styles.viewLogin, 
                    { 
                        marginTop: this.state.marginTop,
                        marginBottom: this.state.marginBottom             
                    }
                ]}
            >
                <View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            placeholder='Usuário'
                            autoCorrect={false}
                            placeholderTextColor='#f16636'
                            returnKeyType='next'
                            autoCapitalize='none'
                            style={styles.input}
                            onChangeText={username => this.props.modificaUsername(username)}
                            value={this.props.username}
                            underlineColorAndroid='transparent'
                            onSubmitEditing={() => this.txtPassword.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput 
                            ref={(input) => { this.txtPassword = input; }}
                            placeholder='Password'
                            placeholderTextColor='#f16636'
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={[styles.input, { marginLeft: 33 }]}
                            secureTextEntry={this.props.hidePw}
                            underlineColorAndroid='transparent'
                            onChangeText={password => this.props.modificaPassword(password)}
                            value={this.props.password}
                        />
                        <TouchableOpacity
                            onPressIn={() => this.props.modificaHidePw(false)}
                            onPressOut={() => this.props.modificaHidePw(true)}
                        >
                            <Image source={key} style={styles.ImageStyle} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.loginBtn}>
                    <TouchableOpacity 
                        onPress={() => this.pressEntrar()}
                    >
                        <View style={styles.menu}>
                            {this.renderAnimLogin()}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginAlt}>
                    <TouchableOpacity 
                        onPress={this.onPresAltSrv}
                    >
                        <View style={styles.menuAlt}>
                            <Text style={styles.altText}>
                                Alterar servidor
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewMsg}>
                    <Text style={styles.msgLogin}>
                        {this.props.erroLogin}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewLogin: {
        flex: 5,
        backgroundColor: '#F0EFF4',
        justifyContent: 'center'
    },
    viewMsg: {
        backgroundColor: '#F0EFF4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    loginBtn: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 15
    },
    loginAlt: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 5
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#f16636',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10
    },
    menuAlt: {
        flexDirection: 'row',
        borderColor: '#f16636',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1
    },
    txtMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: 'white'
    },
    input: {
        flex: 1,
        textAlign: 'center'
    },
    msgLogin: {
        fontSize: 18,
        color: 'red'
    },
    altText: { 
        fontWeight: '200'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        marginHorizontal: 50,
        marginVertical: 10
    }, 
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => ({
    username: state.LoginReducer.username,
    password: state.LoginReducer.password,
    userToken: state.LoginReducer.userToken,
    hidePw: state.LoginReducer.hidePw,
    indicator: state.LoginReducer.indicator
});

export default connect(mapStateToProps, {
    modificaUsername,
    modificaPassword,
    modificaHidePw,
    modificaModalVisible,
    modificaCleanLogin,
    modificaShowLogoLogin,
    doFetchDocuments,
    modificaUserToken,
    doLogin
})(Login);

