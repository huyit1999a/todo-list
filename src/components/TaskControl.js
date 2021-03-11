import React, { Component } from 'react';

import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';

class TaskControl extends Component {

    onSearch = (keyword) => {
        this.props.onSearch(keyword);
    }

    onSort = (sort) => {
        this.props.onSort(sort);
    }

    render() {
        return (
            <div className="row mt-15">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSearch onSearch={this.onSearch} />
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSort onSort={this.onSort} />
                </div>
            </div>
        );
    }
}

export default TaskControl;
