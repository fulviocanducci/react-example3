import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {  

  constructor(props){
    super(props);

    this.state = {
      todos:[], 
      description:'abc'
    };

    this.loadTodos = this.loadTodos.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.loadTodos();
  }
  saveTodo() {
    if (this.state.description==="")
    {
      alert('Descrição não digitada');
    }
    else {
      let config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        crossDomain: true
      };
      axios.post("http://localhost/p/save.php", {'description': this.state.description}, config)
        .then(result =>{
          this.setState({'todos':result.data});
        });
    }
  }

  loadTodos(){    
    axios.get("http://localhost/p/index.php")
      .then(result => {
        this.setState({'todos':result.data});
      });      
  }

  onInputChange(e) {    
    const name = e.target.name;
    const value = e.target.value; 
    this.setState({
      [name]: value
    });    
  }
  
  render() {
    return (
      <div>
        <h1>Lista de Todo</h1>
        <div>
          <button onClick={(e) => {this.loadTodos()}}>Carregar</button>
        </div>
        <div>
          <input value={this.state.description} onChange={this.onInputChange} name="description" />
          <button onClick={(e) => {this.saveTodo()}}>Salvar</button>
        </div>
        <ul>
          {this.state.todos.map(item => <li key={item.id}>{item.description}</li>)}        
        </ul>
      </div>
    );
  }

}

export default App;
