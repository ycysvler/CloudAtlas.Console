/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Input, Button, Upload, message, Icon, Col, Select, Row} from 'antd';
import moment from 'moment';
import {SearchActions, SearchStore} from './reflux';
import {SigninStore} from '../signinflux';

import Config from 'config';

const {Header, Footer, Sider, Content} = Layout;
const Option = Select.Option;

/*const children = ['text1','text2'];*/
export class SearchCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SearchStore.listen(this.onStatusChange.bind(this));

        this.state = {type: [], images: []};
    }

    onStatusChange(action, data) {
        if (action === 'create') {
            console.log('create complete > ', data);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onSearch = () => {
        console.log('onClick', this.state.name, this.state.type);

        SearchActions.create(
            this.state.name,
            this.state.type,
            this.state.images,
            ["deep", "color", "shape", "lbp"]
        );
    }

    onNameChange = (e) => {
        this.state.name = e.target.value;
    }
    onTypeChange = (e) => {
        this.state.type = e;
    }

    onChange = (info, value) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            var images = this.state.images;
            images.push(info.file.name);

            console.log('info.file.response > ', info.file.name);
            console.log(images);
            this.setState({"images": images});

            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" span={1}>
                        <div className="gutter-box">name:</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <Input onChange={this.onNameChange}/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={1}>
                        <div className="gutter-box">type;</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box"><Select
                            mode="multiple"
                            onChange={this.onTypeChange}
                            placeholder="Please select type"
                            style={{width: '100%'}}>

                            <Option value="test1">test1</Option>
                            <Option value="test2">test2</Option>
                            <Option value="test3">test3</Option>
                            <Option value="test4">test4</Option>
                        </Select></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            {this.state.images.map(function (item, index) {
                                return <b key={index}>{item}</b>
                            })}
                            <Upload
                                onChange={this.onChange}
                                headers={{appid:SigninStore.ent.appid}}
                                name='file'
                                action={Config.url + '/api/search/images'}
                            >
                                <Button>
                                    <Icon type="upload"/> Click to Upload
                                </Button>

                            </Upload></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><Button onClick={this.onSearch}>查询</Button></div>
                    </Col>
                </Row>
            </div>
        );
    }
}