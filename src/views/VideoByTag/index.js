import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Button, message, Table, Divider,Card,Col, Row} from 'antd';
import './index.css';


const { Meta } = Card;
export default class VideoByTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_tag:[{
                video_id:"",
                video_name:"",
                video_content:"",
                video_imgurl:"",
                play_sum:"",
                star_sum:"",
            }]
        }
    }

    GetVideoByTag = (tag_id) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/video/getvideobytag';
        axios.get(api, {
            params: {
                token: localStorage.token,
                tag_id:tag_id
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    video_tag: response.data.data.lists
                });
                console.log("videobytag:",this.state.video_tag)
            }
        })
    };

    componentWillReceiveProps(nextProps){
        let tag_id = this.props.location.state.Tag_Id;
        this.GetVideoByTag(tag_id);
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft:670}}>
                    <span>当前分类</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Row gutter={24}>
                                {
                                    this.state.video_tag.map( (value,key) =>{
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
