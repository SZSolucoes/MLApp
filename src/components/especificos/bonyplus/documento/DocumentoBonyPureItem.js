import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image 
} from 'react-native';

import arrowRight from '../../../../../resources/imgs/arrowright.png';

export default class DocumentoBonyPureItem extends PureComponent {
    render() {
      return (
        <TouchableOpacity
            onPress={() => this.props.onPressItem(this.props.item)}
        >
            <View style={styles.primaryView}>
                <View style={{ flex: 11 }}>
                    <View style={{ marginLeft: 10, padding: 5 }}>
                        <Text style={[styles.textStyle, { color: '#EE8215', textAlign: 'left' }]}>
                            {this.props.item.famDes}
                        </Text>
                    </View>
                    <View style={styles.primaryView}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>Cond Pagamento</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>Valor</Text>
                        </View>
                    </View>
                    <View style={styles.primaryView}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                {this.props.item.desCond}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.textStyle, { color: '#EE8215' }]}>
                                {this.props.item.percValue}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image source={arrowRight} style={styles.arrowIcon} />
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
    },
    arrowIcon: {
        width: 15,
        height: 15
    }
});

