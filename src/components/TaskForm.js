import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.task) {
            if(props.task.id !== state.id){
                return {
                    id: props.task.id,
                    name: props.task.name,
                    status: props.task.status
                }
            }
        }else{
            if(state.id){
                return {
                    id: '',
                    name: '',
                    status: true
                }
            }
        }
        return null
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    };

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        
        if(name === 'status') {
            value = target.value === 'true' ? true : false;
        }

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.onClear();
        this.onCloseForm();
        this.props.onSubmit(this.state);
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        const { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id === '' ? 'Thêm Khóa Học' : 'Cập Nhật Khóa Học'}
                        <span className="fa fa-times-circle text-right close-form" onClick={this.onCloseForm}></span>    
                    </h3>  
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select
                        className="form-control"
                        required="required"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">{id === '' ? 'Thêm mới' : 'Lưu lại'}</button>&nbsp;
                        {/* <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.onClear}
                        >
                            Hủy Bỏ
                        </button> */}
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
