const defaultState = {
    authUserData: {},
    isProcessing: false,
    hasErrored: false,
    error: {},
    isAuthenticated: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_AUTH_STATUS':
            return {
                ...state,
                isAuthenticated: action.boolean,
            };
        case 'GET_AUTH_USER_DATA' :
            return {
                ...state,
                authUserData : action.authUserData,
            }
        case 'RESET':
            return {
                ...state,
                isProcessing: false,
                hasErrored: false,
                error: {},
            };
        case 'START':
            return {
                ...state,
                isProcessing: true,
                hasErrored: false,
                error: {},
            };

        case 'SUCCESS':
            return {
                ...state,
                isProcessing: false,
                hasErrored: false,
                error: {},
            };

        case 'FAILED':
            return {
                ...state,
                error: action.error,
                isProcessing: false,
                hasErrored: true,
            };

        default:
            return state;
    };
};
