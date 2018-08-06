
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Axios, { CancelToken } from 'axios';

export const modificaShowDocsDialog = (value) => ({
    type: 'modifica_showdocumentsdialog_documentos',
    payload: value
});

export const modificaListDocsSelected = (value) => ({
    type: 'modifica_listdocsselected_documentos',
    payload: value
});

export const modificaItemsShow = (value) => ({
    type: 'modifica_itemshow_documentos',
    payload: value
});

export const modificaItems = (value) => ({
    type: 'modifica_items_documentos',
    payload: value
});

export const modificaCleanDocumentos = () => ({
    type: 'modifica_clean_documentos'
});

export const modificaAuxModal = (value) => ({
    type: 'modifica_auxmodal_documentos',
    payload: value
});

export const modificaAppType = (value) => ({
    type: 'modifica_apptype_documentos',
    payload: value
});

export const modificaDocNumber = (value) => ({
    type: 'modifica_docnumber_documentos',
    payload: value
});

export const doFetchDocuments = (params, popDocs) => dispatch => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);

    dispatch({ 
        type: 'modifica_auxmodal_documentos',
        payload: true
    });

    Axios.get('getDocuments.p', { 
            cancelToken: source.token 
        })
        .then(() => {
            Axios.get('getDocuments.p', {
                params: {
                    username: params.username
                },
                cancelToken: params.modalToken.token,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 120000, // 120 segundos
                maxContentLength: 5000000, // 5 MB
                responseEncoding: 'utf8',
                transformResponse: (data) => {
                    let dataParsed = '';
                    try {
                        dataParsed = JSON.parse(data.replace(/\r?\n|\r/g, ''));
                    } catch (e) {
                        dispatch({ 
                            type: 'modifica_clean_documentos'
                        });
                        return undefined;
                    }
                    return dataParsed;
                }
            }, { timeout: 120000 })
            .then((response) => onFetchDocSuccess(dispatch, response, popDocs))
            .catch((error) => {
                dispatch({ 
                    type: 'modifica_clean_documentos'
                });
                if (!Axios.isCancel(error)) {
                    setTimeout(() => 
                        Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
                        500
                    );
                }
            });
        })
        .catch(() => {
            dispatch({ 
                type: 'modifica_clean_documentos'
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        });
};

export const doFetchDocumentsRefresh = (params, popDocs, dispatch) => {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, Axios.defaults.timeout);

    dispatch({ 
        type: 'modifica_auxmodal_documentos',
        payload: true
    });

    Axios.get('getDocuments.p', { 
            cancelToken: source.token
        })
        .then(() => {
            Axios.get('getDocuments.p', {
                params: {
                    username: params.username
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 120000, // 120 segundos
                maxContentLength: 5000000, // 5 MB
                responseEncoding: 'utf8',
                transformResponse: (data) => {
                    let dataParsed = '';
                    try {
                        dataParsed = JSON.parse(data.replace(/\r?\n|\r/g, ''));
                    } catch (e) {
                        dispatch({ 
                            type: 'modifica_clean_documentos'
                        });
                        return undefined;
                    }
                    return dataParsed;
                }
            }, { timeout: 120000 })
            .then((response) => onFetchDocSuccess(dispatch, response, popDocs))
            .catch(() => {
                dispatch({ 
                    type: 'modifica_clean_documentos'
                });
                setTimeout(() => 
                    Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
                    500
                );    
            });
        })
        .catch(() => {
            dispatch({ 
                type: 'modifica_clean_documentos'
            });
            setTimeout(() => 
                Alert.alert('Aviso', 'Falha de comunicação com o servidor.'), 
                500
            );
        });
};

const onFetchDocSuccess = (dispatch, response, popDocs) => {
    dispatch({ 
        type: 'modifica_clean_documentos'
    });
    if (response && response.data && response.data.pendings) { 
        const body = response.data;
        // Verifica se possue algum documento pendente 
        if (body.pendings.length > 0) { 
            dispatch({
                type: 'modifica_listdocs_documentos',
                payload: body.pendings
            });

            if (popDocs) {
                if (popDocs.type === 'aprovar') {
                    dispatch({
                        type: 'modifica_aprovardialog_aprovacao',
                        payload: false
                    });
                    setTimeout(() => 
                        Alert.alert('Aviso', 'Pendência Aprovada com sucesso!'), 
                        500
                    );
                } else {
                    dispatch({
                        type: 'modifica_rejeitardialog_aprovacao',
                        payload: false
                    });
                    setTimeout(() => 
                        Alert.alert('Aviso', 'Pendência Rejeitada com sucesso!'), 
                        500
                    );
                }
                Actions.popTo('documentosApp');
            }  
        }
    } else {
        setTimeout(() => 
            Alert.alert('Aviso', 'Ocorreu um erro interno no servidor.'), 
            500
        );
    }
};
