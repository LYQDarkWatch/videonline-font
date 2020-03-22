//头部导航栏
import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {fakeAuth} from "../../util/fakeAuth";
import PaySrc from "../../assets/images/zhifu.JPG"
import { Avatar,Menu, Dropdown, Icon,message,Modal} from 'antd';
import './index.css';
import axios from "axios";
class Avatars extends Component{
    state = { visible: false };
    logout = ()=>{
        localStorage.clear();
        this.props.history.push('/login');
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    BeVip =()=>{
            let api = 'http://127.0.0.1:8000/api/v1/user/bevip?token='+localStorage.token;
            axios.post(api, {
                    User_Name:localStorage.user_name
            }).then((response) =>{
                if (response.data.code === 200){
                    localStorage.setItem("priority","1");
                    this.handleOk();
                    message.success("恭喜成为会员");
                    this.props.history.push('/success');
                }
            })
        };

    render(){
        const menu = (
            <Menu>
              <Menu.Item>
                <Link to="/userinfo">
                    <Icon type="user"/>
                    <span className="label">个人设置</span>
                </Link>
              </Menu.Item>
                <Menu.Item>
                    <a onClick={this.showModal}>
                        <Icon type="setting"/>
                        <span className="label">升级会员</span>
                    </a>
                </Menu.Item>
              <Menu.Item>
                <div>
                    <Icon type="home"/>
                    <span className="label" onClick={this.logout}>退出登录</span>
                </div>
              </Menu.Item>
            </Menu>
          );
        return (
            <div className="userInfo">
                <span style={{marginRight:790}}>欢迎来到VideOnline</span>
                <Dropdown overlay={menu} placement="bottomCenter" className="dropMenu">
                    <Avatar src="https://avatars1.githubusercontent.com/u/15929863?s=460&v=4" size="large"/>
                </Dropdown>

                <Modal
                    title="支付10元成为会员"
                    visible={this.state.visible}
                    onOk={this.BeVip}
                    onCancel={this.handleCancel}
                >
                    <img style={{width:400,height:400}} src={PaySrc}/>
                </Modal>
            </div>
        )
    }
}
export default withRouter(Avatars);
