/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Table, Button, Modal, Checkbox, Input, Row, Col, Select} from 'antd';
import moment from 'moment';

import {SearchCreate} from './create';

import {SearchActions, SearchStore} from './reflux';

import './index.less';
const Search = Input.Search;
const {Header, Footer, Sider, Content} = Layout;

export class SearchList extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribe = SearchStore.listen(this.onStatusChange.bind(this));

        this.state = {
            items:[],
            pagination: {pageSize:5, current:1},
            name:''
        };

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
    onQueryChange = (e) => {
        var value = e;
        console.log('e=>',e);
        this.state.name = value;
        this.fetch();

    }
    getColumn = () => {
        var columns = [];

            columns.push({
                title: 'name', dataIndex: 'name', key: 'name',
            });

        columns.push({
            title: 'id', dataIndex: '_id', key: '_id'
        });

        columns.push({
            title: 'createtime', dataIndex: 'createtime', key: 'createtime',
            render: function (text, record, index) {
                return <div>{new moment(record.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
            }
        });

        columns.push({
            title: 'images', dataIndex: 'images', key: 'images',
            render: function (text, record, index) {
                return <span>{record.images.join(' , ')}</span>
            }
        });
        columns.push({
            title: 'imagetypes', dataIndex: 'imagetypes', key: 'imagetypes',
            render: function (text, record, index) {
                return <span>{record.imagetypes.join(' , ')}</span>
            }
        });
        columns.push({
            title: 'featuretypes', dataIndex: 'featuretypes', key: 'featuretypes',
            render: function (text, record, index) {
                return <span>{record.featuretypes.join(' , ')}</span>
            }
        });

        columns.push({
            title: 'progress', dataIndex: 'progress', key: 'progress',
            render: function (text, record, index) {
                return <span>{record.progress * 100}%</span>
            }
        });

        return columns;
    }


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
                <Layout className="monitor" style={{padding: '16px'}}>
                    <div  style={{"background": "#fff", height: 'auto'}}>
                        <Search id="name"
                               onSearch={this.onQueryChange}
                               placeholder="输入Name关键字查询"
                                enterButton
                        />

                    </div>
                    <Table
                        pagination={this.state.pagination}
                        rowKey={record => record._id}
                        onChange={this.handleTableChange}
                        dataSource={this.state.items} columns={this.getColumn()} />
                </Layout>
            </Layout>
        );
    }
}