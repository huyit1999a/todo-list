import React, { Component } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

const randomstring = require("randomstring");
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            onDisplayForm: false,
            taskEdit: null,
            filer: {
                name: '',
                status: -1
            },
            keyword: '',
            sort: {
                by: '',
                value: 1
            }
        };
    }

    componentDidMount() {
        if(localStorage && localStorage.getItem('tasks')) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({ tasks: tasks });
        }
    }

    onToggleForm = () => {
        if(this.state.onDisplayForm && this.state.taskEdit !== null) {
            this.setState({
                onDisplayForm: true,
                taskEdit: null
            });
        } else {
            this.setState({
                onDisplayForm: !this.state.onDisplayForm
            })
        } 
    }

    onShowForm = () => {
        this.setState({ 
            onDisplayForm: true
        })
    }

    onCloseForm = () => {
        this.setState({
            onDisplayForm: false
        })
    }

    onSubmit = (data) => {
        const { tasks } = this.state;
        if(data.id === '') {
            data.id = randomstring.generate(8);
            tasks.push(data);
        } else {
            //Editting
            const index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEdit: null
        }
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (index) => {
        const { tasks } = this.state;
        tasks[index].status = !tasks[index].status;
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onDeleteItem = (id) => {
        const { tasks } = this.state;
        
        const index = this.findIndex(id);
        tasks.splice(index, 1);

        this.setState({ tasks: tasks});
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateItem = (id) => {
        const { tasks } = this.state;
        let taskEdit = 0;
        
        const index = this.findIndex(id);
        taskEdit = tasks[index];

        this.setState({
            taskEdit: taskEdit
        })
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
       filterStatus = parseInt(filterStatus, 10);
       
       this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
       })
    }

    findIndex = (id) => {
        const {tasks} = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        })
        return result;
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    onSort = (sort) => {
        this.setState({
            sort: sort
        })
    }

    render() {
        var {tasks, onDisplayForm, taskEdit, filter, keyword, sort} = this.state;

        if(filter) {
            if(filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false);
                }
            })
        }

        if(keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(keyword) !== -1;
            })
        }

        if(sort.by === 'name') {
            tasks.sort((a,b) => {
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            })
        }
        else {
            tasks.sort((a,b) => {
                if(a.status > b.status) return sort.value;
                else if(a.status < b.status) return -sort.value;
                else return 0;
            })
        }

        const formElement = onDisplayForm ? 
                <TaskForm 
                    onSubmit={this.onSubmit}
                    onCloseForm={this.onCloseForm}
                    task={taskEdit}
                /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Khóa Học</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={onDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                        {formElement}
                    </div>
                    <div className={onDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5" />Thêm Khóa Học
                        </button>

                        <TaskControl 
                            onSearch={this.onSearch} 
                            onSort={this.onSort}
                        />
                        
                        <TaskList 
                            tasks={tasks} 
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteItem={this.onDeleteItem}
                            onUpdateItem={this.onUpdateItem}
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
  }
}

export default App;
