import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';

import { modificaTxtAprovar, doApprove, doApproveBatch } from '../../actions/AprovacaoActions';

class Aprovar extends Component {

    constructor(props) {
        super(props);

        this.modificaTxtAprovar = this.modificaTxtAprovar.bind(this);
        this.doApprove = this.doApprove.bind(this);
    }

    modificaTxtAprovar(texto) {
        this.props.modificaTxtAprovar(texto);
    }

    doApprove() {
        const txtAppr = this.props.txtAprovar.trim();

        if (this.props.isBatch && this.props.items) {
            const itemsParamAprov = [];
            const itemsErrorComp = [];

            for (let index = 0; index < this.props.items.length; index++) {
                const element = this.props.items[index];
                const params = {
                    username: this.props.username,
                    password: this.props.password,
                    action: 'Aprovar',
                    nrTrans: element.item.id,
                    remarks: txtAppr
                };

                itemsParamAprov.push(params);
                itemsErrorComp.push({
                    supplier: element.item.supplier,
                    docKey: element.item.docKey,
                    user: element.item.user,
                    value: element.item.value,
                    docDate: element.item.docDate,
                    nrTrans: element.item.id
                });
            }

            this.props.doApproveBatch(itemsParamAprov, itemsErrorComp);
        } else {
            const params = {
                username: this.props.username,
                password: this.props.password,
                action: 'Aprovar',
                nrTrans: this.props.item.id,
                remarks: txtAppr
            };
            this.props.doApprove(params);
        }
    }

    render() {
        let dialogText = 'Aprovando Pendência';

        if (this.props.isBatch && this.props.items && this.props.items.length > 1) {
            dialogText = 'Aprovando Pendências';
        }

        return (
            <View style={styles.viewPrinc}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Narrativa</Text>
                    <View style={[styles.SectionStyle, { height: 150 }]}>
                        <TextInput
                            multiline
                            numberOfLines={5}
                            style={styles.input}
                            returnKeyType='go'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={this.props.txtAprovar}
                            onChangeText={(texto) => this.modificaTxtAprovar(texto)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.viewApproval}>
                        <TouchableOpacity
                            onPress={() => this.doApprove()}
                        >
                            <Text 
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={styles.textApproval}
                            >Aprovar</Text>
                        </TouchableOpacity>
                    </View>        
                </View>
                <View>
                    <ProgressDialog
                        visible={this.props.showAprovarDialog}
                        title={dialogText}
                        message='Por favor, Aguarde...'
                        activityIndicatorSize="large"
                        activityIndicatorColor="blue"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: 'white'
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
        marginHorizontal: 30,
        marginVertical: 10
    },
    input: {
        flex: 1,
        textAlign: 'center',
        color: 'black'
    },
    txtLabel: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14
    },
    textApproval: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#178544'
    },
    viewApproval: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 130,
        marginVertical: 40
    }

});

const mapStateToProps = (state) => ({
    txtAprovar: state.AprovacaoReducer.txtAprovar,
    showAprovarDialog: state.AprovacaoReducer.showAprovarDialog,
    username: state.LoginReducer.username,
    password: state.LoginReducer.password,
});

export default connect(mapStateToProps, { 
    modificaTxtAprovar,
    doApprove,
    doApproveBatch
})(Aprovar);
