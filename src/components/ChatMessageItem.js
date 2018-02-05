import React from 'react';
import moment from 'moment';

class ChatMessageItem extends React.Component {

    state = {
        editAble: (moment().valueOf() - this.props.messageData.timestamp) < 60000,
        areEditing: false,
        editValue: '',
    };

    componentDidMount() {

        if(this.props.messageData.recipientFUID === this.props.authUserFUID ) {
            if(!this.props.messageData.seen) {
                const updateSeenObj = {
                    ...this.props.messageData,
                    seen : true,
                };
                this.props.updateMessage(updateSeenObj);
            };
        }

        if (this.state.editAble) {
            this.checker = setInterval(() => {
                return this.tick();
            },
                1000
            );
        }
    }

    componentWillUnmount() {
        if (this.checker) {
            clearInterval(this.checker);
        }
    }

    tick() {
        if (this.state.editAble) {
            this.setState({
                editAble: (moment().valueOf() - this.props.messageData.timestamp) < 60000,
            });
        } else {
            clearInterval(this.checker)
        }
    }

    startEdit = () => {
        this.setState(() => ({
            areEditing: true,
            editValue : this.props.messageData.message,
        }));
    };

    handleEditOnChange = (e) => {
        const editValue = e.target.value;
        this.setState(() => ({
            editValue,
        }));
    };

    updateEdit = () => {
        const editedMessage = {
            ...this.props.messageData,
            message : this.state.editValue,
        };
        this.props.updateMessage(editedMessage);

        this.setState(()=>({
            editValue : '',
            areEditing : false,
        }));
    };    


    render() {
        return (
            <div className={this.props.messageData.senderFUID === this.props.authUserFUID ? 'text-right' : 'text-left'}>

                {
                    (this.state.areEditing) ? (
                        <span>
                            <input type="text" value={this.state.editValue} onChange={this.handleEditOnChange} />
                            <button onClick={this.updateEdit}>Done</button>
                        </span>
                    ) : (
                            <div>
                                {this.props.messageData.message}
                                {
                                    ((this.props.messageData.senderFUID === this.props.authUserFUID) && this.state.editAble) &&
                                    (
                                        <button
                                            onClick={this.startEdit}
                                        >
                                            Edit
                                    </button>
                                    )
                                }
                                {
                                    ((this.props.messageData.senderFUID === this.props.authUserFUID) && this.state.editAble) &&
                                    (
                                        <button
                                            onClick={() => this.props.deleteMessage(this.props.messageData.messageFID)}
                                        >
                                            Delete
                                        </button>
                                    )
                                }

                                {this.props.authUserFUID === this.props.messageData.senderFUID && (this.props.messageData.seen ? <p className="text-muted">Seen</p> : <p className="text-muted">Not seen</p>)}
                            </div>
                        )
                }

            </div>
        )
    }
};

export default ChatMessageItem;