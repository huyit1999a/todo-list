import React, { Component } from 'react';

class TaskSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    enterSearch = (event) => {
        if(event.keyCode === 13) {
            this.onSearch();
        }
    }

    render() {
        const { keyword } = this.state;
        return (
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nhập từ khóa..." 
                    name="keyword"
                    value={ keyword }
                    onChange={this.onChange}
                    onKeyUp={this.enterSearch}
                />
                <span className="input-group-btn">
                    <button 
                        className="btn btn-primary" 
                        type="submit"
                        onClick={this.onSearch}
                    >
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                </span>
            </div>
        );
    }
}

export default TaskSearch;
