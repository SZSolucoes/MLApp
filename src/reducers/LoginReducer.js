const INITIAL_STATE = {
    username: '',
    password: '',
    userToken: '',
    modalVisible: false,
    urlServer: '',
    hidePw: true,
    showLogoLogin: true,
    indicator: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_username_login':
            return { 
                ...state, 
                username: action.payload 
            };
        case 'modifica_password_login':
            return { 
                ...state, 
                password: action.payload 
            };
        case 'modifica_hidepw_login':
            return { 
                ...state, 
                hidePw: action.payload 
            };
        case 'modifica_modalvisible_login':
            return { 
                ...state, 
                modalVisible: action.payload 
            };
        case 'modifica_usertoken_login':
            return { 
                ...state, 
                userToken: action.payload 
            };
        case 'modifica_urlserver_login':
            return {
                ...state,
                urlServer: action.payload,
            };
        case 'modifica_showlogologin_login':
            return {
                ...state,
                showLogoLogin: action.payload,
            };
        case 'modifica_indicator_login':
            return {
                ...state,
                indicator: action.payload,
            };
        case 'modifica_clean_login':
            return {
                ...state,
                username: '',
                password: '',
                modalVisible: false,
                hidePw: true,
                showLogoLogin: true,
                indicator: false
            };
        default:
            return state;
    }
};
