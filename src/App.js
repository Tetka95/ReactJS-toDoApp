import { Component } from "react";
import "./App.css";
import VisibilityToolbar from "./components/VisibilityToolbar";
import AddToDoForm from "./components/AddToDoForm";
import { UniqueString } from "unique-string-generator"; 
import TodoList from "./components/ToDoList";

class App extends Component {
  state = {
    visibility: "all",
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  };

  handleVisibilityChange = (visibility) => {
    this.setState({ visibility });
  };

  handleAddTodo = (vrijednost) => {
    console.log("vrijednot: " + vrijednost);

    const {todos} = this.state;
    const newTodo = {
      id: UniqueString(),
      text: vrijednost,
      completed: false,
    };

    this.setState({todos: [...todos, newTodo]});
  };

  //override komponente i metoda se uvijek okida kad se komponenta refresha
  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  handleToggleTodo = (id) => {
    const {todos} = this.state;
    const todo = todos.find((item) => item.id == id);

    todo.completed = !todo.completed;
    this.setState(todos);
  };

  handleRemoveTodo = (id) => {
    const {todos} = this.state;
    const newTodos = todos.filter((todo) => todo.id !== id);

    this.setState({todos: newTodos});
  };


  getVisibleTodos = () => {
      const {todos, visibility} = this.state;

      if (visibility === "all") {
        return todos;
      }

      if (visibility === "active") {
        return todos.filter((todos) => !todos.completed);
      }

      if (visibility === "completed") {
        return todos.filter((todos) => todos.completed);
      }
  };


  handleRemoveCompleted = () => {
    const {todos} = this.state;

    /*
    let newTodos = [];
    for (let i = 0; i < todos.length; i++){
      if(todos[i].completed === false) {
        newTodos.push(todos[i]);
      }
    }

    this.setState({todos: newTodos});
    -->jedan način rješavanja
    */

    let newTodos = todos.filter((todo) => !todo.completed);
    this.setState({todos: newTodos});
  };

  render() {
    const {todos} = this.state;

    const visibleTodos = this.getVisibleTodos();
    const hasCompleted = todos.filter((todos) => todos.completed).length > 0;

    return (
      <div className="App">
        <header className="header">Moji zadaci</header>
        <VisibilityToolbar onVisibilityChange={this.handleVisibilityChange}></VisibilityToolbar>
        <div className="todo-container">
        <AddToDoForm addTodo={this.handleAddTodo}></AddToDoForm>
        <TodoList 
        todos={visibleTodos} 
        toggleTodo={this.handleToggleTodo} 
        removeTodo={this.handleRemoveTodo}
        ></TodoList>
        </div>
        {hasCompleted &&
        <span className="btn-clear-all" onClick={this.handleRemoveCompleted}>Obriši dovršene</span>}
      </div>
    );
  }
}

export default App;
