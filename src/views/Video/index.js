import React, {Component} from 'react';
import axios from 'axios';
import {Drawer, Form, Col, Row, Select, DatePicker, Button, message, Table, Divider, Modal, Input, Icon} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previews: [{
                "video_id": "",
                "video_name": "",
                "tag_id": "",
                "Tag": {
                    Tag_Id: "",
                    Tag_Name: "",
                    Created_Time: "",
                },
                Info: [
                    {
                        video_id: "",
                        video_name: "",
                        video_info: "",
                        video_url: "",
                        video_actor: "",
                        video_logo: "",
                        first_upload: "",
                        last_update: "",
                        play_sum: "",
                        star_sum: "",
                        content_sum: "",
                        Content: [{
                            "content_id": "",
                            "video_id": "",
                            "user_id": "",
                            "user_name": "",
                            "user_logo": "",
                            "star_sum": 1,
                            "video_content": "太好看了",
                            "add_time": "2020-2-23 19:23:35"
                        }],
                    }
                ],
                "video_content": "",
                "video_imgurl": "",
                "play_sum": "",
                "star_sum": "",
                "video_isvip": "",
            }],
            tag: [
                {
                    Tag_Id: "",
                    Tag_Name: "",
                    Created_Time: ""
                }
            ],
            tag_name: "",
            visible: false,
            mvisible: false,
        };
        this.tagChange = this.tagChange.bind(this);
        this.vnameChange = this.vnameChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.infoChange = this.infoChange.bind(this);
        this.actorChange = this.actorChange.bind(this);
        this.imgChange = this.imgChange.bind(this);
        this.playurlChange = this.playurlChange.bind(this)
    }

    tagChange(e) {
        this.setState({tag_tame: e.target.value})
    }

    vnameChange(e) {
        this.setState({video_name: e.target.value})
    }

    contentChange(e) {
        this.setState({video_content: e.target.value})
    }

    infoChange(e) {
        this.setState({video_info: e.target.value})
    }

    actorChange(e) {
        this.setState({video_actor: e.target.value})
    }

    imgChange(e) {
        this.setState({video_imgurl: e.target.value})
    }

    playurlChange(e) {
        this.setState({video_url: e.target.value})
    }

    static VipVideoFomater(key) {
        if (key === 0) {
            return '非会员视频'
        } else {
            return '会员视频'
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    GetAllVideo = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/admin/video/getallvideo';
        axios.get(api, {
            params: {
                token: localStorage.token,
                priority: 2
            }
        }).then((response) => {
            if (response.data.code === 200) {
                console.log(response.data.data);
                this.setState({
                    previews: response.data.data.previews
                });
            } else {

                console.log(response.data.code);
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };
    AddVideo = () => {
        const token = localStorage.token;
        let video_name = this.state.video_name;
        let video_content = this.state.video_content;
        let video_info = this.state.video_info;
        let tag_name = this.state.tag_name;
        let video_actor = this.state.video_actor;
        let video_imgurl = this.state.video_imgurl;
        let video_url = this.state.video_url;
        // eslint-disable-next-line no-template-curly-in-string
        let api = 'http://127.0.0.1:8000/api/admin/videos/addvideo?priority=2&token=' + token;
        axios.post(api, {
            video_name: video_name,
            video_content: video_content,
            video_info: video_info,
            Tag_Name: tag_name,
            video_actor: video_actor,
            video_imgurl: video_imgurl,
            video_url: video_url,
        })
            .then((response) => {
                console.log(response);
                if (response.data.code === 200) {
                    message.success("添加成功");
                    this.onClose();
                    this.GetAllVideo();
                } else {
                    message.error("添加失败");
                }
            })
    };

    componentDidMount() {
        this.GetAllVideo();
        this.GetAllTag();
    }

    DeleteVideo(video_id) {
        video_id = video_id.toString();
        // eslint-disable-next-line no-template-curly-in-string
        let api = 'http://127.0.0.1:8000/api/admin/videos/deletevideo';
        axios.delete(api, {
            params: {
                token: localStorage.token,
                priority: 2,
                video_id: video_id
            },
        }).then((response) => {
            if (response.data.code === 200) {
                message.success("删除成功");
                this.GetAllVideo()
            } else {
                message.error("删除失败,请重试");
                this.GetAllVideo()
            }
        })
    }

    EditVideo = (video_name) => {

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
                });
                console.log(this.state.tag)
            }
        })
    };
    VIPBeFree = (video_id) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/admin/video/vipvideobefree';
        video_id = video_id.toString();
        axios.get(api, {
            params: {
                token: localStorage.token,
                priority: 2,
                video_id: video_id,
            }
        }).then((response) => {
            if (response.status === 200) {
                message.success("变更成功");
                this.GetAllVideo()
            } else {
                console.log(response.data.code);
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };
    FreeBeVIP = (video_id) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/admin/video/freevideobevip';
        video_id = video_id.toString();
        axios.get(api, {
            params: {
                token: localStorage.token,
                priority: 2,
                video_id: video_id,
            }
        }).then((response) => {
            if (response.status === 200) {
                message.success("变更成功");
                this.GetAllVideo()
            } else {
                console.log(response.data.code);
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    render() {
        const columns = [
            {
                title: '视频ID',
                dataIndex: 'video_id',
                key: 'video_id',
                render: text => <text>{text}</text>,
            },
            {
                title: '视频名称',
                // render: text => <text onClick={this.showModal}>{text}</text>,
                render: (text, record) => (
                    <span>
                    <text onClick={this.showModal}>{record.video_name}</text>
                        </span>
                ),
            },
            {
                title: '视频标签',
                dataIndex: 'Tag.Tag_Name',
                render: text => <text >{text}</text>,
            },
            {
                title: '视频简介',
                dataIndex: 'video_content',
                render: text => <text href="/">{text}</text>,
            },
            {
                title: '封面图链接',
                dataIndex: 'video_imgurl',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '播放数量',
                dataIndex: 'play_sum',
                render: text => <text href="/">{text}</text>,
            },
            {
                title: '收藏数量',
                dataIndex: 'star_sum',
                render: text => <text href="/">{text}</text>,
            },
            {
                title: '是否会员',
                dataIndex: 'video_isvip',
                render: text => <text>{Video.VipVideoFomater(text)}</text>
            },
            {
                title: 'Action',
                render: (text, record) => (
                    <span>
                  <Button className="btn"
                          onClick={() => this.DeleteVideo(record.video_id)}>删除视频 </Button>
                  <Divider type="vertical"/>
                  <Button className="btn"
                          onClick={() => this.FreeBeVIP(record.video_id)}>VIP视频 </Button>
                         <Divider type="vertical"/>
                        <Button className="btn"
                                onClick={() => this.VIPBeFree(record.video_id)}>免费视频 </Button>
                              <Divider type="vertical"/>
                        <Button className="btn"
                                onClick={() => this.VIPBeFree(record)}>查看详情 </Button>
                </span>
                ),
            },
        ];

        return (
            <div className="messageWrap">
                <div className="labelTitle">
                    视频管理
                    <Button style={{marginLeft: '50px'}} type="primary" onClick={this.showDrawer}>
                        <PlusOutlined/> 添加视频
                    </Button>
                </div>
                <div>
                    <Drawer
                        title="新建视频信息"
                        width={500}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        bodyStyle={{paddingBottom: 80}}
                    >
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="video_name"
                                        label="视频名称"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='video_name'
                                            placeholder="请输入视频名称"
                                            onChange={this.vnameChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="video_content"
                                        label="视频简介"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='video_content'
                                            placeholder="请输入视频简介"
                                            onChange={this.contentChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="video_imgurl"
                                        label="封面图"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='video_imgurl'
                                            placeholder="请输入封面图片链接"
                                            onChange={this.imgChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="video_url"
                                        label="播放链接"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='video_url'
                                            placeholder="请输入播放链接"
                                            onChange={this.playurlChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="video_actor"
                                        label="主演"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='video_actor'
                                            placeholder="请输入主演"
                                            onChange={this.actorChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item
                                        name="tag_name"
                                        label="视频标签"
                                        rules={[{required: true, message: 'Please choose the type'}]}
                                    >
                                        <Input
                                            id='tag_name'
                                            placeholder="输入标签"
                                            onChange={this.tagChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/*<Row gutter={16}>*/}
                            {/*    <Col span={16}>*/}
                            {/*        <Form.Item*/}
                            {/*            name="tag_name"*/}
                            {/*            label="标签"*/}
                            {/*            rules={[{required: true, message: 'Please choose the type'}]}*/}
                            {/*        >*/}
                            {/*            <Select placeholder="选择标签" id='tag_name' onChange={this.tagChange}>*/}
                            {/*                {this.state.tag.map(tag => <Option*/}
                            {/*                    key={tag.Tag_Name}>{tag.Tag_Name}</Option>)}*/}
                            {/*            </Select>*/}
                            {/*        </Form.Item>*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="video_info"
                                        label="视频详情"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入视频详述',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} id='video_info' onChange={this.infoChange}
                                                        placeholder="录入视频详情"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <div
                            style={{
                                textAlign: 'right',
                                marginBottom: '400px'
                            }}
                        >
                            <Button
                                onClick={this.onClose}
                                style={{marginRight: 8}}
                            >
                                Cancel
                            </Button>,
                            <Button onClick={this.AddVideo} type="primary">
                                Submit
                            </Button>
                        </div>
                    </Drawer>
                </div>
                <div>
                    <Modal
                        visible={this.state.mvisible}
                        title="视频详情"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                关闭
                            </Button>,
                            <Button key="修改视频信息" type="primary">
                                修改
                            </Button>,
                        ]}
                    >
                        <Input
                            size="large"
                            id='tag_name'
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入标签名称"
                            onChange={this.tagChange}
                        />,
                    </Modal>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Table
                                className="components-table-demo-nested"
                                key='tag_id'
                                columns={columns}
                                dataSource={this.state.previews}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
