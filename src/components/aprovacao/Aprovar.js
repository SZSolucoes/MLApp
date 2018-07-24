import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';

import { modificaTxtAprovar, doApprove } from '../../actions/AprovacaoActions';

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
        const txtAppr = this.props.txtAprovar.trim().replace(/\r?\n|\r/g, '');
        if (txtAppr) {
            const params = {
                username: this.props.username,
                password: this.props.password,
                action: 'Aprovar',
                nrTrans: this.props.item.id,
                remarks: txtAppr
            };
            this.props.doApprove(params);
        } else {
            Alert.alert('Aviso', 'O campo narrativa precisa ser informado.');
        }
    }

    render() {
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
                        title='Aprovando Pendência'
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
    doApprove 
})(Aprovar);
