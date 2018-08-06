
import Axios, { CancelToken } from 'axios';
import { Actions } from 'react-native-router-flux';
import { Alert, AsyncStorage } from 'react-native';

export const modificaUsername = (value) => ({
    type: 'modifica_username_login',
    payload: value
});

export const modificaPassword = (value) => ({
    type: 'modifica_password_login',
    payload: value
});

export const modificaHidePw = (value) => ({
    type: 'modifica_hidepw_login',
    payload: value
});

export const modificaShowLogoLogin = (value) => ({
    type: 'modifica_showlogologin_login',
    payload: value
});

export const modificaModalVisible = (value) => ({
    type: 'modifica_modalvisible_login',
    payload: value
});

export const modificaUserToken = (value) => ({
    type: 'modifica_usertoken_login',
    payload: value
});

export const modificaCleanLogin = () => ({
    type: 'modifica_clean_login'
});

export const modificaUrlServer = (url) => ({
    type: 'modifica_urlserver_login',
    payload: url
});

export const doPersistToken = (params) => dispatch => {
    Axios.get('doLogin.p', {
        params: {
            username: params.username,
            password: params.password,
            token: params.userToken
        }   
    })
    .then(() => {})
    .catch(() => {});
};

export const doLogin = (params) => dispatch => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);

    dispatch({
        type: 'modifica_indicator_login',
        payload: true
    });

    Axios.get('doLogin.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('doLogin.p', {
                params: {
                    username: params.username,
                    password: params.password,
                    token: params.userToken
                }    
            })
            .then(response => doLoginSuccess(response, { ...params }, dispatch))
            .catch(() => {
                dispatch({
                    type: 'modifica_indicator_login',
                    payload: false
                });
                setTimeout(() => 
                    Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
                    500
                );
            });
        })
        .catch(() => {
            dispatch({
                type: 'modifica_indicator_login',
                payload: false
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        });           
};

const doLoginSuccess = (response, params, dispatch) => {
    if (response && response.data) {
        if (response.data.success === 'true') {
            dispatch({
                type: 'modifica_indicator_login',
                payload: false
            });
            updateShared({ ...params }, response);
        } else {
            dispatch({
                type: 'modifica_indicator_login',
                payload: false
            });
            if (response.data.message) {
                setTimeout(() => 
                    Alert.alert('Aviso', response.data.message), 
                    500
                );
            } else {
                setTimeout(() => 
                    Alert.alert('Aviso', 'Falha ao realizar o login.'), 
                    500
                );
            }
        }
    } else {
        setTimeout(() => 
            Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
            500
        );
    }
};

const updateShared = (params, response) => {
    AsyncStorage.setItem('userlogged', 's');
    AsyncStorage.setItem('user', params.username);
    AsyncStorage.setItem('apptype', response.data.appType);
    AsyncStorage.setItem('pwd', params.password)
        .then(() => Actions.documentosApp());
};

