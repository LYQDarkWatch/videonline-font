import DataChart from '../views/DataChart';
import Basic from '../views/Basic';
import Form from '../views/Form';
import Message from '../views/Message';
import Alert from '../views/Alert';
import Spin from '../views/Spin';
import Progress from '../views/Progress';
import Checkbox from '../views/Checkbox';
import Cascader from '../views/Cascader';
import Tag from '../views/Tag';
import AddTag from "../components/AddTagModel";
import Video from "../views/Video";
import FreeVideo from "../views/FerrVideo"
import VipVideo from "../views/VipVideo"
import VideoByTag from "../views/VideoByTag"
import Notification from "../views/Notifications"
import Favorite from "../views/Favorite"
import Search from "../views/Search"
import Success from "../views/PayVipSuccess"
import VideoInfo from "../views/VideoInfo"
import MyComment from "../views/MyComment"
import Registered from "../views/Registered"
import UserInfo from "../views/UserInfo"
export const routes = [
    {
        path: '/dataCount',
        component: DataChart
    },
    {
        path: '/userinfo',
        component: UserInfo
    },
    {
        path: '/register',
        component: Registered
    },
    {
        path: '/mycomment',
        component: MyComment
    },
    {
        path: '/info',
        component: VideoInfo
    },
    {
        path: '/success',
        component: Success
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/favorite',
        component: Favorite
    },
    {
        path: '/notification',
        component: Notification
    },
    {
        path: '/videobytag',
        component: VideoByTag
    },
    {
        path: '/freevideo',
        component: FreeVideo
    },
    {
        path: '/vipvideo',
        component: VipVideo
    },
    {
        path: '/tag',
        component: Tag
    },
    {
        path: '/addtag',
        component: AddTag
    },
    {
        path: '/videos',
        component: Video
    },
    {
        path: '/basic',
        component: Basic
    },
    {
        path: '/form',
        component: Form
    },
    {
        path: "/alert",
        component: Alert
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/spin',
        component: Spin
    },
    {
        path: '/progress',
        component: Progress
    },
    {
        path: '/checkbox',
        component: Checkbox
    },
    {
        path: '/cascader',
        component: Cascader
    }]
