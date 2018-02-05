import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import AllUsersList from './AllUsersList'
import LoaderGif from '../images/loader.gif';

const Users = (props) => {
    return (
        <div>
            <h1 className="display-4 text-center">All Users</h1>
            {
                (props.allUsers.length === 0) ? (
                    <div className="text-center py-5 ">
                        <img src={LoaderGif} alt='A loader.' />
                    </div>
                ) : (

                        <Row className="my-4">
                            <AllUsersList allUsers={props.allUsers} />
                        </Row>
                    )
            }
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        allUsers: state.users.allUsers,
    };
}


export default connect(mapStateToProps)(Users);