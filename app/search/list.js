/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Table, Button, Modal, Checkbox, Input, Row, Col, Select} from 'antd';
import moment from 'moment';

import {SearchCreate} from './create';

import './index.less';

const {Header, Footer, Sider, Content} = Layout;

export class SearchList extends React.Component {
    constructor(props) {
        super(props);
    }

    onStatusChange(action, data) {

    }

    componentWillUnmount() {

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