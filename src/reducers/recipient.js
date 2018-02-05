const defaultState = {
    FUID : '',
    messages : [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_FUID':
            return {
                ...state,
                FUID : action.FUID,
            };
        default:
            return state;
    };
};
