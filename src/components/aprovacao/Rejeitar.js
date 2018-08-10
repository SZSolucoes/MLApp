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

import { modificaTxtRejeitar, doReject } from '../../actions/AprovacaoActions';

class Rejeitar extends Component {

    constructor(props) {
        super(props);

        this.modificaTxtRejeitar = this.modificaTxtRejeitar.bind(this);
        this.doReject = this.doReject.bind(this);
    }

    modificaTxtRejeitar(texto) {
        this.props.modificaTxtRejeitar(texto);
    }

    doReject() {
        const txtRjct = this.props.txtRejeitar.trim();
        const params = {
            username: this.props.username,
            password: this.props.password,
            action: 'Rejeitar',
            nrTrans: this.props.item.id,
            remarks: txtRjct
        };
        this.props.doReject(params);
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
                            value={this.props.txtRejeitar}
                            onChangeText={(texto) => this.modificaTxtRejeitar(texto)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.viewApproval}>
                        <TouchableOpacity
                            onPress={() => this.doReject()}
                        >
                            <Text 
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={styles.textApproval}
                            >
                                Rejeitar
                            </Text>
                        </TouchableOpacity>
                    </View>        
                </View>
                <View>
                    <ProgressDialog
                        visible={this.props.showRejeitarDialog}
                        title='Rejeitando Pendência'
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
        color: '#cf1311'
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
    txtRejeitar: state.AprovacaoReducer.txtRejeitar,
    showRejeitarDialog: state.AprovacaoReducer.showRejeitarDialog,
    username: state.LoginReducer.username,
    password: state.LoginReducer.password,
});

export default connect(mapStateToProps, { 
    modificaTxtRejeitar,
    doReject 
})(Rejeitar);
