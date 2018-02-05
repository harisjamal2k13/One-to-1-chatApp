import { firebase } from '../firebase/firebase';

// Set Auth Status from index.js

export const setAuthStatusAction = (boolean) => {
    return {
        type: 'SET_AUTH_STATUS',
        boolean,
    }
};

// Get User Data from firebase

const getAuthUserData = (authUserData) => {
    return {
        type: 'GET_AUTH_USER_DATA',
        authUserData,
    }
}

export const startGetAuthUserData = (FUID) => {
    return (dispatch, getState) => {
        return firebase.database().ref(`/users/${FUID}`).once('value')
            .then((snapshot)=>{
                const authUserData = snapshot.val();
                dispatch(getAuthUserData(authUserData));
            })
        ;
    }
};

// Logout from Firebase

export const startLogoutAction = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

// User Input Actions 

const startAuthAction = () => {
    return {
        type: 'START',
    };
}

const successAuthAction = () => {
    return {
        type: 'SUCCESS',
    };
}

const failedAuthAction = (error) => {
    return {
        type: 'FAILED',
        error,
    };
}

export const resetAuthStateAction = () => {
    return {
        type: 'RESET',
    }
};

// Login action

export const startLoginAction = (userObj) => {
    return (dispatch, getState) => {
        dispatch(startAuthAction());
        return (
            firebase.auth().signInWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
                .then((snapshot) => {
                    dispatch(successAuthAction());
                })
                .catch((error) => {
                    dispatch(failedAuthAction(error));
                })
        )

    };
};

// Signup Action 

export const startSignupAction = (userObj) => {
    return (dispatch) => {
        dispatch(startAuthAction());
        return (
            firebase.auth().createUserWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
                .then((snapshot) => {
                    dispatch(successAuthAction());
                    delete userObj.userPassword;
                    firebase.database().ref(`/users/${snapshot.uid}`).set({...userObj, FUID : snapshot.uid});
                })
                .catch((error) => {
                    dispatch(failedAuthAction(error))
                })
        )
    }
};
