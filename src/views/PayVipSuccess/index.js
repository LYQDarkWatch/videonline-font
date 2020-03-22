import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

export default class Success extends Component{
    BackIndex(){
        this.props.history.push('/basic');
    }
    render() {
        return(
            <div>
                <Result
                    status="success"
                    title="恭喜成功本网站的VIP，接下来您可以畅享所有内容"
                    subTitle="您的会员有效期为30天"
                    extra={[
                        <Button type="primary" key="console" onClick={() => this.BackIndex()}>
                            返回首页
                        </Button>
                    ]}
                />
            </div>
        )
    }

}


