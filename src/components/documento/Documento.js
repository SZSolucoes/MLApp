import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TouchableWithoutFeedback, 
    FlatList,
    Image,
    Platform,
    Animated,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import _ from 'lodash';

import { 
    modificaItemsShow, 
    modificaItems,
    modificaFunCheckDoc
} from '../../actions/DocumentosActions';

import docIcon from '../../../resources/imgs/docIcon.png';
import arrowRight from '../../../resources/imgs/arrowright.png';

class Documento extends Component {

    constructor(props) {
        super(props);

        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.onPressItem = this.onPressItem.bind(this);
        this.onBackDoc = this.onBackDoc.bind(this);
        this.onPressCheckItem = this.onPressCheckItem.bind(this);
        this.onPressSelectAll = this.onPressSelectAll.bind(this);
        this.onPressBatchApprov = this.onPressBatchApprov.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.animValueAprovCheckeds = new Animated.Value(50);

        this.state = {
            checkeds: []
        };
    }

    componentDidMount() {
        const screen = Dimensions.get('screen');
        const isPortrait = screen.height > screen.width;

        Dimensions.addEventListener('change', this.onChangeDimensions);

        this.props.modificaFunCheckDoc(this.onPressSelectAll);

        setTimeout(() => {
            if (this.checkRefView) {
                this.checkRefView.measure(
                    (x, y, w, h, px) => this.props.checkPos(px, isPortrait, w)
                );
            }
        }, 500);
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

    componentWillUnmount() {
        this.props.modificaFunCheckDoc(() => false);
        Dimensions.removeEventListener('change', this.onChangeDimensions);
    }

    onChangeDimensions(dimens) {
        if (Actions.currentScene.includes('documentoApp')) {
            const isPortrait = dimens.screen.height > dimens.screen.width;
            setTimeout(() => {
                if (this.checkRefView) {
                    this.checkRefView.measure(
                        (x, y, w, h, px) => this.props.checkPos(px, isPortrait, w)
                    );
                }
            }, 500);
        }
    }

    onPressSelectAll(isChecked) {
        if (isChecked) {
            this.setState({ checkeds: [] });
        } else {
            const items = [...this.props.listDocsSelected];
            const newItens = [];

            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                newItens.push({ idx: index, item: element });
            }

            this.setState({ checkeds: newItens });
        }

        return !isChecked;
    }
    
    onPressItem(item) {
        if (item.items && item.items.length > 0) {
            this.props.modificaItemsShow(true);
            this.props.modificaItems([...item.items]);
        } else {
            this.props.modificaItemsShow(false);
        }
        Actions.documentoDetail({ 
            item: { ...item },
            onBack: () => this.onBackDoc()
        });  
    }

    onBackDoc() {
        const screen = Dimensions.get('screen');
        const isPortrait = screen.height > screen.width;
        
        Actions.pop();

        if (this.checkRefView) {
            this.checkRefView.measure(
                (x, y, w, h, px) => this.props.checkPos(px, isPortrait, w)
            );
        }
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

    onPressCheckItem(item, index) {
        const newCheckeds = [...this.state.checkeds];
        const foundedIdx = _.findIndex(newCheckeds, chkd => chkd.idx === index);
        if (foundedIdx !== -1) {
            newCheckeds.splice(foundedIdx, 1);

            this.setState({ checkeds: newCheckeds });
        } else {
            this.setState({ checkeds: [...newCheckeds, { idx: index, item }] });
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
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => this.onPressCheckItem(item, index)}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <View
                                style={{ backgroundColor: 'white', padding: 3 }}
                                ref={ref => {
                                    if (index === 0) {
                                        this.checkRefView = ref;
                                    }
                                }}
                            >
                                <CheckBox
                                    isChecked={_.findIndex(
                                        this.state.checkeds, chkd => chkd.idx === index
                                        ) !== -1}
                                    onClick={() => this.onPressCheckItem(item, index)}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.onPressItem(item)}
                    >
                        <View
                            style={{ flex: 1, alignItems: 'center' }}
                        >
                            <Image source={arrowRight} style={styles.arrowIcon} />
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
                    ListFooterComponent={(<View style={{ marginVertical: 30 }} />)}
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
                        flexDirection: 'row',
                        transform: [{ translateY: this.animValueAprovCheckeds }],
                        ...Platform.select({
                            ios: {
                              shadowColor: 'rgba(0,0,0, .2)',
                              shadowOffset: { height: 0, width: 0 },
                              shadowOpacity: 1,
                              shadowRadius: 1,
                            },
                            android: {
                              elevation: 5,
                            }
                        })
                    }}
                >
                    <View 
                        style={{ 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 36 / 2,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    color: 'black'
                                }}
                            >
                                {this.state.checkeds.length}
                            </Text>
                        </View>
                    </View>
                    <View 
                        style={{ 
                            flex: 2, 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.onPressBatchApprov()}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                            >
                                {'  Aprovar  '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{ 
                            flex: 1
                        }}
                    />
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    listDocsSelected: state.DocumentosReducer.listDocsSelected,
    checkPos: state.DocumentosReducer.checkPos
});

export default connect(mapStateToProps, {
    modificaItemsShow, 
    modificaItems,
    modificaFunCheckDoc
})(Documento);

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
    }
    
});
