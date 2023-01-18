import React, { Component } from 'react';
import EditTask from './Edited/editTask';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      todos: [],
      value: "",
      isEdited: false,
      editValue: {},
      taskDone: false
    }
  }

  addTaskToList = (e) => {

    let data = {
      name: this.state.value,
      id: Date.now()
    }

    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(data) });
      this.setState({ value: "" });
    }


    const placeholderValue = document.getElementById("placeHolder");
    placeholderValue.value = "";

  }

  inputData = (e) => {
    this.setState({ value: e.target.value });
  }

  deleteItems = (data) => {

    let index = -1;
    const arr = this.state.todos;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === data) {
        index = i;
      }
    }

    if (index > -1) {
      const newArr = arr.splice(index, 1);
    }

    this.setState({ todos: arr });
  }

  editItems = (data) => {
    this.setState({ editValue: data });

    this.setState({ isEdited: true });
  }

  onChangeEdit = (data) => {
    console.log("onChangeEdit in App.js", data);

    let arr = this.state.todos;
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.state.editValue.id) {
        index = i;
      }
    }

    let editArrValue = this.state.editValue;
    editArrValue.name = data;

    if (index > -1) {
      arr[index] = editArrValue;
    }

    this.setState({ todos: arr });
    this.setState({ isEdited: !this.state.isEdited });

  }

  checkBox = (e) => {
    console.log("this console", e.target.checked);
    console.log(e.target.parentElement.parentElement.parentElement);
    if(e.target.checked){
      e.target.parentElement.querySelector("#valueName").classList.add("selected");
      e.target.parentElement.parentElement.parentElement.querySelector("#editButton").classList.add("disableBtn")
      e.target.parentElement.parentElement.parentElement.querySelector("#deleteButton").classList.add("disableBtn")
    }
    else{
      e.target.parentElement.querySelector("#valueName").classList.remove("selected");
      e.target.parentElement.parentElement.parentElement.querySelector("#editButton").classList.remove("disableBtn")
      e.target.parentElement.parentElement.parentElement.querySelector("#deleteButton").classList.remove("disableBtn")
    }
  }

  render() {

    return (
      <>
        {
          this.state.isEdited === false ?
            <div className='main'>
              <h2 className='heading'> To Do List Apps </h2>
              <div className='input'>
                <input className='placeholder' placeholder='Add Your Tasks' onChange={this.inputData} id="placeHolder" />
                <button className='btn btn-primary' type='button' onClick={this.addTaskToList} >ADD TASK</button>
              </div>
              <ul className='task-box'>
                {
                  this.state.todos.map((val, index) => {
                    return (
                      <li className='task'>
                        <div className='left'>
                          <label for={index}>
                            <input type='checkbox' id={index} onClick={this.checkBox} />
                            <p id='valueName'>{val.name}</p>
                          </label>
                        </div>

                        <div className='buttons'>
                          <button type='button' id='editButton' className='btn btn-info' onClick={() => { this.editItems(val) }} >Edit</button>
                          <button type='button' id='deleteButton' className='btn btn-danger' onClick={() => { this.deleteItems(val.name) }} >Delete</button>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>

            </div>
            :
            <EditTask preState={this.state} onChangeEdit={this.onChangeEdit} />
        }
      </>
      // return close
    );
  }
}

export default App;