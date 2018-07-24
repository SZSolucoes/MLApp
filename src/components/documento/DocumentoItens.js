import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList
} from 'react-native';

import { connect } from 'react-redux';

class DocumentoItens extends Component {
    
    onPressItem() {
       return false;  
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
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>{item.description}</Text>
                </View>
                <View style={styles.primaryView}>
                    <View style={styles.viewFirst}>
                        <View style={{ marginLeft: 10, padding: 5 }}>
                            <Text style={styles.textStyle}>Código</Text>
                            <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                {item.itemcode}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textStyle}>Quantidade</Text>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {item.quantity}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textStyle}>Valor</Text>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {item.value}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>            
    )

    render() {
        return (
            <View style={styles.viewLista}>
                <FlatList
                    data={this.props.items}
                    style={styles.containerList}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(DocumentoItens);

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
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
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
    }
    
});
