/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Table, Button, Modal, Checkbox, Input, Row, Col, Select} from 'antd';
import moment from 'moment';

import {SearchCreate} from './create';

import {SearchActions, SearchStore} from './reflux';

import './index.less';

const {Header, Footer, Sider, Content} = Layout;

export class SearchList extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribe = SearchStore.listen(this.onStatusChange.bind(this));

        this.state = {items:[],pagination: {pageSize:5, current:1}, name:'e'};

        this.fetch();
    }

    onStatusChange(action, data) {
        if (action === 'list') {
            console.log('list complete > ', data);

            const pagination = { ...this.state.pagination };
            pagination.total = data.pagination.total;

            this.setState({items:data.items, pagination:pagination});
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    columns = [{
        title: 'Name',
        dataIndex: 'name'
    }];

    fetch = ()=>{
        SearchActions.list(this.state.name, this.state.pagination.pageSize, this.state.pagination.current);
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.state.pagination.current = pagination.current;
        this.fetch();
    }

    render() {
        return (
            <Layout className="search">
                <div className="searchbar">
                    <SearchCreate />
                </div>

                <div>haha</div>
                <Table
                    pagination={this.state.pagination}
                    rowKey={record => record._id}
                    onChange={this.handleTableChange}
                    dataSource={this.state.items} columns={this.columns} />

            </Layout>
        );
    }
}