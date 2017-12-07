/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Input, Button, Upload, message, Icon, Col, Select} from 'antd';
import moment from 'moment';
import {SearchActions, SearchStore} from './reflux';

import Config from 'config';

const {Header, Footer, Sider, Content} = Layout;

export class SearchCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SearchStore.listen(this.onStatusChange.bind(this));

        this.state = {type:[],images:[]};
    }

    onStatusChange(action, data) {
        if(action){
            console.log('create complete > ', data);
        }
    }

    componentWillUnmount() {
    }

    onSearch=()=>{
        console.log('onClick',this.state.name,this.state.type);

        SearchActions.create(
            this.state.name,
            this.state.type,
            this.state.images,
            ["deep","color","shape","lbp"]
        );
    }

    onNameChange=(e)=>{
        this.state.name = e.target.value;
    }
    onTypeChange=(e)=>{
        this.state.type = [e.target.value];
    }

    onChange=(info)=> {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            var images = this.state.images;
            images.push(info.file.name);

            console.log('info.file.response > ', info.file.name);
            console.log(images);
            this.setState({"images":images});

            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        return (
            <div>
                <div>name:<Input onChange={this.onNameChange} /></div>
                <div>type;<Input onChange={this.onTypeChange} /></div>
                <div>
                    {this.state.images.map(function (item,index) {
                        return <b key={index}>{item}</b>
                    })}
                    <Upload
                    onChange={this.onChange}
                    name='file'
                    action={Config.url + '/api/search/images'}
                >
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>

                </Upload></div>

                <Button onClick={this.onSearch}>查询</Button>
            </div>
        );
    }
}