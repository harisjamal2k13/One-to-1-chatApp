import { firebase } from '../firebase/firebase';

export const startAddMessages = (messageObj) => {
    return () => {
        return firebase.database().ref('messages').push(messageObj);
    };
};

// Getting messages from firebase

const getUserMessages = (userMessagesArray) => {
    return {
        type : 'GET_USER_MESSAGES',
        userMessagesArray,
    }
};

export const startGetUserMessages = (authUserFUID) => {
    return (dispatch) => {
        return firebase.database().ref('messages').on('value', (messages)=>{
            const userMessages = [];
            messages.forEach((message)=>{
                if (message.val().senderFUID === authUserFUID || message.val().recipientFUID === authUserFUID) {
                    userMessages.push({
                        ...message.val(),
                        messageFID : message.key,
                    });
                }
            });
            dispatch(getUserMessages(userMessages));
        })
    };
};

// Delete message from firebase 

export const deleteMessage = (messageFID) => {
    return () => {
        return firebase.database().ref(`messages/${messageFID}`).remove(); 
    }
}


export const updateMessage = (updatedMessageObj) => {
    return () => {
        return firebase.database().ref(`messages/${updatedMessageObj.messageFID}`).update(updatedMessageObj); 
    }
}