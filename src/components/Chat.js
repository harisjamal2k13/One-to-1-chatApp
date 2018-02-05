import React from 'react';
import { connect } from 'react-redux';
import { Container, Col } from 'reactstrap';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import { setFUID } from '../actions/recipient';

class Chat extends React.Component {

    componentDidMount() {
        this.props.setRecipientFUID(this.props.match.params.FUID);
    };

    render() {
        return (
            <Container className="py-5">
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
                    <ChatMessages />
                    <ChatForm />
                </Col>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRecipientFUID: (recipientFUID) => dispatch(setFUID(recipientFUID))
    }
};


export default connect(undefined, mapDispatchToProps)(Chat);