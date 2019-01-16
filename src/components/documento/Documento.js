import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TouchableWithoutFeedback, 
    FlatList,
    Image,
    CheckBox,
    Platform,
    Animated
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { 
    modificaItemsShow, 
    modificaItems
} from '../../actions/DocumentosActions';

import docIcon from '../../../resources/imgs/docIcon.png';

class Documento extends Component {

    constructor(props) {
        super(props);

        this.onPressItem = this.onPressItem.bind(this);
        this.onPressBatchApprov = this.onPressBatchApprov.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.animValueAprovCheckeds = new Animated.Value(50);

        this.state = {
            checkeds: []
        };
    }

    componentDidUpdate() {
        if (this.state.checkeds.length) {
            Animated.spring(
                this.animValueAprovCheckeds, 
                {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 2
                }
            ).start();
        } else if (this.state.checkeds.length === 0) {
            Animated.spring(
                this.animValueAprovCheckeds, 
                {
                    toValue: 50,
                    useNativeDriver: true,
                    bounciness: 2
                }
            ).start();
        }
    }
    
    onPressItem(item) {
        if (item.items && item.items.length > 0) {
            this.props.modificaItemsShow(true);
            this.props.modificaItems([...item.items]);
        } else {
            this.props.modificaItemsShow(false);
        }
        Actions.documentoDetail({ item: { ...item } });  
    }

    onPressBatchApprov() {
        if (this.state.checkeds.length) {
            Actions.aprovacaoApp({ 
                opc: 'aprovar',
                title: 'Aprovar',
                isBatch: true,
                items: this.state.checkeds
            });
        }
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

    renderItem = ({ item, index }) => (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3.4 }}>
                    <TouchableOpacity
                        onPress={() => this.onPressItem(item)}
                    >
                        <View style={styles.primaryView}>
                            <View style={styles.viewFirst}>
                                <Image source={docIcon} style={styles.imgDoc} />
                                <View style={styles.sdu}>
                                    {item.supplier ? (
                                        <Text style={styles.textStyle}>{item.supplier}</Text>
                                    ) : (
                                        <Text style={styles.textStyle}>{' '}</Text>
                                    )}
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
                                <Text style={styles.textStyle} >{' '}</Text>
                                {item.value ? (
                                    <Text style={styles.textStyle}>{item.value}</Text>
                                ) : (
                                    <Text style={styles.textStyle}>{' '}</Text>
                                )}
                                {item.docDate ? (
                                    <Text style={styles.textStyle}>{item.docDate}</Text>
                                ) : (
                                    <Text style={styles.textStyle}>{' '}</Text>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View 
                    style={{ 
                        flex: 1, 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            const newCheckeds = [...this.state.checkeds];
                            const foundedIdx = _.findIndex(newCheckeds, chkd => chkd.idx === index);
                            if (foundedIdx !== -1) {
                                newCheckeds.splice(foundedIdx, 1);

                                this.setState({ checkeds: newCheckeds });
                            } else {
                                this.setState({ checkeds: [...newCheckeds, { idx: index, item }] });
                            }
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 10,
                                paddingLeft: 10,
                                paddingRight: 15
                            }}
                        >
                            <CheckBox
                                value={_.findIndex(
                                    this.state.checkeds, chkd => chkd.idx === index
                                ) !== -1}
                                onChange={() => {
                                    const newCheckeds = [...this.state.checkeds];
                                    const foundedIdx = _.findIndex(
                                        newCheckeds, chkd => chkd.idx === index
                                    );
                                    if (foundedIdx !== -1) {
                                        newCheckeds.splice(foundedIdx, 1);

                                        this.setState({ checkeds: newCheckeds });
                                    } else {
                                        this.setState({ 
                                            checkeds: [
                                                ...newCheckeds, 
                                                { idx: index, item }
                                            ] 
                                        });
                                    }
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
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
                    extraData={this.state}
                />
                <Animated.View 
                    style={{ 
                        height: 50,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#EE8215',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ translateY: this.animValueAprovCheckeds }],
                        ...Platform.select({
                            ios: {
                              shadowColor: 'rgba(0,0,0, .2)',
                              shadowOffset: { height: 0, width: 0 },
                              shadowOpacity: 1,
                              shadowRadius: 1,
                            },
                            android: {
                              elevation: 1,
                            }
                        })
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.onPressBatchApprov()}
                    >
                        <View
                            style={{
                                paddingHorizontal: '10%',
                                paddingVertical: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                            >
                                Aprovar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
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
})(Documento);

const styles = StyleSheet.create({
    viewLista: {
        flex: 1
    },
    containerList: {
        flex: 1,
        marginTop: 5,
        marginBottom: 60,
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
    sdu: { 
        marginLeft: 10, 
        padding: 5, 
        flex: 1
    }
    
});
