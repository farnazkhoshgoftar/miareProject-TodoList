import React, { Component } from "react";
import "./todoList.css";

class TodoList extends Component {
  state = {
    inputValue: "",
    todos: [],
  };

  inputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addTodo = () => {
    this.setState((prevState) => ({
      todos: [
        ...prevState.todos,
        { text: prevState.inputValue, show: false, id: Date.now() },
      ],
    }));
    this.setState({ inputValue: "" });
  };

  removeTodo = (i) => {
    this.setState((prevState) => {
      return {
        todos: [
          ...prevState.todos.slice(0, i),
          ...prevState.todos.slice(i + 1),
        ],
      };
    });
  };

  showModal = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo, i) => {
          if (todo.id === id) {
            return { ...todo, show: !todo.show };
          } else return todo;
        }),
      };
    });
  };
  hideModal = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo, i) => {
          if (todo.id === id) {
            return { ...todo, show: !todo.show };
          } else return todo;
        }),
      };
    });
  };

  message = () => {
    if (this.state.todos.length > 0 && this.state.todos.length < 3) {
      return <div>done</div>;
    } else if (this.state.todos.length >= 3 && this.state.todos.length < 10) {
      return <div> almost done</div>;
    } else if (this.state.todos.length >= 10) {
      return <div> too much</div>;
    }
  };
  render() {
    return (
      <div className="todoContainer">
        <div className='message'>{this.message()}</div>
        <div className="formBox">
          <input
            value={this.state.inputValue}
            onChange={(e) => this.inputChange(e)}
          />
          <button onClick={this.addTodo}>Add todo</button>
        </div>
        <ul>
          {this.state.todos.map((item, index) => (
            <li className="todoBox">
              <span key={item.id}>{item.text}</span>
              <button onClick={() => this.showModal(item.id)}>delete</button>
              {item.show ? (
                <div className="modal">
                  <div className="modalContent">
                    <p>Are you sure you want to delete this todo?</p>
                    <button
                      className="no"
                      onClick={() => this.hideModal(item.id)}
                    >
                      No
                    </button>
                    <button
                      className="yes"
                      onClick={() => this.removeTodo(index)}
                    >
                      yes
                    </button>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default TodoList;
