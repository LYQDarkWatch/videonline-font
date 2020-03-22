import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Button, message, Table, Divider, Card, Col, Row, Input} from 'antd';
import './index.css';

const {Search} = Input;


const {Meta} = Card;
export default class SearchVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_list: [{
                video_id: "",
                video_name: "",
                Tag: {
                    "Tag_Name": "",
                },
                Info: {
                    video_info: "",
                    video_actor: "",
                    star_sum: "",
                },
                video_content: "",
                video_imgurl: "",
                play_sum: "",
                star_sum: "",
            }]
        }
    }

    SearchVideo = (video_name) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/search';
        axios.get(api, {
            params: {
                token: localStorage.token,
                video_name: video_name
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    search_list: response.data.data.list
                });
            }
        })
    };

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft: 670}}>
                    <span>搜您想搜</span>
                </div>
                <div>
                    <Search
                        placeholder="输入您想搜索的视频"
                        enterButton="Search"
                        size="large"
                        onSearch={value => this.SearchVideo(value)}
                        style={{width: 600}}
                    />
                </div>
                <div className="displayCode clearfix" style={{marginTop: 50}}>
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">

                            {
                                this.state.search_list.map((value, key) => {
                                    return (
                                        <div style={{marginTop: 30}}>
                                            <div style={{width: 1000, height: 300}}>
                                                <div style={{float: "left"}}>
                                                    <img alt="example" src={value.video_imgurl}/>
                                                </div>
                                                <div style={{display: "inline"}}>
                                                    <div style={{marginLeft: 200}}>
                                                        <span>片名：</span><span>{value.video_name}</span></div>
                                                    <div style={{marginLeft: 200, marginTop: 10}}>
                                                        <span>主演：</span><span>{value.Info.video_actor}</span></div>
                                                    <div style={{marginLeft: 200, marginTop: 10}}>
                                                        <span>详情：</span><span>{value.Info.video_info}</span></div>
                                                    <div style={{marginLeft: 200, marginTop: 30}}>
                                                        <Link to={
                                                            {
                                                                pathname: '/info',
                                                                state: {v_id: value.video_id}
                                                            }
                                                        }><Button>立刻播放</Button>
                                                        </Link></div>
                                                </div>
                                            </div>
                                        </div>
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
