import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaCleanAprovacao } from '../../../../actions/AprovacaoActions';
import DocumentoBonyPureItem from './DocumentoBonyPureItem';

class DocumentoBonyDetail extends Component {

    constructor(props) {
        super(props);

        this.menuApprove = this.menuApprove.bind(this);
        this.onPressItem = this.onPressItem.bind(this);
    }

    componentWillUnmount() {
        this.props.modificaCleanAprovacao();
    }
    
    
    onPressItem(item) {
        Actions.documentoBonyItensDetail({ item });
    }
    
    menuApprove(opc, title) {
        const item = { ...this.props.item };
        Actions.aprovacaoApp({ 
            opc,
            title,
            item
        });
    }

    keyExtractor(item, index) {
        return (
            index.toString()
        );
    }
    
    renderSeparator = () => (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
    )

    renderItem = ({ item }) => (
        <DocumentoBonyPureItem item={item} onPressItem={this.onPressItem} />
    )

    render() {
        return (
            <View style={styles.viewPrinc}>
                <View style={{ flex: 8 }}>
                    <ScrollView>
                        <FlatList
                            data={this.props.item.family}
                            style={styles.containerList}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                            initialNumToRender={10}
                        />
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
    },
    viewLista: {
        flex: 1
    },
    containerList: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 5
    }

});

const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps, { modificaCleanAprovacao })(DocumentoBonyDetail);
