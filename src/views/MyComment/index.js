import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {Button, message, Table, Divider, Card, Col, Row, Comment, Avatar, Tooltip} from 'antd';
import {Link} from 'react-router-dom';

const {Meta} = Card;
export default class MyComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [{
                content_id: "",
                video_id: "",
                video_name: "",
                user_id: "",
                user_name: "",
                star_sum: "",
                video_content: ''
            }]
        }
    }

    GetUserContent = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/user/getusercomment';
        axios.get(api, {
            params: {
                token: localStorage.token,
                user_id: localStorage.user_id
            }
        }).then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    comment: response.data.data.list
                });
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    DeleteUserContent = (content_id) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/deletecontent';
        axios.get(api, {
            params: {
                token: localStorage.token,
                user_id: localStorage.user_id,
                content_id: content_id,
            }
        }).then((response) => {
            if (response.data.code === 200) {
                message.success("删除成功")
                this.GetUserContent();
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    componentDidMount() {
        this.GetUserContent();
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft: 670}}>
                    <span>我的评论</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            {
                                this.state.comment.map((value, key) => {
                                    return (
                                        <Comment
                                            author={<span>{value.user_name}</span>}
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={
                                                <div>
                                                     <span>
                                                        评论电影：{value.video_name}
                                                    </span>
                                                    <p style={{marginTop:10}}>
                                                    内容：{value.video_content}
                                                    </p>

                                                </div>

                                            }
                                            datetime={
                                                <Tooltip stitle={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{value.add_time}</span>
                                                    <Button size={"small"} style={{marginLeft: 150}}
                                                            onClick={() => this.DeleteUserContent(value.content_id)}>删除评论</Button>
                                                </Tooltip>
                                            }
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
