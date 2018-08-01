import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';

class DocumentoItensDetail extends Component {

    renderFourPurchases() {
        if (this.props.item.purchases && this.props.item.purchases.length > 0) {
            return this.props.item.purchases.map((itemPurchase, index) => {
                if (index <= 3) {
                    return (
                        <View key={index} style={styles.primaryView}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                    {itemPurchase.fornec}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                    {itemPurchase.price}
                                </Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                    {itemPurchase.quantity}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                    {itemPurchase.date}
                                </Text>
                            </View>
                        </View>
                    );
                }

                return undefined;
            });
        }
    }

    renderFirstPriceList() {
        const priceList = this.props.item.priceList;
        if (priceList && priceList.length > 0) {
            return (
                <View style={styles.primaryView}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {priceList[0].codFornec}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {priceList[0].priceBase}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {priceList[0].priceUnit}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                            {priceList[0].valueTot}
                        </Text>
                    </View>
                </View>
            );
        }
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.highOneText}>Ultimas Compras</Text>
                    </View>
                    <View style={styles.highOneView}>
                        <View style={styles.primaryView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>Fornec</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>Preço</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textStyle}>Qtde</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>Emissão</Text>
                            </View>
                        </View>
                        {this.renderFourPurchases()}
                    </View>
                    <View style={{ marginVertical: 35 }}> 
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.highOneText}>Cotações do Item</Text>
                        </View>
                        <View style={styles.highTwoView}>
                            <View style={styles.primaryView}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>Código</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>Preço Base</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>Preço Unit</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>Valor Total</Text>
                                </View>
                            </View>
                            {this.renderFirstPriceList()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(DocumentoItensDetail);

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
