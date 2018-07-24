import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaCleanAprovacao } from '../../actions/AprovacaoActions';

import FormRow from '../../utils/FormRow';

class DocumentoDetail extends Component {

    constructor(props) {
        super(props);

        this.getAlternative = this.getAlternative.bind(this);
        this.menuApprove = this.menuApprove.bind(this);
    }

    componentWillUnmount() {
        this.props.modificaCleanAprovacao();
    }
   
    getAlternative() {
        if (this.props.item.alternative === 'Nao') {
            return false;
        }
        return true;
    }
    
    menuApprove(opc, title) {
        const item = { ...this.props.item };
        Actions.aprovacaoApp({ 
            opc,
            title,
            item
        });
    }

    render() {
        return (
            <View style={styles.viewPrinc}>
                <View style={{ flex: 8 }}>
                    <ScrollView>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Chave Documento</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.docKey}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Fornecedor</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.supplier}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Data</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.docDate}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Solicitante</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.user}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Centro de Custo</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.codCCusto}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Código Lotação</Text>
                                <View style={styles.SectionStyle}>
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.codLotac}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Descrição Lotação</Text>
                                <View style={styles.SectionStyle} >
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.desLotac}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Total</Text>
                                <View style={styles.SectionStyle} >
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.value}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Vencimento</Text>
                                <View style={styles.SectionStyle} >
                                    <Text 
                                        selectable 
                                        style={styles.input} 
                                        numberOfLines={2} 
                                        adjustsFontSizeToFit
                                    >
                                        {this.props.item.dueDate}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Alternativo</Text>
                                <View style={styles.SectionStyle} pointerEvents={'none'} >
                                    <Switch
                                        value={this.getAlternative()}
                                    />
                                </View>
                            </View>
                        </FormRow>
                        <FormRow>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.SectionStyle, { height: 150 }]} >
                                    <Text selectable style={styles.input}>
                                        {this.props.item.remarks}
                                    </Text>
                                </View>
                            </View>
                        </FormRow>
                    </ScrollView>
                </View>
                <View style={styles.viewApproval}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 50 }}>
                            <TouchableOpacity
                                onPress={() => this.menuApprove('aprovar', 'Aprovar')}
                            >
                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1} 
                                    style={[styles.textApproval, { 
                                        color: '#178544'
                                    }]}
                                >
                                    Aprovar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 50 }}>
                            <TouchableOpacity
                                onPress={() => this.menuApprove('rejeitar', 'Rejeitar')}
                            >
                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1} 
                                    style={[styles.textApproval, { 
                                        color: '#cf1311' 
                                    }]}
                                >
                                    Rejeitar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
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
    viewApproval: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1
    },
    textApproval: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }

});

const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps, { modificaCleanAprovacao })(DocumentoDetail);
