import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, CardText, Col } from 'reactstrap';

const AllUsersList = (props) => {
    return (
        props.allUsers.map((user) => {
            return (
                <Col key={user.FUID}>
                    <Card body outline color="primary" className="m-2 text-center">
                        <CardText className="lead">{user.userName}</CardText>
                        <Button
                            color="primary"
                            size="md" block
                            tag={Link}
                            to={`/chat/${user.FUID}`}
                        >
                            Open Chat
                        </Button>
                    </Card>
                </Col>
            )
        })
    )
};



export default AllUsersList;