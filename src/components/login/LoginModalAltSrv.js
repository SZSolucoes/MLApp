import React, { Component } from 'react';
import { 
    Modal, 
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    AsyncStorage,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import Axios from 'axios';

import FormRow from '../../utils/FormRow';

import {
    modificaModalVisible,
    modificaUrlServer
} from '../../actions/LoginActions';

class LoginModalAltSrv extends Component {

    constructor(props) {
        super(props);

        this.modificaModalVisible = this.modificaModalVisible.bind(this);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.onPressSalvar = this.onPressSalvar.bind(this);
        this.setUrlServer = this.setUrlServer.bind(this);
        this.setUrlDefault = this.setUrlDefault.bind(this);
        this.setServer = this.setServer.bind(this);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);
        this.state = { marginTop: 120, marginBottom: 120 };
        this.first = true;
    }

    componentDidUpdate() {      
        if (this.first) {   
            AsyncStorage.getItem('urlServer')
            .then((value) => {
                if (value) {
                    this.props.modificaUrlServer(value);
                }
            });
            this.first = false;
        }        
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove(); 
    }
    
    onPressSalvar() {
        if (this.props.urlServer) {
            const protocol = this.props.urlServer.substr(0, 4); 
            let urlServer = '';

            // Tratamento para o protocolo
            if (protocol.toLowerCase() !== 'http') {
                urlServer = `http://${this.props.urlServer}`;        
            } else {
                urlServer = this.props.urlServer;
            }

            // Tratamento para o service
            if (!(urlServer.includes('/service'))) {
                if (urlServer.includes('/', urlServer.length - 1)) {
                    urlServer = `${urlServer}service/`;
                } else {
                    urlServer = `${urlServer}/service/`;
                }       
            }

            // Barra ao final da url
            if ((!urlServer.includes('/', urlServer.length - 1))) {
                urlServer = `${urlServer}/`;
            }
            
            AsyncStorage.setItem('urlServer', urlServer)
            .then(() => this.setUrlServer(urlServer))
            .catch(() => (
                Alert.alert('Erro ao salvar', 'Não foi possível salvar a url informada.')
            ));    
        } else {
            AsyncStorage.setItem('urlServer', '')
            .then(() => this.setUrlDefault())
            .catch(() => (
                Alert.alert('Erro ao salvar', 'Não foi possível salvar a url informada.')
            ));   
        }
    }

    setUrlServer(value) {
        Axios.defaults.baseURL = value;
        this.props.modificaUrlServer(value);
        this.modificaModalVisible(false);
    }

    setUrlDefault() {
        const urlDefault = 'http://szsolucoes.sytes.net/scripts/cgiip.exe/WService=wsbroker1/service/';
        Axios.defaults.baseURL = urlDefault;
        this.props.modificaUrlServer('');
        this.modificaModalVisible(false);
    }

    setServer(text) {
       this.props.modificaUrlServer(text);
    }
    
    keyboardShow(e) {
        if (Platform.OS === 'ios') {
            this.setState({ 
                ...this.state, 
                marginTop: 20, 
                marginBottom: e.endCoordinates.height + 20 
            });
        } else {
            this.setState({ ...this.state, marginTop: 20, marginBottom: 20 });
        }  
    }
    
    keyboardHide() {
        this.setState({ ...this.state, marginTop: 120, marginBottom: 120 });
    }

    modificaModalVisible(value) {
        this.first = true;
        this.props.modificaModalVisible(value);
        this.setState({ ...this.state, marginTop: 120, marginBottom: 120 });
    }

    render() {
        return (  
                <Modal
                    animationType="fade"
                    transparent
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.modificaModalVisible(false)}
                > 
                    <TouchableWithoutFeedback
                        onPress={() => this.modificaModalVisible(false)}
                    >
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            keyboardVerticalOffset={64} 
                            behavior="padding" enabled
                        >
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)' }}>
                                <TouchableWithoutFeedback>         
                                    <View 
                                        style={[
                                            styles.containerPrinc, 
                                            { 
                                                marginTop: this.state.marginTop,
                                                marginBottom: this.state.marginBottom
                                            }
                                        ]}
                                    >
                                        {/*      CONTAINER PRINCIPAL       */}
                                        <View style={{ flex: 1, flexDirection: 'column' }}>     
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.txtMenu}>
                                                    Alterar servidor
                                                </Text>
                                            </View>
                                            
                                            <View style={{ flex: 2 }}>
                                                <Text style={styles.txtLabel}>
                                                     Servidor URL
                                                </Text>
                                                <FormRow>
                                                    <View style={{ flex: 1 }}>
                                                        <TextInput
                                                            placeholder="Exemplo: http://192.168.0.1"
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            returnKeyType='next'
                                                            selectionColor={'#f16636'}
                                                            style={styles.input}
                                                            value={this.props.urlServer}
                                                            onChangeText={this.setServer}
                                                            ref={(input) => { 
                                                                this.serverInput = input; 
                                                            }}
                                                        />
                                                    </View>
                                                </FormRow>
                                            </View>
                                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                                <Button 
                                                    title='Salvar' 
                                                    color='#f16636'
                                                    onPress={() => this.onPressSalvar()} 
                                                />
                                            </View>
                                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                                <Button  
                                                    title='Cancelar' 
                                                    color='#f16636'
                                                    onPress={
                                                        () => this.modificaModalVisible(false)
                                                    } 
                                                />
                                            </View>
                                            <View 
                                                style={{ 
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between' 
                                                }}
                                            >
                                                <View 
                                                    style={
                                                        [styles.allCenter, { borderRightWidth: 1 }]
                                                    }
                                                >
                                                    <Text>Versão:</Text>
                                                </View>
                                                <View style={styles.allCenter}>
                                                    <Text>2.0.9</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {/*     FIM DO CONTAINER     */}

                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>      
        );
    }
}

const styles = StyleSheet.create({
    containerPrinc: {
        flex: 1,
        marginHorizontal: 50,
        backgroundColor: 'white'
    },
    txtLabel: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        textAlign: 'center',
        borderRadius: 6,
        borderColor: '#f16636',
        borderWidth: 1
    },
    txtMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#f16636'
    },
    allCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1
    }
});

const mapStateToProps = (state) => ({
    modalVisible: state.LoginReducer.modalVisible,
    urlServer: state.LoginReducer.urlServer
});

export default connect(mapStateToProps, {
    modificaModalVisible,
    modificaUrlServer
})(LoginModalAltSrv);

