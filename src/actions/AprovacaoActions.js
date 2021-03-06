
import Axios, { CancelToken } from 'axios';
import { Alert } from 'react-native';
import _ from 'lodash';

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
    
    Axios.get('doApproval.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('doApproval.p', { 
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
    
    Axios.get('doApproval.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('doApproval.p', { 
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
        dispatch({
            type: 'modifica_aprovardialog_aprovacao',
            payload: false
        });
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
        dispatch({
            type: 'modifica_rejeitardialog_aprovacao',
            payload: false
        });
        setTimeout(() => 
            Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
            500
        );
    }
};

export const doApproveBatch = (params, itemsErrorComp) => dispatch => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);
    
    dispatch({
        type: 'modifica_aprovardialog_aprovacao',
        payload: true
    });

    const asyncFunExec = async () => {
        const isOnline = await Axios.get('doApproval.p', { 
            cancelToken: source.token
        })
        .then(() => true)
        .catch(() => false);

        if (isOnline) {
            const numDocs = params.length;
            const itemsErrorCompFiltred = [];
            let docsNotApproved = 0;
            for (let index = 0; index < numDocs; index++) {
                const element = params[index];

                const itemApprovResult = await Axios.get('doApproval.p', { 
                    params: {
                        ...element
                    }
                })
                .then((response) => {
                    if (response && response.data && response.data.success === 'true') {
                        return true;
                    } 
                    
                    return false;
                })
                .catch(() => false);

                if (!itemApprovResult) {
                    const findedItem = _.find(
                        itemsErrorComp, itEr => itEr.nrTrans === element.nrTrans
                    );

                    if (findedItem) {
                        itemsErrorCompFiltred.push({
                            ...findedItem
                        });
                    }
                    docsNotApproved++;
                }
            }

            if (docsNotApproved === 0) {
                doFetchDocumentsRefresh(
                    { username: params[0].username }, 
                    { type: 'aprovar' }, 
                    dispatch,
                    false,
                    numDocs > 1
                );
            } else if (docsNotApproved === numDocs) {
                const textAlert = numDocs > 1 ? 
                'Falha ao aprovar as pendências.' : 
                'Falha ao aprovar a pendência.';

                dispatch({
                    type: 'modifica_aprovardialog_aprovacao',
                    payload: false
                });
                setTimeout(() => 
                    Alert.alert('Aviso', textAlert), 
                    500
                );

                return;
            } else {
                doFetchDocumentsRefresh(
                    { username: params[0].username }, 
                    { type: 'aprovar' }, 
                    dispatch,
                    itemsErrorCompFiltred,
                    numDocs > 1
                );
            }
        } else {
            dispatch({
                type: 'modifica_aprovardialog_aprovacao',
                payload: false
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        }
    };

    asyncFunExec();
};
