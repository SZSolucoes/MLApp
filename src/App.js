
import React, { Component } from 'react';
import { YellowBox, AsyncStorage, AppState, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Axios from 'axios';
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult } from 'react-native-fcm';

import Routes from './Routes';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

    constructor(props) {
        super(props);

        Axios.defaults.timeout = 20000; // Timeout default para o Axios

        YellowBox.ignoreWarnings([
            'Warning: isMounted(...) is deprecated', 
            'Module RCTImageLoader'
        ]);
    }

    componentDidMount() {
        FCM.requestPermissions({
            badge: true,
            sound: true,
            alert: true
        });
        FCM.getFCMToken().then(token => {
            if (token) {
                AsyncStorage.setItem('usertoken', token); 
            }
        });  
        FCM.on(FCMEvent.Notification, notif => {
                if (AppState.currentState === 'active') {
                    if (Platform.OS === 'ios' && 
                    notif._notificationType === NotificationType.WillPresent && 
                    !notif.local_notification) {
                        // Bloco de customização para a notificação local ios
                        /*FCM.presentLocalNotification({
                            channel: 'default', 
                            title: 'Test Notification with action', 
                            body: notif.fcm.body, 
                            sound: 'default', 
                            priority: 'high', 
                            show_in_foreground: true,
                        });*/
                        notif.finish(WillPresentNotificationResult.All);
                    } else if (Platform.OS === 'android') {
                        FCM.presentLocalNotification({
                            channel: 'default',
                            body: notif.fcm.body,
                            id: new Date().valueOf().toString(),
                            priority: 'high',
                            sound: 'default',
                            title: notif.fcm.title,
                            icon: 'ic_launcher',
                            large_icon: 'ic_launcher',
                            show_in_foreground: true,
                            vibrate: 300, 
                            lights: true
                        });
                    }
                }
            }
        );
        FCM.on(FCMEvent.RefreshToken, (newToken) => {
            if (newToken) {
                AsyncStorage.setItem('usertoken', newToken); 
            }
        });
        AsyncStorage.getItem('urlServer')
            .then((value) => { Axios.defaults.baseURL = value; });
    }

    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
