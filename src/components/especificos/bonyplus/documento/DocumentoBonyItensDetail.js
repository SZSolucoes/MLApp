import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

class DocumentoBonyItensDetail extends Component {

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.parseType = this.parseType.bind(this);
    }

    keyExtractor(item, index) {
        return (
            index.toString()
        );
    }
    
    parseType(value) {
        const newValue = value.substr(0, 7);
        if (newValue.toLowerCase() === 'bonific') {
            return newValue;
        }
        return value;
    }

    renderSeparator() {
        return (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => true}
        >
            <View style={{ marginLeft: 10, padding: 5 }}>
                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                    {item.description}
                </Text>
            </View>
            <View style={styles.primaryView}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Cod</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.textStyle}>Qtd</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Valor</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Total</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{this.parseType(item.type)}</Text>
                </View>
            </View>
            <View style={styles.primaryView}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.itemcode}
                    </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.quantity}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.value}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.total}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {item.valPerc}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.props.item.items}
                    style={styles.containerList}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    initialNumToRender={10}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(DocumentoBonyItensDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        paddingHorizontal: 5
    },
    highOneView: {
        flex: 1,
        paddingTop: 10
    },
    highTwoView: {
        flex: 2,
        paddingTop: 10
    },
    highOneText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
    },
    primaryView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400',
        paddingBottom: 5,
        textAlign: 'center'
    }
});
