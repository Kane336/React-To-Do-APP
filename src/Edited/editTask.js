import React, { Component } from 'react';
import '../App.css';

class EditTask extends Component {



    constructor(props) {
        super(props);

        this.state = {
            data: this.props.preState,
            editData: ""
        }
    }

    componentDidMount() {
        this.setState({ editData: this.state.data.editValue.name });
    }


    editTask = (data) => {
        console.log(data);
        this.props.onChangeEdit(data);
    }

    inputData = (e) => {
        this.setState({ editData: e.target.value });
    }

    render() {
        console.log(this.state.data);
        return (
            <div className='main'>
                <h2 className='heading'> To Do List Apps </h2>
                <div className='input'>
                    <input className='placeholder' placeholder="Edit Task" defaultValue={this.state.data.editValue.name} id="placeHolder" onChange={this.inputData} />
                    <button className='btn btn-primary' type='button'  onClick={(e) => { this.editTask(this.state.editData) }} >EDIT TASK</button>
                </div>
            </div>
        )
    }
}

export default EditTask;
