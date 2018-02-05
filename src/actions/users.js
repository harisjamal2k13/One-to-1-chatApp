import { firebase } from '../firebase/firebase';

const getAllUsersAction = (allUsersArray) => {
    return {
        type: 'GET_ALL_USERS',
        allUsersArray,
    }
};

export const startGetAllUsersAction = (authUserFUID) => {
    return (dispatch, getState) => {
        return firebase.database().ref('/users').on('value', (users) => {
            const allUsersArray = [];
            users.forEach((user) => {
                if (authUserFUID !== user.val().FUID) {
                    allUsersArray.push(user.val());
                    console.log(allUsersArray)
                }
            });
            dispatch(getAllUsersAction(allUsersArray))
        });
    };
}