import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { 
    modificaItemsShow, 
    modificaItems 
} from '../../../../actions/DocumentosActions';

import docIcon from '../../../../../resources/imgs/docIcon.png';
import arrowRight from '../../../../../resources/imgs/arrowright.png';

class DocumentoBony extends Component {

    constructor(props) {
        super(props);

        this.onPressItem = this.onPressItem.bind(this);
    }
    
    onPressItem(item) {
        this.props.modificaItemsShow(false); 
        Actions.documentoBonyDetail({ item: { ...item } });  
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
            <TouchableOpacity
                onPress={() => this.onPressItem(item)}
            >
                <View style={{ marginLeft: 10, padding: 5 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.supplier}
                    </Text>
                </View>
                <View style={styles.primaryView}>
                    <View style={styles.viewFirst}>
                        <Image source={docIcon} style={styles.imgDoc} />
                        <View style={styles.sdu}>
                            {item.docKey ? (
                                <Text style={styles.textStyle}>{item.docKey}</Text>
                            ) : (
                                <Text style={styles.textStyle}>{' '}</Text>
                            )}
                            {item.user ? (
                                <Text style={styles.textStyle}>{item.user}</Text>
                            ) : (
                                <Text style={styles.textStyle}>{' '}</Text>
                            )}
                        </View>
                    </View>
                    <View style={{ flex: 4 }}>
                        {item.value ? (
                            <Text style={styles.textStyle}>{`R$ ${item.value}`}</Text>
                        ) : (
                            <Text style={styles.textStyle}>{' '}</Text>
                        )}
                        {item.docDate ? (
                            <Text 
                                style={[
                                    styles.textStyle, 
                                    styles.wightField
                                ]}
                            >{item.docDate}</Text>
                        ) : (
                            <Text style={styles.textStyle}>{' '}</Text>
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image source={arrowRight} style={styles.arrowIcon} />
                    </View>
                </View>
                <View style={{ marginLeft: 10, padding: 5 }}>
                    <Text style={styles.textStyle}>
                        {item.obsPedido}
                    </Text>
                </View>
            </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.viewLista}>
                <FlatList
                    data={this.props.listDocsSelected}
                    style={styles.containerList}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    listDocsSelected: state.DocumentosReducer.listDocsSelected
});

export default connect(mapStateToProps, {
    modificaItemsShow, 
    modificaItems 
})(DocumentoBony);

const styles = StyleSheet.create({
    viewLista: {
        flex: 1
    },
    containerList: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 5
    },
    primaryView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgDoc: {
        width: 30,
        height: 30
    },
    viewFirst: { 
        flex: 7, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 5
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400',
        paddingBottom: 5
    },
    arrowIcon: {
        width: 15,
        height: 15
    },
    sdu: { 
        marginLeft: 10, 
        padding: 5, 
        flex: 1
    },
    wightField: {
        fontWeight: '500',
        color: 'red'
    }
    
});
