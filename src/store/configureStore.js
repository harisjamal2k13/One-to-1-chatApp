import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import usersReducer from '../reducers/users';
import recipientReducer from '../reducers/recipient';
import messagesReducer from '../reducers/messages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
    const store = createStore(
        combineReducers({
            auth : authReducer,
            users : usersReducer,
            recipient : recipientReducer,
            messages : messagesReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
