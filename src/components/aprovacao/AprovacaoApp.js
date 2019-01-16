import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { connect } from 'react-redux';

import Aprovar from './Aprovar';
import Rejeitar from './Rejeitar';

class AprovacaoApp extends Component {

    constructor(props) {
        super(props);

        this.onTouchKeyboardDismiss = this.onTouchKeyboardDismiss.bind(this);
    }

    onTouchKeyboardDismiss() {
        Keyboard.dismiss();
    }

    renderOpc() {
        if (this.props.opc === 'aprovar') {
            return (
                <Aprovar 
                    item={this.props.item} 
                    isBatch={this.props.isBatch}
                    items={this.props.items} 
                />
            );
        }

        return (<Rejeitar item={this.props.item} />);
    }

    render() {
        return (
            <TouchableWithoutFeedback
                    onPress={() => this.onTouchKeyboardDismiss()}
            >
                <View style={styles.viewPrinc}>
                    {this.renderOpc()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#F0EFF4'
    }
});

const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps, {})(AprovacaoApp);
