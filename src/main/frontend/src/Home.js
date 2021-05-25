import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import {
    Button, Container, Card, CardBody,
    CardTitle, CardSubtitle, Row, Col, Modal,
    ModalHeader, ModalBody, Form, FormGroup, 
    Input, Label, Table, Alert
} from 'reactstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet';



class Home extends Component {

    emptyClient = {
        id: null,
        name: '',
        surname: '',
        username: '',
        password: '',
        currentBalance: null,
        creationDate: null
    };

    emptyOperation = {
        client: null,
        date: null,
        amount: null,
        balanceAfterOp: null,
        type: null
    }

    constructor(props) {
        super(props);
        this.state = {
            client: this.emptyClient,
            operation: this.emptyOperation,
            openModal: false,
            modalTitle: '',
            operations: [], 
            errorMessage: ''
        };
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.onSubmitOperation = this.onSubmitOperation.bind(this);
        this.fetchClientInfos = this.fetchClientInfos.bind(this);
        this.fetchOperations = this.fetchOperations.bind(this);

    }


    componentDidMount() {
        var that = this;
        setTimeout(function() {
            var token = JSON.parse(sessionStorage.getItem('client')); 
            if(token == null || token.username !== that.props.match.params.username){
                that.props.history.push("/");
            } else {
                that.fetchClientInfos();
                that.fetchOperations();
            }
        }, 50);
    }
    

    /**
     * Fetch client informations
     */
    fetchClientInfos() {
        axios.get(`/client/${this.props.match.params.username}`)
            .then(res => this.setState({ client: res.data }))
            .catch(err => console.log("Error during GET request", err));
    }

    /**
     * Fetch operations list
     */
    fetchOperations() {
        axios.get(`/operations/${this.props.match.params.username}`)
            .then(res => this.setState({ operations: res.data }))
            .catch(err => console.log("Error during GET request", err));
    }

    /**
     * Set modal title and open it
     * @param {} event 
     */
    onOpenModal = (event) => {
        const id = event.target.id;
        if (id === "deposit") {
            this.setState({ modalTitle: "Dépôt" });
        } else {
            this.setState({ modalTitle: "Retrait" });
        }
        this.setState({ 
            openModal: true,
            operation: this.emptyOperation
        });
    }

    /**
     * Close modal
     */
    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    /**
     * Handle amount change in the form
     * @param {} event 
     */
    handleChangeAmount(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let operation = { ...this.state.operation };
        operation[name] = value;
        this.setState({ operation });
    }

    /**
     * Handle operation submit requests
     * @param {*} event 
     */
    async onSubmitOperation(event) {
        event.preventDefault();
        const operationType = this.state.modalTitle === "Dépôt" ? "deposit" : "withdrawal";
        try {
            await axios.post("/operations/" + operationType,
                {
                    client: {
                        username: this.props.match.params.username
                    },
                    amount: this.state.operation.amount
                }).then(res => {
                    this.setState({ 
                        errorMessage: res.data,
                    });
                });
        } catch (err) {
            this.setState({ 
                errorMessage: err.response.data,
            });
        }
        this.fetchClientInfos();
        this.fetchOperations();
    }


    render() {
        const { client, isLoading, modalTitle, operation, openModal, operations, errorMessage } = this.state;

        if (isLoading) {
            return <p>Chargement...</p>;
        }
        const currentBalance = client.currentBalance;

        const operationList = operations.map(operation => {
            return <tr >
                <td style={{ whiteSpace: 'nowrap' }}>{operation.type}</td>
                <td>{operation.date}</td>
                <td>{operation.amount}</td>
                <td>{operation.balanceAfterOp}</td>
            </tr>
        });
        return (
            <div>
                <Helmet>
                    <title>Votre compte KataBank</title>
                </Helmet>
                <NavBar />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <div>
                                <Card>
                                    <CardBody className="text-center">
                                        <CardTitle tag="h1">Solde: {currentBalance}€</CardTitle>
                                        <Alert color="warning">
                                            {errorMessage}
                                        </Alert>
                                        <CardSubtitle tag="h4" className="mb-2 text-muted">Opérations</CardSubtitle>
                                        <Row>
                                            <Col sm="6">
                                                <Button onClick={this.onOpenModal} id="deposit" color="primary" className="btn-block">Dépôt</Button>
                                            </Col>
                                            <Col sm="6">
                                                <Button onClick={this.onOpenModal} id="withdrawal" color="secondary" className="btn-block">Retrait</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row className="justify-content-md-center">
                        <Col sm="9" >
                            <h3 className="text-center">Historiques des opérations</h3>
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Date d'exécution</th>
                                        <th>Montant</th>
                                        <th>Solde après opération</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operationList}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>


                    <div>
                        <Modal isOpen={openModal} toggle={this.onCloseModal} >
                            <ModalHeader toggle={this.onCloseModal}>{modalTitle}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.onSubmitOperation}>
                                    <FormGroup>
                                        <Label for="amount">Montant</Label>
                                        <Input type="number" name="amount" id="amount" value={operation.amount || null}
                                            onChange={this.handleChangeAmount} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button onClick={this.onCloseModal} color="primary" type="submit">Confirmer</Button>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
                </Container>
            </div>
        );
    }
}
export default Home;