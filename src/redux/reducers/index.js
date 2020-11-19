import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiStatusReducer from './apiStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    apiStatusReducer
});

export default rootReducer;