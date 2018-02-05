const defaultState = {
    allMessages : [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_USER_MESSAGES':
            return {
                ...state,
                allMessages: [...action.userMessagesArray],
            };
        default:
            return state;
    };
};

// const defaultState = [];

// export default (state = defaultState, action) => {
//     switch (action.type) {
//         case 'GET_USER_MESSAGES':
//             return [
//                ...action.userMessagesArray,
//             ];
//         default:
//             return state;
//     };
// };
