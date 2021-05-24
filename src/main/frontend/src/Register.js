import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet';

class Register extends Component {

    emptyClient = {
        name: '',
        surname: '',
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            client: this.emptyClient,
            errorMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() { }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let client = { ...this.state.client };
        client[name] = value;
        this.setState({ client });
    }

    async onSubmit(event) {
        event.preventDefault();
        const client = this.state.client;
        let apiRes = null;
        try {
            apiRes = await axios.post("/client/register",
                {
                    name: client.name,
                    surname: client.surname,
                    username: client.username,
                    password: client.password,
                });
        } catch (err) {
            this.setState({ 
                errorMessage: err.response.data,
                client: this.emptyClient
            }); 
        }

        if (apiRes != null) {
            this.props.history.push("/bankaccount/" + client.username);
            sessionStorage.setItem("client", JSON.stringify(client));
        }
    }

    render() {
        const {client, errorMessage} = this.state;
    
        return <div>
            <Helmet>
                <title>Inscription KataBank</title>
            </Helmet>
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="name">Nom</Label>
                        <Input type="text" name="name" id="name" value={client.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Nom</Label>
                        <Input type="text" name="surname" id="surname" value={client.surname || ''}
                               onChange={this.handleChange} autoComplete="surname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Pseudo</Label>
                        <Input type="text" name="username" id="username" value={client.username || ''}
                               onChange={this.handleChange} autoComplete="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Mot de passe</Label>
                        <Input type="password" name="password" id="password" value={client.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Annuler</Button>
                    </FormGroup>
                </Form>
                <Alert color="warning">
                    {errorMessage}
                </Alert>
            </Container>
        </div>
    }
}
export default withRouter(Register);