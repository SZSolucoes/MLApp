
import Axios, { CancelToken } from 'axios';
import { Alert } from 'react-native';

import { doFetchDocumentsRefresh } from './DocumentosActions';

export const modificaTxtAprovar = (texto) => ({
    type: 'modifica_txtaprovar_aprovacao',
    payload: texto
});

export const modificaTxtRejeitar = (texto) => ({
    type: 'modifica_txtrejeitar_aprovacao',
    payload: texto
});

export const modificaAprovarDialog = (value) => ({
    type: 'modifica_aprovardialog_aprovacao',
    payload: value
});

export const modificaRejeitarDialog = (value) => ({
    type: 'modifica_rejeitardialog_aprovacao',
    payload: value
});

export const modificaCleanAprovacao = () => ({
    type: 'modifica_clean_aprovacao'
});

export const doApprove = (params) => dispatch => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);

    dispatch({
        type: 'modifica_aprovardialog_aprovacao',
        payload: true
    });
    
    Axios.get('/service/doApproval.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('/service/doApproval.p', { 
                params: {
                    username: params.username,
                    password: params.password,
                    action: params.action,
                    nrTrans: params.nrTrans,
                    remarks: params.remarks
                }
            })
            .then((response) => doApproveSuccess(response, dispatch, params))
            .catch(() => {
                dispatch({
                    type: 'modifica_aprovardialog_aprovacao',
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
                type: 'modifica_aprovardialog_aprovacao',
                payload: false
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        }); 
};

export const doReject = (params) => dispatch => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);

    dispatch({
        type: 'modifica_rejeitardialog_aprovacao',
        payload: true
    });
    
    Axios.get('/service/doApproval.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('/service/doApproval.p', { 
                params: {
                    username: params.username,
                    password: params.password,
                    action: params.action,
                    nrTrans: params.nrTrans,
                    remarks: params.remarks
                }
            })
            .then((response) => doRejectSuccess(response, dispatch, params))
            .catch(() => {
                dispatch({
                    type: 'modifica_rejeitardialog_aprovacao',
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
                type: 'modifica_rejeitardialog_aprovacao',
                payload: false
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        }); 
};

const doApproveSuccess = (response, dispatch, params) => {
    if (response && response.data) {
        if (response.data.success === 'true') {
            doFetchDocumentsRefresh({ username: params.username }, { type: 'aprovar' }, dispatch);
        } else {
            dispatch({
                type: 'modifica_aprovardialog_aprovacao',
                payload: false
            });
            if (response.data.message) {
                setTimeout(() => 
                    Alert.alert('Aviso', response.data.message), 
                    500
                );
            } else {
                setTimeout(() => 
                    Alert.alert('Aviso', 'Falha ao aprovar a pendência.'), 
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

const doRejectSuccess = (response, dispatch, params) => {
    if (response && response.data) {
        if (response.data.success === 'true') { 
            doFetchDocumentsRefresh({ username: params.username }, { type: 'rejeitar' }, dispatch);
        } else {
            dispatch({
                type: 'modifica_rejeitardialog_aprovacao',
                payload: false
            });
            if (response.data.message) {
                setTimeout(() => 
                    Alert.alert('Aviso', response.data.message), 
                    500
                );
            } else {
                setTimeout(() => 
                    Alert.alert('Aviso', 'Falha ao rejeitar a pendência.'), 
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
