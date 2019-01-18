import React, { Component } from 'react';
import { 
    View, 
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import Documentos from './Documentos';

class DocumentosApp extends Component {

    render() {
        return (
            <View style={styles.viewPrinc}>
                <Documentos />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#F0EFF4'
    }
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(DocumentosApp);
