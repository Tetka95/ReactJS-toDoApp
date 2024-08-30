import { Component } from "react";
import { Form, ListGroupItem } from "react-bootstrap/esm";
import PropTypes from "prop-types";


export default class ToDoItem extends Component {

    handleToggleTodoClick = () => {
        const {toggleTodo, todo} = this.props;
        toggleTodo(todo.id); 
    };

    handleRemoveTodoClick = () => {
        const {todo, removeTodo} = this.props;
        removeTodo(todo.id);
    };

    render() {
        const {todo} = this.props;
        const textClass = todo.completed ? "todo-item_completed" : null;
        
        return (
        <div>
            <ListGroupItem className="todo-item">
            <span className="todo-item_item" onClick={this.handleToggleTodoClick}>
                <Form.Check readOnly inline checked={todo.completed}></Form.Check>
                    <span className={textClass}>
                        {todo.text}
                    </span>
            </span>

            <span className="todo-idem_delete-button" onClick={this.handleRemoveTodoClick}>x</span>
            </ListGroupItem> 
        </div>
        );
    }
}

ToDoItem.propTypes = {
    toggleTodo: PropTypes.func,
    todo: PropTypes.object,
    removeTodo: PropTypes.func,
};