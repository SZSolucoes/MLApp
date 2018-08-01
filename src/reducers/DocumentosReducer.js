const INITIAL_STATE = {
    listDocs: [],
    listDocsSelected: [],
    showDocumentsDialog: false,
    auxModal: false,
    itemShow: false,
    items: [],
    appType: '',
    docNumber: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_listdocs_documentos':
            return { 
                ...state, 
                listDocs: action.payload 
            };
        case 'modifica_listdocsselected_documentos':
            return { 
                ...state, 
                listDocsSelected: action.payload 
            };
        case 'modifica_showdocumentsdialog_documentos':
            return { 
                ...state, 
                showDocumentsDialog: action.payload 
            };
        case 'modifica_auxmodal_documentos':
            return { 
                ...state, 
                auxModal: action.payload 
            };
        case 'modifica_itemshow_documentos':
            return { 
                ...state, 
                itemShow: action.payload 
            };
        case 'modifica_items_documentos':
            return { 
                ...state, 
                items: action.payload 
            };
        case 'modifica_apptype_documentos':
            return { 
                ...state, 
                appType: action.payload 
            };
        case 'modifica_docnumber_documentos':
            return { 
                ...state, 
                docNumber: action.payload 
            };
        case 'modifica_clean_documentos':
            return {
                ...state,
                listDocs: [],
                listDocsSelected: [],
                showDocumentsDialog: false,
                auxModal: false,
                itemShow: false,
                items: []
            };
        default:
            return state;
    }
};
