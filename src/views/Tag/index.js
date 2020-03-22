import React, {Component} from 'react';
import axios from 'axios';
import {Button, message, Table, Divider, Modal, Input, Icon} from 'antd';
import './index.css';

export default class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [
                {
                    Tag_Id: "",
                    Tag_Name: "",
                    Created_Time: ""
                }
            ],
            loading: false,
            visible: false,
            Tag_Name : "",
        };
        this.tagChange = this.tagChange.bind(this);

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    tagChange(e){
        this.setState({ Tag_Name : e.target.value })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    GetAllTag = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/admin/tag/getalltag';
        axios.get(api, {
            params: {
                token: localStorage.token,
                priority: 2
            }
        }).then((response) => {
            if (response.status === 401) {
                console.log(response.data.code);
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    tag: response.data.data.tags
                })
            }
        })
    };
    componentDidMount() {
        this.GetAllTag()
    }

    AddTag = () => {
            const token = localStorage.token;
            let Tag_Name = this.state.Tag_Name;
            // eslint-disable-next-line no-template-curly-in-string
            let api = 'http://127.0.0.1:8000/api/admin/tags/addtag?priority=2&token=' + token;
            axios.post(api, {
                Tag_Name: Tag_Name,
            })
                .then((response) => {
                    console.log(response);
                    if (response.data.code === 200) {
                        message.success("添加成功");
                        this.handleCancel();
                        this.GetAllTag();
                    } else {
                        message.error("添加失败");
                    }
                })
        };

    DeleteTag(tag_id){
        var tagid = tag_id.toString();
        // eslint-disable-next-line no-template-curly-in-string
        let api = 'http://127.0.0.1:8000/api/admin/tags/deletetag';
        axios.delete(api,{
            params:{
                token: localStorage.token,
                priority: 2,
                tag_id:tagid
            },
        }).then((response) =>{
            if (response.data.code === 200){
                message.success("删除成功");
                this.GetAllTag()
            } else {
                message.error("删除失败,该标签已被视频引用");
                this.GetAllTag()
            }
        })
    }

    render() {
        const { visible, loading } = this.state;
        const columns = [
            {
                title: 'Tag_Id',
                dataIndex: 'Tag_Id',
                key:'Tag_Id',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '标签名称',
                dataIndex: 'Tag_Name',
                render: text => <a href="/">{text}</a>,
            },

            {
                title: '创建时间',
                dataIndex: 'Created_Time',
            },

            {
                title: 'Action',
                render: (text, record) => (
                    <span>
                  <Button className="btn"
                          onClick={() => this.DeleteTag(record.Tag_Id)}>删除标签 </Button>
                  <Divider type="vertical"/>
                </span>
                ),
            },
        ];

        return (
            <div className="messageWrap">
                <div className="labelTitle">
                    标签管理
                    <Button style={ {marginLeft:'50px'}} type="primary" onClick={this.showModal}>
                        添加标签
                    </Button>
                </div>
                <div>
                    <Modal
                        visible={visible}
                        title="添加标签"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.AddTag}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Input
                            size="large"
                            id='tag_name'
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入标签名称"
                            onChange={this.tagChange}
                        />,
                    </Modal>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Table key='tag_id' columns={columns} dataSource={this.state.tag}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}