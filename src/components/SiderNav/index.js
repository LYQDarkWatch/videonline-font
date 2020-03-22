import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import axios from 'axios';
import Logo from '../../assets/images/logo.svg';
import './index.css';

const {Sider} = Layout;

const {SubMenu} = Menu;
//侧边按钮栏
export default class SiderNav extends Component {
    state = {
        collapsed: false,
        tag: [{
            Tag_Id: '',
            Tag_Name: '',
        }]
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    GetTag = () => {
        let api = 'http://127.0.0.1:8000/api/v1/tags/getalltags';
        console.log("token",localStorage.token);
        axios.get(api, {
            params:{
                token:localStorage.token
            }
        }).then((response) =>{
            if (response.data.code === 200){
                this.setState({
                    tag:response.data.data.lists
                });
                console.log("tag：",this.state.tag)
            }
        })
    };
componentDidMount() {
    this.GetTag()
}

    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="80"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logoIcon">
                    <img src={Logo} alt="system" className="Icon"/>
                    {/* <span className="title">RtSystem</span> */}
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2']}
                    mode="inline"
                    theme="dark"
                    collapsed={this.state.collapsed.toString()}
                >
                    <Menu.Item key="2">
                        <Link to="/basic">
                            <Icon type="desktop"/>
                            <span className="navTitle">
                                    首页
                                </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="98">
                        <Link to="/search">
                            <Icon type="search"/>
                            <span className="navTitle">
                                    搜索
                                </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/freevideo">
                            <Icon type="desktop"/>
                            <span className="navTitle">
                                    免费视频
                                </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">

                        <Link to="/vipvideo">
                            <Icon type="desktop"/>
                            <span className="navTitle">
                                    VIP专享
                                </span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="appstore"/>
                                <span>全部分类</span>
                            </span>
                        }
                    >
                        {
                            this.state.tag.map( (value,key) =>{
                                return(
                        <Menu.Item key={value.Tag_Id}>
                            <Link to={
                                {
                                    pathname:'/videobytag',
                                    state:{Tag_Id:value.Tag_Id}
                                }
                            }>{value.Tag_Name}</Link>
                        </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <Menu.Item key="11">
                    <Link to="/notification">
                        <Icon type="message"/>
                        <span className="navTitle">
                                    我的消息
                                </span>
                    </Link>
                </Menu.Item>
                    <Menu.Item key="99">
                        <Link to="/favorite">
                            <Icon type="message"/>
                            <span className="navTitle">
                                    我的收藏
                                </span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
