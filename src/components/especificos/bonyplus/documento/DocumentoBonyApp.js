import React, { Component } from 'react';
import { 
    View, 
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import DocumentoBony from './DocumentoBony';

class DocumentoBonyApp extends Component {

    render() {
        return (
            <View style={styles.viewPrinc}>
                <DocumentoBony />
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

export default connect(mapStateToProps, {})(DocumentoBonyApp);
