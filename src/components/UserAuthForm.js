import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Col, FormGroup, Label, Input, Container, Card, Button, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { startSignupAction, resetAuthStateAction, startLoginAction } from '../actions/auth';
import LoaderGif from '../images/loader.gif';

class UserAuthForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.case === "Signup") {
            this.state = {
                userName: '',
                userEmail: '',
                userPassword: '',
            };
        } else if (this.props.case === 'Login') {
            this.state = {
                userEmail: '',
                userPassword: '',
            };
        }
    };


    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (this.props.case === "Signup") {
            this.props.startSignupAction(this.state);
        } else if (this.props.case === 'Login') {
            this.props.loginAction(this.state);
        }
    }

    render() {
        return (
            <Container className="py-5">
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
                    <h1 className="display-4 text-center">TickTalk - Chat App</h1>
                    <Card outline color="primary">
                        <CardHeader className="text-center" style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }}>{this.props.case} Form</CardHeader>
                        <CardBody >

                            <Form onSubmit={this.handleOnSubmit}>
                                <FormGroup>
                                    <Label for="userEmail">Email</Label>
                                    <Input value={this.state.userEmail} onChange={this.inputHandler} type="email" name="userEmail" id="userEmail" placeholder="Please enter email" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="userPassword">Password</Label>
                                    <Input value={this.state.userPassword} onChange={this.inputHandler} type="password" name="userPassword" id="userPassword" placeholder="Please enter password" required />
                                </FormGroup>


                                {/* Signup fields!! */}
                                
                                {
                                    this.props.case === "Signup" ? (
                                    <FormGroup>
                                        <Label for="userName">Username</Label>
                                        <Input value={this.state.userName} onChange={this.inputHandler} type="text" name="userName" id="userName" placeholder="Please enter a username" required />
                                    </FormGroup>
                                ) : undefined
                                }

                                {
                                    this.props.hasErrored ? (
                                        <Alert color="danger">
                                            {this.props.error.message}
                                        </Alert>
                                    ) : undefined
                                }

                                {
                                    this.props.isProcessing ? (
                                        <img className="loader" src={LoaderGif} alt="A loader" />
                                    ) : undefined
                                }

                                <Button color="primary" className="float-right">
                                    {this.props.case}
                                </Button>
                            </Form>

                        </CardBody>
                        <CardFooter style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }} className="text-center">
                            {
                                this.props.case === "Signup" ? (<Link to="/" onClick={this.props.resetAuthState} className="text-white">Already have an account? Login here!</Link>) : undefined
                            }
                             
                            {
                                this.props.case === "Login" ? (<Link to="/signup" onClick={this.props.resetAuthState} className="text-white">Don't have an account? Signup here!</Link>) : undefined
                            }
                        </CardFooter>
                    </Card>
                </Col>
                <p className="text-center text-muted">By Ma'aaz A. Shaheen</p>
            </Container>
        )
    };
}


const mapStateToProps = (state) => ({
    hasErrored: state.auth.hasErrored,
    isProcessing: state.auth.isProcessing,
    error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    startSignupAction: (userObj) => dispatch(startSignupAction(userObj)),
    loginAction: (userObj) => dispatch(startLoginAction(userObj)),
    resetAuthState: () => dispatch(resetAuthStateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthForm);