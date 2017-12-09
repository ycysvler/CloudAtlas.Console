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

        SearchActions.list();
    }

    onStatusChange(action, data) {
        if (action === 'list') {
            console.log('list complete > ', data);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Layout className="search">
                <div className="searchbar">
                    <SearchCreate />
                </div>

                <div>haha</div>

            </Layout>
        );
    }
}