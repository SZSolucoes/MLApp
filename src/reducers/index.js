import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import DocumentosReducer from './DocumentosReducer';
import AprovacaoReducer from './AprovacaoReducer';

export default combineReducers({
    LoginReducer,
    DocumentosReducer,
    AprovacaoReducer
});
