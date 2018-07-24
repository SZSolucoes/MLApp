const INITIAL_STATE = {
    txtAprovar: '',
    txtRejeitar: '',
    showAprovarDialog: false,
    showRejeitarDialog: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_txtaprovar_aprovacao':
            return { 
                ...state, 
                txtAprovar: action.payload 
            };
        case 'modifica_txtrejeitar_aprovacao':
            return { 
                ...state, 
                txtRejeitar: action.payload 
            };
        case 'modifica_aprovardialog_aprovacao':
            return { 
                ...state, 
                showAprovarDialog: action.payload 
            };
        case 'modifica_rejeitardialog_aprovacao':
            return { 
                ...state, 
                showRejeitarDialog: action.payload 
            };
        case 'modifica_clean_aprovacao':
            return {
                ...state,
                txtAprovar: '',
                txtRejeitar: '',
                showAprovarDialog: false,
                showRejeitarDialog: false
            };
        default:
            return state;
    }
};
