import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { setAuthStatusAction, startGetAuthUserData } from './actions/auth';
import { startGetAllUsersAction } from './actions/users'
import { startGetUserMessages} from './actions/messages';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Loader.css'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// store.subscribe(() => {
//     console.log(store.getState())
// });

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    };
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

// Firebase auth running render

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(setAuthStatusAction(true));
        store.dispatch(startGetUserMessages(user.uid));
        store.dispatch(startGetAllUsersAction(user.uid));
        store.dispatch(startGetAuthUserData(user.uid)).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            };
            ReactDOM.render(jsx, document.getElementById('root'));
        });
    }
    else {
        store.dispatch(setAuthStatusAction(false));
        renderApp();
        history.push('/')
    }
});

registerServiceWorker();
