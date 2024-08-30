import React, { Component } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

import PropTypes from "prop-types";


export default class AddToDoForm extends Component{

    state = {
        newItem: "",
    };

    ref = React.createRef();

    handleChange = (event) => {
        const newItem = event.target.value;
        this.setState({newItem})
    };

    handleAddToToClick = (event) => {
        event.preventDefault();

        const {newItem} = this.state;
        const {addTodo} = this.props;

        if (!newItem || !newItem.trim()){
            return;
        }

        addTodo(newItem);

        this.setState({newItem: ""});

        this.ref.current.focus();
    };

    render(){
        const {newItem} = this.state;

        return (
            <Form>
            <InputGroup>
            <FormControl 
            onChange={this.handleChange} 
            value={newItem} 
            placeholder="Dodaj novi zadatak"
            autoFocus
            ref={this.ref}
            />
            <Button type="submit" onClick={this.handleAddToToClick} variant="outline-dark">
                Dodaj
            </Button>
            </InputGroup>
        </Form>
        );
    }
}
//addTodo

AddToDoForm.propTypes = {
    addTodo: PropTypes.func,
};