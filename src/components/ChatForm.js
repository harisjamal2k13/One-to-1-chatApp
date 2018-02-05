import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startAddMessages } from '../actions/messages';

class ChatForm extends React.Component {
    state = {
        message: '',
    };

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        const recipientFUID = this.props.recipientFUID;
        const senderFUID = this.props.senderFUID;
        const messageObj = {
            recipientFUID,
            message: this.state.message,
            senderFUID,
            timestamp: moment().valueOf(),
            seen: false,
        };
        this.props.addMessage(messageObj);
        this.setState(()=>({
            message: '',
        }));
    };
    
    render() {
        return (
                <form onSubmit={this.handleOnSubmit} >
                    <input type="text" name="message" value={this.state.message} onChange={this.inputHandler} />
                    <button type="submit">Submit</button>
                </form>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        senderFUID: state.auth.authUserData.FUID,
        recipientFUID : state.recipient.FUID,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage : (messageObj) => dispatch(startAddMessages(messageObj)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);