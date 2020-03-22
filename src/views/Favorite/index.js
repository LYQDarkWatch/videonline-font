import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Button, message, Table, Divider, Card, Col, Row} from 'antd';
import './index.css';


const {Meta} = Card;
export default class FavoriteVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite_list: [{
                favorite_id: "",
                video_id: "",
                video_name: "",
                favorite_time: "",
                Preview: [{
                    video_content: "",
                    video_imgurl: "",
                    play_sum: "",
                    star_sum: "",
                    video_isvip: "",
                }]
            }]
        }
    }

    GetFavoriteList = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/favorite/getfavorite';
        axios.get(api, {
            params: {
                token: localStorage.token,
                user_name: localStorage.user_name
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    favorite_list: response.data.data.list
                });
                console.log("favorite:", this.state.favorite_list)
            }
        })
    };

    DeleteFavorite = (favoriteid) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/favorite/deletefavorite';
        axios.get(api, {
            params: {
                token: localStorage.token,
                favorite_id: favoriteid
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                message.success("删除成功")
                this.GetFavoriteList();
            }
        })
    };

    componentDidMount() {
        this.GetFavoriteList();
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft: 670}}>
                    <span>我的收藏</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.favorite_list.map((value, key) => {
                                        return (
                                            <Col span={6}>
                                                <Link to={
                                                    {
                                                        pathname: '/info',
                                                        state: {v_id: value.video_id}
                                                    }
                                                }>
                                                    <Card
                                                        hoverable
                                                        style={{width: 240, marginTop: 20}}
                                                        cover={<img alt="example" src={value.Preview.video_imgurl}/>}
                                                    >
                                                        <Meta title={value.video_name}
                                                              description={value.Preview.video_content}/>
                                                        <Button onClick={() => this.DeleteFavorite(value.favorite_id)}
                                                                size={"small"} style={{marginTop: 10}}>取消收藏</Button>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
