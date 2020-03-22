import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, message, Table, Divider,Card,Col, Row, List, Avatar,Popconfirm } from 'antd';
import './index.css';


const { Meta } = Card;
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti_list:[{
                notification_id:"",
                admin_name:"",
                user_id:"",
                user_name:"",
                content:"",
                send_time:"",
            }]
        }
    }

    GetNotifi = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/user/getusernoti';
        console.log(localStorage.user_name);
        axios.get(api, {
            params: {
                token: localStorage.token,
                user_name : localStorage.user_name
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    noti_list: response.data.data.list
                });
            }
        })
    };
    DelNotifi = (notification_id) => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/v1/user/delusernoti';
        axios.get(api, {
            params: {
                token: localStorage.token,
                notification_id : notification_id
            }
        }).then((response) => {
            if (response.data.code === 200) {
                message.success("删除成功");
                this.GetNotifi();
            } else {
                message.error("删除失败")
            }
        })
    };
    componentDidMount() {
        this.GetNotifi();
    }

    render() {
        return (
            <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 7,
                }}
                dataSource={this.state.noti_list}
                renderItem={item => (

                    <List.Item
                        actions={[<a key="list-loadmore-edit" onClick={()=>this.DelNotifi(item.notification_id)}>删除消息</a>]}
                        key={item.notification_id}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                        title={item.admin_name}
                            description={item.send_time}
                        />
                        {item.content}
                    </List.Item>
                )}
            />,
            </div>
        )
    }
}
