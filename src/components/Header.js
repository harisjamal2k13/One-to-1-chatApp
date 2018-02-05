import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogoutAction } from '../actions/auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink as BSNavLink,
    Container,
} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
                    <Container>
                        <NavbarBrand to="/dashboard" exact={true} tag={NavLink}>TickTalk - <span className="lead"> The chat app </span></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <BSNavLink to="/dashboard" exact={true} tag={NavLink}> Users </BSNavLink>
                                </NavItem>
                                <NavItem>
                                    <BSNavLink href='' onClick={this.props.startLogoutAction}> Logout </BSNavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogoutAction: () => dispatch(startLogoutAction()),
    };
};


export default connect(undefined, mapDispatchToProps)(Header);








