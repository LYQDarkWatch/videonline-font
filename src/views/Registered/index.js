import React,{Component } from 'react';
import { message,Form, Icon, Input, Button } from 'antd';
import loginBg from '../../assets/images/login_bg.svg';
import axios from 'axios';
import Logo from '../../assets/images/logo.svg';
import Name from '../../assets/images/logo.jpg';
import './index.css';
import {Link} from "react-router-dom";

export default class Registered extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user_name:'',
            user_passwd:'',
            user_display:'',
            user_phone:'',
            user_email:'',
        };
        this.adminChange = this.adminChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.displayChange = this.displayChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.submit = this.submit.bind(this);
        this.RegisterSubmit = this.RegisterSubmit.bind(this);
    }
    adminChange(e){
        this.setState({ user_name : e.target.value })
    }

    passwordChange(e){
        this.setState({ user_passwd : e.target.value })
    }

    displayChange(e){
        this.setState({ user_display : e.target.value })
    }

    phoneChange(e){
        this.setState({ user_phone : e.target.value })
    }

    emailChange(e){
        this.setState({ user_email : e.target.value })
    }

    submit(){
        this.RegisterSubmit();
    }
    RegisterSubmit(){  //api请求函数
        let api = 'http://127.0.0.1:8000/user/register';
        axios.post(api,{
            user_name:this.state.user_name,
            user_passwd:this.state.user_passwd,
            user_display:this.state.user_display,
            user_phone:this.state.user_phone,
            user_email:this.state.user_email,
        }).then((response)=>{
            if(response.data.code=== 200){
                message.success('注册成功，请登录');
                this.props.history.push('/login');
            } else {
                message.error("注册失败，请重试")
            }
        })
    }

    render(){
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
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入账号"
                                onChange={this.adminChange}
                            />,
                            <Input
                            size="large"
                            style={{marginTop:10}}
                            id='admin_passwd'
                            type='password'
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                            onChange={this.passwordChange}
                        />,
                            <Input
                                size="large"
                                id='user_display'
                                style={{marginTop:10}}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户昵称"
                                onChange={this.displayChange}
                            />,
                            <Input
                                size="large"
                                id='user_phone'
                                style={{marginTop:10}}
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入手机号"
                                onChange={this.phoneChange}
                            />,
                            <Input
                                size="large"
                                id='user_email'
                                style={{marginTop:10}}
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户邮箱"
                                onChange={this.emailChange}
                            />,
                            <Button style={{marginTop:10}} type="primary" htmlType="submit" className="login-form-button" size="large" onClick={this.submit}>
                                注册
                            </Button>
                            <Link to="/login">
                                <Icon type="message"/>
                                <a className="navTitle">
                                    已经有帐号了？快去登录吧
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
