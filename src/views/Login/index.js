import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {message, Form, Icon, Input, Button, Menu} from 'antd';
import loginBg from '../../assets/images/login_bg.svg';
import axios from 'axios';
import Logo from '../../assets/images/logo.svg';
import Name from '../../assets/images/logo.jpg';
import './index.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_passwd: '',
            user: {
                priority: ""
            }

        };
        this.adminChange = this.adminChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
        this.LoginSubmit = this.LoginSubmit.bind(this);
    }

    adminChange(e) {
        this.setState({user_name: e.target.value})
    }

    passwordChange(e) {
        this.setState({user_passwd: e.target.value})
    }

    submit() {
        this.LoginSubmit();
    }

    LoginSubmit() {  //api请求函数
        let text = {User_Name: this.state.user_name, User_Passwd: this.state.user_passwd}; //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        let api = 'http://127.0.0.1:8000/user/login';

        axios.post(api, {
            User_Name: this.state.user_name,
            User_Passwd: this.state.user_passwd
        }).then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    user: response.data.user
                });
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("user_name", response.data.data.user.user_name);
                localStorage.setItem("priority", response.data.data.user.priority);
                localStorage.setItem("can_comment", response.data.data.user.can_comment);
                localStorage.setItem("user_id", response.data.data.user.user_id);
                localStorage.setItem("user_display", response.data.data.user.user_display);
                message.success('验证成功，欢迎登录');
                this.props.history.push('/basic');
            } else {
                message.error("用户名或密码错误，请重试")
            }
        })
    }

    render() {
        return (
            <div className="loginWrap">
                <div className="contentWrap">
                    <div className="leftSide">
                        <img src={loginBg} className="loginBg" alt="login"/>
                    </div>
                    <div className="loginForm">
                        <div className="title">
                            <img src={Logo} alt="VideOnline" className="logo"/>
                            <img style={{height:50}} src={Name} alt="VideOnline用户系统" className="name"/>
                        </div>
                        <div className="dataWrap">
                            <Input
                                size="large"
                                id='admin_name'
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="请输入账号"
                                onChange={this.adminChange}
                            />,
                            <Input.Password
                                size="large"
                                style={{marginTop:20}}
                                id='admin_passwd'
                                type='password'
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="请输入密码"
                                onChange={this.passwordChange}
                            />,
                            <Button style={{marginTop:20}} type="primary" htmlType="submit" className="login-form-button" size="large"
                                    onClick={this.submit}>
                                登录
                            </Button>
                            <Link to="/register">
                                <Icon type="message"/>
                                <a className="navTitle">
                                    还没有账号？快去注册一个吧
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Form.create({name: 'loginForm'})(LoginForm));
