import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    AsyncStorage,
    ActivityIndicator,
    Button,
    Dimensions
} from 'react-native';

import Axios, { CancelToken } from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PTRView from 'react-native-pull-to-refresh';
import { Dialog } from 'react-native-simple-dialogs';
import Orientation from 'react-native-orientation';

import {
    modificaUsername,
    modificaPassword,
    modificaCleanLogin,
    modificaUrlServer,
    doPersistToken
} from '../../actions/LoginActions';

import { 
    modificaShowDocsDialog,
    modificaListDocsSelected,
    modificaCleanDocumentos,
    modificaAuxModal,
    doFetchDocuments,
    modificaAppType,
    modificaDocNumber
} from '../../actions/DocumentosActions';

import unchecklistlarge from '../../../resources/imgs/unchecklistlarge.png';
import checklistLarge from '../../../resources/imgs/checklistlarge.png';
import cifraoLarge from '../../../resources/imgs/cifraolarge.png';
import checkLarge from '../../../resources/imgs/checklarge.png';
import aproversLarge from '../../../resources/imgs/aproverslarge.png';
import genericIcon from '../../../resources/imgs/intlistlarge.png';
import arrowRight from '../../../resources/imgs/arrowright.png';
import DocumentosErrorAppr from './DocumentosErrorAppr';

class Documentos extends Component {

    constructor(props) {
        super(props);

        this.doTouchItem = this.doTouchItem.bind(this);
        this.showModalOnTimeout = this.showModalOnTimeout.bind(this);
        this.fetchDocs = this.fetchDocs.bind(this);
        this.doFetchAllDocs = this.doFetchAllDocs.bind(this);
        this.doPersistToken = this.doPersistToken.bind(this);
        this.doPersist = this.doPersist.bind(this);
        this.doSetAppType = this.doSetAppType.bind(this);
        this.onPressModalCancel = this.onPressModalCancel.bind(this);
        this.getStateToken = this.getStateToken.bind(this);
        this.modalToken = CancelToken.source();
    }

    componentDidMount() {
        Orientation.unlockAllOrientations();
        AsyncStorage.getItem('usertoken')
            .then((value) => {
                if (value) {
                    this.doPersistToken(value);
                }
            });
        AsyncStorage.getItem('apptype')
            .then((value) => {
                if (value) {
                    this.doSetAppType(value);
                }
            });
        this.doFetchAllDocs();
    }

    componentWillUnmount() {
        this.props.modificaCleanDocumentos();
    }

    onPressModalCancel() {
        this.props.modificaShowDocsDialog(false);
        this.modalToken.cancel();
    }

    getStateToken() {
        return this.state.modalToken;
    }

    doSetAppType(value) {
        this.props.modificaAppType(value);
    }

    doTouchItem(documentos, title, docNumber) {
        this.props.modificaListDocsSelected(documentos);
        this.props.modificaDocNumber(docNumber);
        Actions.documentoApp({ title });
    }

    doFetchAllDocs() {
        AsyncStorage.getItem('user')
            .then((value) => {
                    if (value) {
                        this.fetchDocs(value);
                    }
                }
            );
        AsyncStorage.getItem('pwd')
            .then((value) => {
                if (value) {
                    this.props.modificaPassword(value); 
                }
            }); 
                
        setTimeout(() => this.showModalOnTimeout(), 500);
    }

    doPersistToken(token) {
        const params = { 
            username: '',
            password: '',
            userToken: ''
        };
        AsyncStorage.getItem('user')
            .then((value) => {
                if (value) {
                    params.username = value; 
                } 
            })
            .then(
                AsyncStorage.getItem('pwd')
                .then((value) => { 
                    if (value) {
                        params.password = value; 
                    }
                })
                .then(() => this.doPersist({ ...params, userToken: token }))
            );
    }

    doPersist(params) {
        this.props.doPersistToken(params);
    }

    showModalOnTimeout() {
        if (this.props.auxModal) {
            this.props.modificaShowDocsDialog(true);
            this.props.modificaAuxModal(false);
        } else {
            this.props.modificaShowDocsDialog(false);
            this.props.modificaAuxModal(false);
        }
    }

    fetchDocs(value) {
        this.modalToken = CancelToken.source();
        this.props.modificaUsername(value);
        if (value) {
            AsyncStorage.getItem('urlServer')
            .then((url) => {
                if (url) {
                    Axios.defaults.baseURL = url; 
                } 
            })
            .then(() => 
                this.props.doFetchDocuments({ username: value, modalToken: this.modalToken })
            ); 
        }
    }

