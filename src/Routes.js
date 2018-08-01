import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {
    View,
    TouchableOpacity,
    Text, 
    StyleSheet,
    AsyncStorage
} from 'react-native';

import {
    modificaCleanLogin,
    modificaUrlServer
} from './actions/LoginActions';

import { 
    modificaCleanDocumentos
} from './actions/DocumentosActions';

import { store } from './App';

import LoginApp from './components/login/LoginApp';
import DocumentosApp from './components/documentos/DocumentosApp';
import DocumentoApp from './components/documento/DocumentoApp';
import DocumentoDetail from './components/documento/DocumentoDetail';
import DocumentoItens from './components/documento/DocumentoItens';
import DocumentoItensDetail from './components/documento/DocumentoItensDetail';
import DocumentoItensSone from './components/especificos/sonepar/documento/DocumentoItensSone';
import AprovacaoApp from './components/aprovacao/AprovacaoApp';

class Routes extends Component {

    constructor(props) {
        super(props);

        this.onBackAndroidHdl = this.onBackAndroidHdl.bind(this);
        this.doLogoutDocumentos = this.doLogoutDocumentos.bind(this);
        this.rightButtonDocumentos = this.rightButtonDocumentos.bind(this);
        this.rightButtonItems = this.rightButtonItems.bind(this);
    }

    onBackAndroidHdl() {
        if (Actions.currentScene === 'documentosApp') {
            return true;
        }
        Actions.pop();
        return true;
    }

    doLogoutDocumentos() {
        AsyncStorage.setItem('userlogged', 'n');
        AsyncStorage.setItem('user', ' ');
        AsyncStorage.setItem('pwd', ' ');
        this.props.modificaCleanDocumentos();
        this.props.modificaCleanLogin();
        AsyncStorage.getItem('urlServer')
        .then((value) => this.props.modificaUrlServer(value));
        Actions.pop();
    }

    rightButtonDocumentos() {   
        return (
            <View style={{ marginHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => this.doLogoutDocumentos()}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            textAlign: 'center'
                        }} 
                    >
                        {'  Sair  '}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    rightButtonItems() {
        const stateDocs = store.getState().DocumentosReducer;
        if (stateDocs.itemShow) {
            // Especifico Sonepar
            if (
                stateDocs.appType.toLowerCase() === 'sonepar' &&
                '7;8'.includes(stateDocs.docNumber) // Pedido de compra ou emergencial
            ) {
                return (
                   <View style={{ marginHorizontal: 10 }}>
                       <TouchableOpacity 
                           onPress={() => Actions.documentoItensSone({ 
                               items: [...stateDocs.items] 
                            })}
                       >
                           <Text
                               style={{
                                   color: 'white',
                                   fontSize: 18,
                                   textAlign: 'center'
                               }} 
                           >
                               {'  Itens  '}
                           </Text>
                       </TouchableOpacity>
                   </View>
               );   
            }

            return (
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity 
                        onPress={() => Actions.documentoItens({ items: [...stateDocs.items] })}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: 'center'
                            }} 
                        >
                            {'  Itens  '}
                        </Text>
                    </TouchableOpacity>
                </View>
            );   
        }  
    }

    render() {
        return (
            <Router backAndroidHandler={this.onBackAndroidHdl}>
                <Scene 
                    key="root"
                    navigationBarStyle={styles.header}
                >
                    <Scene 
                        key='loginApp' 
                        component={LoginApp}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft} 
                        initial
                        hideNavBar
                    />
                    <Scene 
                        key='documentosApp'
                        title='Documentos' 
                        component={DocumentosApp}
                        titleStyle={styles.title}
                        left={() => null}
                        renderRightButton={() => this.rightButtonDocumentos()}
                    />
                    <Scene 
                        key='documentoApp'
                        title='Documento' 
                        component={DocumentoApp}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'
                        getTitle={() => this.props.title}  
                    />
                    <Scene 
                        key='documentoDetail'
                        title='Detalhes' 
                        component={DocumentoDetail}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'
                        renderRightButton={() => this.rightButtonItems()}
                    />
                    <Scene 
                        key='documentoItens'
                        title='Itens' 
                        component={DocumentoItens}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'  
                    />
                    <Scene 
                        key='documentoItensSone'
                        title='Ordem Compra' 
                        component={DocumentoItensSone}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'  
                    />
                    <Scene 
                        key='documentoItensDetail'
                        component={DocumentoItensDetail}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'  
                    />
                    <Scene 
                        key='aprovacaoApp'
                        title='Aprovacao' 
                        component={AprovacaoApp}
                        titleStyle={styles.title}
                        leftButtonTextStyle={styles.btLeft}
                        backButtonTintColor='white'
                        getTitle={() => this.props.title}  
                    />
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#EE8215'
    },
    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    btLeft: {
        color: 'white'
    }
});

const mapStateToProps = () => ({
  
});

export default connect(mapStateToProps, {
    modificaCleanLogin,
    modificaUrlServer,
    modificaCleanDocumentos
})(Routes);

