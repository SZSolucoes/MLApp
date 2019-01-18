import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
    Animated,
    Image,
    Modal,
    Keyboard,
    Platform,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';

import {
    modicaShowModalBatch
} from '../../actions/DocumentosActions';

import docIcon from '../../../resources/imgs/docIcon.png';

class DocumentosErrorAppr extends Component {

    constructor(props) {
        super(props);

        this.animFade = new Animated.Value(0);

        this.closeModalToggle = this.closeModalToggle.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    closeModalToggle() {
        Animated.timing(
            this.animFade,
            {
                toValue: 0,
                duration: 200
            }
        ).start(() => {
            setTimeout(() => this.props.modicaShowModalBatch(false), 100);
        });
    }

    keyExtractor(item, index) {
        return (
            index.toString()
        );
    }
    
    renderItem = ({ item }) => (
        <TouchableWithoutFeedback>
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
        </TouchableWithoutFeedback>
    )

    render() {
        return (
            <Modal
                animationType="slide"
                transparent
                visible={this.props.showModalBatchAppr}
                supportedOrientations={['portrait']}
                onRequestClose={() => this.closeModalToggle()}
                onShow={() =>
                    Animated.timing(
                        this.animFade,
                        {
                            toValue: 0.5,
                            duration: 800
                        }
                    ).start()
                }
            >
                <TouchableWithoutFeedback
                    onPress={() => this.closeModalToggle()}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: this.animFade.interpolate({
                                inputRange: [0, 0.5],
                                outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']
                            })
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                                this.closeModalToggle();
                            }}
                        >
                            <View style={styles.viewPricinp} >
                                <TouchableWithoutFeedback
                                    onPress={() => Keyboard.dismiss()}
                                >  
                                    <View style={styles.card}>
                                        <View 
                                            style={{ 
                                                flexDirection: 'row', 
                                                justifyContent: 'space-between' 
                                            }}
                                        >
                                            <View
                                                style={{ 
                                                    justifyContent: 'center', 
                                                    paddingLeft: 10,
                                                    paddingVertical: 10,
                                                    flex: 3
                                                }}
                                            >
                                                <Text 
                                                    style={{ 
                                                        color: 'red',
                                                        fontWeight: '500',
                                                        fontSize: 17,
                                                        textAlign: 'left' 
                                                    }}
                                                >
                                                    Documentos não aprovados
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    this.closeModalToggle();
                                                }}
                                            >   
                                                <View 
                                                    style={{  
                                                        alignItems: 'flex-end',
                                                        paddingVertical: 11,
                                                        paddingHorizontal: 15,
                                                        flex: 1 
                                                    }}
                                                >
                                                    <Text
                                                        style={{ 
                                                            fontWeight: '500',
                                                            fontSize: 16,
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        Fechar
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                padding: 10,
                                                backgroundColor: 'white'
                                            }}
                                        >
                                            <ScrollView contentContainerStyle={{ flex: 1 }}>
                                                <FlatList
                                                    data={this.props.modalBatchApprItens}
                                                    style={styles.containerList}
                                                    keyExtractor={this.keyExtractor}
                                                    renderItem={this.renderItem}
                                                    extraData={this.props}
                                                    ListFooterComponent={
                                                        (<View style={{ marginVertical: 10 }} />)
                                                    }
                                                />
                                            </ScrollView>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    modalBatchApprItens: state.DocumentosReducer.modalBatchApprItens,
    showModalBatchAppr: state.DocumentosReducer.showModalBatchAppr
});

export default connect(mapStateToProps, {
    modicaShowModalBatch
})(DocumentosErrorAppr);

const styles = StyleSheet.create({
    viewLista: {
        flex: 1
    },
    viewPricinp: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderColor: '#e1e8ee',
        borderWidth: 1,
        margin: 15,
        marginBottom: 0,
        width: '90%',
        height: '80%',
        borderRadius: 5,
        overflow: 'hidden',
        padding: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 5,
            },
        })
    },
    containerList: {
        flex: 1,
        backgroundColor: '#DCE0E4',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    primaryView: {
        marginBottom: 10,
        backgroundColor: 'white',
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
