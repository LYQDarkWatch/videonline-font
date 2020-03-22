import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, message, Form, Table, Divider, Card, Col, Row, Typography, Comment, Tooltip, Avatar, Input} from 'antd';
import moment from 'moment';
import ReactPlayer from 'react-player'

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

export default class VideoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                video_id: "",
                video_name: "",
                video_info: "",
                Video_Tag: {
                    Tag_Name: ""
                },
                video_url: "",
                video_actor: "",
                play_sum: "",
                star_sum: "",
                Content: [{
                    content_id: "",
                    "video_id": "",
                    "user_id": "",
                    "user_name": "",
                    "user_logo": "",
                    "star_sum": "",
                    "video_content": "",
                    "add_time": ""
                }],
                play_url: "",
                video_isvip: ""
            },
            value: ""
        }
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    GetVideoInfeo = (video_id) => {  //api请求函数
        let api = 'http://127.0.0.1:8000/api/v1/video/getvideo';
        axios.get(api, {
            params: {
                token: localStorage.token,
                vid: video_id
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    info: response.data.data
                });
                console.log(this.state.info);
                console.log(this.state.info.video_isvip);
                console.log(localStorage.priority);
                if (localStorage.priority === '0' && this.state.info.video_isvip === 1) {
                    message.error("抱歉，该视频为会员专享，请升级为会员重试");
                    this.props.history.push('/freevideo');
                } else {
                    this.MakeUrl()
                }
            }
        })
    };

    AddContent = () => {
        let api = 'http://127.0.0.1:8000/api/v1/video/addcontent?token=' + localStorage.token;
        let comment = 'http://127.0.0.1:8000/api/v1/user/getcomment';
        axios.get(comment, {
            params: {
                token: localStorage.token,
                user_id: localStorage.user_id
            }
        }).then((response) => {
            if (response.data.data === 1) {
                message.error("您已被禁止评论，请稍后再试")
            } else {
                let v_id = (this.state.info.video_id).toString();
                axios.post(api, {
                    video_id: v_id,
                    video_name: this.state.info.video_name,
                    user_id: localStorage.user_id,
                    user_display: localStorage.user_display,
                    video_content: this.state.value,
                }).then((response) => {
                    if (response.data.code === 200) {
                        message.success("添加评论成功");
                        this.GetVideoInfeo(this.state.info.video_id)
                    } else {
                        message.error("添加评论失败")
                    }
                })
            }
        });
    };

    AddFavorite = () => {
        let api = 'http://127.0.0.1:8000/api/v1/favorite/addfavorite';
        let v_id = (this.state.info.video_id).toString();
        axios.get(api, {
            params: {
                token: localStorage.token,
                video_id: v_id,
                user_id: localStorage.user_id,
                video_name: this.state.info.video_name,
            }
        }).then((response) => {
            if (response.data.code === 200) {
                message.success("添加收藏成功");
            } else {
                message.error("该视频已在您的收藏夹")
            }
        })
    };

    MakeUrl = () => {
        let playurl = 'http://127.0.0.1:8000/api/v1/video/play?token=' + localStorage.token + '&vname=' + this.state.info.video_url;
        // let playurl = this.state.info.video_url;
        this.setState({
            play_url: playurl
        });
        console.log("play:", this.state.play_url)
    };

    componentDidMount() {
        let video_id = this.props.location.state.v_id;
        this.GetVideoInfeo(video_id)
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <ReactPlayer
                                controls={true}
                                volume={1}
                                // config={{
                                //     file:{
                                //         forceHLS:true
                                //     }
                                // }}
                                width={1280}
                                height={720}
                                url={this.state.play_url} playing/>
                            <div style={{width: 500}}>
                                <Title style={{float: "left"}} level={3}>{this.state.info.video_name}</Title>
                                <div style={{marginTop: 30}}>
                                        <span style={{marginTop: 3000, marginLeft: 30}}>当前热度：{this.state.info.play_sum}
                                            <Button style={{marginLeft: 30}} onClick={this.AddFavorite}>添加到收藏夹</Button>
                                        </span></div>
                            </div>
                            <div style={{marginTop: 20}}><span
                                style={{marginTop: 20}}>主演：{this.state.info.video_actor}</span></div>
                            <Title level={4} style={{marginTop: 30}}>内容简介：</Title>
                            <Paragraph>{this.state.info.video_info}</Paragraph>
                        </div>
                    </div>
                </div>
                <div>
                    <Comment
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <div>
                                <Form.Item>
                                    <TextArea rows={4} onChange={this.handleChange}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" onClick={this.AddContent} type="primary">
                                        发表评论
                                    </Button>
                                </Form.Item>
                            </div>
                        }
                    />
                </div>
                {
                    this.state.info.Content.map((value, key) => {
                        return (
                            <Comment
                                author={<a>{value.user_name}</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <p>
                                        {value.video_content}
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{value.add_time}</span>
                                    </Tooltip>
                                }
                            />
                        )
                    })
                }
            </div>
        )
    }
}
