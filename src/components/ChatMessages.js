import React from 'react';
import { connect } from 'react-redux';
import ChatMessageItem from './ChatMessageItem'
import { deleteMessage, updateMessage } from '../actions/messages';

const ChatMessages = (props) => {
    return ( props.messages.map((message) => {
            if ((message.recipientFUID === props.recipientFUID && message.senderFUID === props.authUserFUID) || (message.recipientFUID === props.authUserFUID && message.senderFUID === props.recipientFUID)) {
                return (
                    <ChatMessageItem
                        authUserFUID={props.authUserFUID}
                        messageData={message}
                        deleteMessage={props.deleteMessage}
                        updateMessage={props.updateMessage}
                        key={message.messageFID}
                    />
                )
            }
        })

    )
};

const mapStateToProps = (state) => {
    return {
        authUserFUID: state.auth.authUserData.FUID,
        recipientFUID: state.recipient.FUID,
        messages: state.messages.allMessages,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        deleteMessage: (messageFUID) => dispatch(deleteMessage(messageFUID)),
        updateMessage: (messageFUID) => dispatch(updateMessage(messageFUID))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);