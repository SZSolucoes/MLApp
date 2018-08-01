import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet 
} from 'react-native';

export default class DocumentoPureItemSone extends PureComponent {
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
                    <Text style={styles.textStyle}>Ordem</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Qtde</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>UN</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Valor</Text>
                </View>
            </View>
            <View style={styles.primaryView}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.order}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.quantity}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.un}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.value}
                    </Text>
                </View>
            </View>
            <View style={[styles.primaryView, { marginTop: 15 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Min</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>PP</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Alvo</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Max</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.textStyle}>Política Estoq</Text>
                </View>
            </View>
            <View style={[styles.primaryView, { marginBottom: 10 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.valMin}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.valPP}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.valAlvo}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.valMax}
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                        {this.props.item.politicaEstoque}
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
    textStyle: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400',
        paddingBottom: 5,
        textAlign: 'center'
    }
});

