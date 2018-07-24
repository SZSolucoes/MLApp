import React, { Component } from 'react';
import { 
    View, 
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import Documento from './Documento';

class DocumentoApp extends Component {

    render() {
        return (
            <View style={styles.viewPrinc}>
                <Documento />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: 'white'
    }
});

const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps, {})(DocumentoApp);
