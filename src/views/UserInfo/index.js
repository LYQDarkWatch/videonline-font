import React, {Component} from 'react';
import axios from 'axios';
import {Button, message, Input, Icon} from 'antd';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                user_id: "",
                user_name: "",
                user_display: "",
                user_phone: "",
                user_email: "",
                create_time: "",
                last_login: "",
            },
            display:"",
            phone:"",
            email:"",
        };
        this.DisplayChange = this.DisplayChange.bind(this);
        this.PhoneChange = this.PhoneChange.bind(this);
        this.EmailChange = this.EmailChange.bind(this);
        this.submit = this.submit.bind(this);
        this.EditUserInfo = this.EditUserInfo.bind(this);
    }
    DisplayChange (e) {
        this.setState({
            display: e.target.value,
        });
    };
    PhoneChange(e) {
        this.setState({
            phone: e.target.value,
        });
    };
    EmailChange (e) {
        this.setState({
            email: e.target.value,
        });
    };
    GetUserInfo = () => {  //api请求函数
        let api = 'http://127.0.0.1:8000/api/v1/user/getuserinfo';
        axios.get(api, {
            params: {
                token: localStorage.token,
                user_name: localStorage.user_name
            }
        }).then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    info: response.data.info.user
                });
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };
    submit() {
        this.EditUserInfo();
    }
    EditUserInfo() {  //api请求函数
        let api = 'http://127.0.0.1:8000/api/v1/user/edituser?token='+localStorage.token;
        axios.post(api, {
            user_id: localStorage.user_id,
            user_display: this.state.display,
            user_phone: this.state.phone,
            user_email: this.state.email,
        }).then((response) => {
            if (response.data.code === 200) {
                message.success('修改成功');
                this.props.history.push('/userinfo');
            } else if (response.data.code === 403) {
                message.error("输入手机号格式错误，请重试")
            } else if (response.data.code === 405) {
                message.error("输入邮箱格式错误，请重试")
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    }

    componentDidMount() {
        this.GetUserInfo();
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft: 670}}>
                    <span>我的信息</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <p>登录名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.info.user_name}</p>
                            <p>用户昵称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input
                                size="small"
                                style={{width: 250}}
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder={this.state.info.user_display}
                                defaultValue={this.state.info.user_display}
                                onChange={this.DisplayChange}
                            /></p>
                            <p>账号创建时间：{this.state.info.create_time}</p>
                            <p>最后登录：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.info.last_login}</p>
                            <p>用户手机号：&nbsp;&nbsp;&nbsp;<Input
                                size="small"
                                style={{width: 250}}
                                prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder={this.state.info.user_phone}
                                defaultValue={this.state.info.user_phone}
                                onChange={this.PhoneChange}
                            /></p>
                            <p>邮箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Input
                                    size="small"
                                    style={{width: 250}}
                                    prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder={this.state.info.user_email}
                                    defaultValue={this.state.info.user_email}
                                    onChange={this.EmailChange}
                                /></p>
                            <Button type="primary" htmlType="submit" className="login-form-button" size="large"
                                    onClick={this.submit}>
                                确认修改
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
