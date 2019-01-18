import React from 'react';
import { 
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

import { modificaCheckPos } from '../../actions/DocumentosActions';

class DocumentoAllCheck extends React.Component {

    constructor(props) {
        super(props);

        this.setAnimTransX = this.setAnimTransX.bind(this);
        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.translateAnimX = new Animated.Value(0);
        this.opacityAnimX = new Animated.Value(0);

        this.widthBack = 50;

        this.state = {
            width: Dimensions.get('screen').width,
            isChecked: false
        };
    }

    componentDidMount() {
        this.props.modificaCheckPos(this.setAnimTransX);
        Dimensions.addEventListener('change', this.onChangeDimensions);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onChangeDimensions);
    }

    onChangeDimensions(dimens) {
        if (Actions.currentScene.includes('documentoApp')) {
            const { width } = dimens.screen;
            
            this.opacityAnimX.setValue(0);
            this.setState({ width });
        }
    }

    setAnimTransX(value) {
        this.setState({ width: Dimensions.get('screen').width });
        this.opacityAnimX.setValue(0);
        this.translateAnimX.setValue(value - this.widthBack);
        Animated.timing(
            this.opacityAnimX,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        return (
            <View
                style={{
                    width: this.state.width
                 }}
            >
                <View
                    style={{ 
                        flexDirection: 'row',
                        height: '100%'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => Actions.pop()}
                    >
                        <View style={{ width: this.widthBack, height: '100%' }} />
                    </TouchableOpacity>
                    <Animated.View
                        style={{
                            transform: [{ translateX: this.translateAnimX }],
                            opacity: this.opacityAnimX,
                            height: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ 
                                    isChecked: this.props.funCheckDoc(
                                        this.state.isChecked
                                    ) 
                                });
                            }}
                        >
                                <View 
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        padding: 3,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CheckBox
                                        isChecked={this.state.isChecked}
                                        onClick={() => {
                                            this.setState({ 
                                                isChecked: this.props.funCheckDoc(
                                                    this.state.isChecked
                                                ) 
                                            });
                                        }}
                                    />
                                </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    funCheckDoc: state.DocumentosReducer.funCheckDoc,
});

export default connect(mapStateToProps, {
    modificaCheckPos
})(DocumentoAllCheck);
