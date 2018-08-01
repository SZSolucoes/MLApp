import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet 
} from 'react-native';

export default class DocumentoPureItem extends PureComponent {
    render() {
      return (
        <TouchableOpacity
            onPress={() => this.props.onPressItem(this.props.item)}
        >
            <View style={{ marginLeft: 10, padding: 5 }}>
                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                    {this.props.item.description}
                </Text>
            </View>
            <View style={[styles.primaryView, { marginTop: 20 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Código</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Quantidade</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Valor</Text>
                </View>
            </View>
            <View style={[styles.primaryView, { marginBottom: 10 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.itemcode}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.quantity}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.value}
                    </Text>
                </View>
            </View>
        </TouchableOpacity> 
      );
    }
  }

  const styles = StyleSheet.create({
    primaryView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        paddingBottom: 5,
        textAlign: 'center'
    }
});

