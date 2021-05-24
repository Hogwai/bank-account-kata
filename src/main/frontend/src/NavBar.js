import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        window.sessionStorage.removeItem("client");
        this.props.history.push("/");
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to={window.location.pathname}>Accueil</NavbarBrand>
            <Button className="ml-auto" onClick={this.onLogout} variant="outline-success">Déconnexion</Button>
        </Navbar>;
    }
}
export default withRouter(NavBar);