    renderDocs() {
        if (this.props.listDocs.length > 0) {
            const documentos = this.props.listDocs;
            return (
                documentos.map((documento, index) => {
                    switch (documento.docNumber) {
                        case '7':
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => 
                                        this.doTouchItem(
                                            documento.documents, 'Pedido de Compra', '7'
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image 
                                            source={unchecklistlarge} 
                                            style={styles.ImageStyle} 
                                        />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                Pedido de Compra
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>);
                        case '8':
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => 
                                        this.doTouchItem(
                                            documento.documents, 'Pedido Emergencial', '8'
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image 
                                            source={checklistLarge} 
                                            style={styles.ImageStyle} 
                                        />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                Pedido Emergencial
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>);
                        case '24':
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => 
                                        this.doTouchItem(
                                            documento.documents, 'Documento Normal', '24'
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image 
                                            source={cifraoLarge} 
                                            style={styles.ImageStyle} 
                                        />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                Documento Normal
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>);
                        case '25':
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => 
                                        this.doTouchItem(
                                            documento.documents, 'Antecipação', '25'
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image 
                                            source={checkLarge} 
                                            style={styles.ImageStyle} 
                                        />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                Antecipação
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>);
                        case '26':
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => 
                                        this.doTouchItem(
                                            documento.documents, 'PEF', '26'
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image 
                                            source={aproversLarge} 
                                            style={styles.ImageStyle} 
                                        />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                PEF
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>);
                        default:
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={
                                        () => this.doTouchItem(
                                            documento.documents, documento.type, documento.docNumber
                                        )
                                    }
                                >
                                    <View style={styles.viewRows}>
                                        <Image source={genericIcon} style={styles.ImageStyle} />
                                        <View style={styles.secondView}>
                                            <Text style={[styles.textStyle, { flex: 3 }]}>
                                                {documento.type}
                                            </Text>
                                            <View style={[styles.containerNumb, { flex: 1 }]}>
                                                <Text style={styles.textNumber}>
                                                    {documento.documents.length}
                                                </Text>
                                            </View>
                                            <Image 
                                                source={arrowRight} 
                                                style={styles.arrowIcon} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                    }
                })
            ); 
        }

        return (
            <View 
                style={{ 
                        height: Dimensions.get('window').height - 200,
                        justifyContent: 'center',
                        alignItems: 'center' 
                }}
            >
                <Text style={{ fontSize: 20 }}>Não há pendências...</Text>
                <View style={styles.viewRefresh}>
                    <TouchableOpacity
                        onPress={() => this.doFetchAllDocs()}
                    >
                        <Text 
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.textRefresh}
                        >Atualizar</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        );
    }

    render() {
        return (
            <PTRView 
                onRefresh={() => setTimeout(this.doFetchAllDocs, 1000)}
                delay={1000}
                style={{ backgroundColor: 'white' }}
            >
                <ScrollView style={styles.scrollContainer}>
                        {this.renderDocs()} 
                    <View>
                        <Dialog 
                            visible={this.props.showDocumentsDialog}
                            title='Buscando Documentos'
                            onTouchOutside={() => true}
                        >
                            <View 
                                style={{ 
                                    flexDirection: 'row', 
                                    marginBottom: 20, 
                                }}
                            >
                                <ActivityIndicator 
                                    style={{ 
                                        marginRight: 10
                                    }}
                                    size='large' 
                                    color='blue' 
                                />
                            
                                <Text 
                                    style={{ 
                                        fontSize: 18, 
                                        fontWeight: '400',
                                        marginTop: 5 
                                    }}
                                >
                                    Por favor, Aguarde...
                                </Text>
                           </View>
                           <Button 
                                onPress={() => this.onPressModalCancel()} 
                                style={{ marginTop: 20 }} title="Cancelar"
                                color={'#f16636'}
                           />
                        </Dialog>
                        <DocumentosErrorAppr />
                    </View>
                </ScrollView>
            </PTRView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewRows: {
        flexDirection: 'row',
        margin: 10
    },
    secondView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#6A6E7C',
        marginLeft: 10 
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 60,
        width: 60,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '400'
    },
    arrowIcon: {
        width: 15,
        height: 15
    },
    textNumber: {
        color: '#6A6E7C',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'right',
        marginRight: 10
            
    },
    containerNumb: { 
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    viewRefresh: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 130,
        marginVertical: 20
    },
    textRefresh: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: '#178544'
    }
});

const mapStateToProps = (state) => ({
    listDocs: state.DocumentosReducer.listDocs,
    showDocumentsDialog: state.DocumentosReducer.showDocumentsDialog,
    auxModal: state.DocumentosReducer.auxModal
});

export default connect(mapStateToProps, {
    modificaShowDocsDialog,
    modificaListDocsSelected,
    modificaCleanDocumentos,
    modificaAuxModal,
    doFetchDocuments,
    modificaUsername,
    modificaPassword,
    modificaCleanLogin,
    modificaUrlServer,
    doPersistToken,
    modificaAppType,
    modificaDocNumber
})(Documentos);

