import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, message, Table, Divider,Card,Col, Row} from 'antd';
import './index.css';
import {Link} from 'react-router-dom';

const { Meta } = Card;
export default class FreeVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            free_list:[{
                video_id:"",
                video_name:"",
                video_content:"",
                video_imgurl:"",
                play_sum:"",
                star_sum:"",
            }]
        }
    }

    GetFreeList = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/getallfree';
        axios.get(api, {
            params: {
                token: localStorage.token,
            }
        }).then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    free_list: response.data.data.lists
                });
                console.log(this.state.free_list)
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    componentDidMount() {
        this.GetFreeList();
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft:670}}>
                    <span>免费视频</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.free_list.map( (value,key) =>{
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
            </div>
        )
    }
}
