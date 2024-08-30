import ToDoItem from "./ToDoItem";
import PropTypes from "prop-types";

export default function TodoList ({todos, toggleTodo, removeTodo}) {
    return (
    <div>
        {todos.map((todo) => {
            return (
            <ToDoItem 
            todo={todo} 
            key={todo.id} 
            toggleTodo={toggleTodo} 
            removeTodo={removeTodo}></ToDoItem>)
        })}
    </div>
    );
}

ToDoItem.propTypes = {
    toggleTodo: PropTypes.func,
    todo: PropTypes.object,
    removeTodo: PropTypes.func,
};