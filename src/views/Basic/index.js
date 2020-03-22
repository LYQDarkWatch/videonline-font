import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Button, message, Table, Divider,Card,Col, Row} from 'antd';
import './index.css';

const { Meta } = Card;
export default class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hot_list:[{
                video_id:"",
                video_name:"",
                video_content:"",
                video_imgurl:"",
                play_sum:"",
                star_sum:"",
            }],
            new_list:[{
                video_id:"",
                video_name:"",
                video_content:"",
                video_imgurl:"",
                play_sum:"",
                star_sum:"",
            }]
        }
    }
    GetHotList = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/hotvideo';
        axios.get(api, {
            params: {
                token: localStorage.token,
            }
        }).then((response) => {
             if (response.data.code === 200){
                this.setState({
                    hot_list: response.data.data.lists
                });
                console.log("hot",this.state.hot_list);
                console.log("hot",this.state.hot_list.video_name)
            }else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };
    GetNewList = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/newvideo';
        axios.get(api, {
            params: {
                token: localStorage.token,
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    new_list: response.data.data.news
                });
                console.log("hot",this.state.hot_list);
                console.log("hot",this.state.hot_list.video_name)
            }
        })
    };
    componentDidMount() {
        this.GetHotList();
        this.GetNewList()
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft:670}}>
                    <span>当前热播</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.hot_list.map( (value,key) =>{
                                        return(
                                <Col span={6}>
                                    <Link to={
                                        {
                                            pathname:'/info',
                                            state:{v_id:value.video_id}
                                        }
                                    }>
                            <Card
                                hoverable
                                style={{ width: 240 ,marginTop:20}}
                                cover={<img alt="example" src={value.video_imgurl}/>}
                            >
                                <span>{value.play_sum}</span>
                                <span style={{marginLeft:120}}>{value.star_sum}</span>
                                <Meta title={value.video_name} description={value.video_content} />
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
                <div className="labelTitle" style={{marginLeft:670}}>
                    <span>最新上线</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.new_list.map( (value,key) =>{
                                        return(
                                            <Col span={6}>
                                                <Card
                                                    hoverable
                                                    style={{ width: 240 ,marginTop:20}}
                                                    cover={<img alt="example" src={value.video_imgurl}/>}
                                                >
                                                    <span>{value.play_sum}</span>
                                                    <span style={{marginLeft:120}}>{value.star_sum}</span>
                                                    <Meta title={value.video_name} description={value.video_content} />
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                </div>

                <div className="labelTitle" style={{marginLeft:670}}>
                    <span>收藏最多</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.new_list.map( (value,key) =>{
                                        return(
                                            <Col span={6}>
                                                <Card
                                                    hoverable
                                                    style={{ width: 240 ,marginTop:20}}
                                                    cover={<img alt="example" src={value.video_imgurl}/>}
                                                >
                                                    <span>{value.play_sum}</span>
                                                    <span style={{marginLeft:120}}>{value.star_sum}</span>
                                                    <Meta title={value.video_name} description={value.video_content} />
                                                </Card>
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
