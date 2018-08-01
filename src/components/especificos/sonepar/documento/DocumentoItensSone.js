import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import DocumentoPureItemSone from './DocumentoPureItemSone';

class DocumentoItensSone extends Component {

    constructor(props) {
        super(props);

        this.onPressItem = this.onPressItem.bind(this);
    }
    
    onPressItem(item) {
        Actions.documentoItensDetail({ item });
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
        <DocumentoPureItemSone item={item} onPressItem={this.onPressItem} />                    
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
                    initialNumToRender={10}
                />
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(DocumentoItensSone);

const styles = StyleSheet.create({
    viewLista: {
        flex: 1
    },
    containerList: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 5
    }
});
