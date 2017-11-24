import React, { Component } from 'react';
import axios from 'axios';
import style from './style.mcss';
// import Ueditor from './Ueditor';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Leonardo da Vinci Painting Sells for Record $450 Million",
            "content": "<p>正在加载中...</p>",
            "list": "123，马上开始..."
        }
        this.handleGetInfoSucc = this.handleGetInfoSucc.bind(this);
    }

    render() {
        return (
            <div className={style['detail']}>
                <div className={style['detail-title']}>{this.state.title}</div>
                <img className={style['detail-img']} alt="English" src="https://tpc.googlesyndication.com/daca_images/simgad/3214236613486186197?w=400&h=209" />
                <div className={style['detail-content']} dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                <div className = {style['detail-list']}>
                    <h3 className = {style['detail-list-title']}>VOA内容相关链接：</h3>
                    <ul className = {style['detail-list-item']} dangerouslySetInnerHTML={{__html: this.state.list}}></ul>
                </div>
                <img className={style['detail-advAbsolute']} alt="advertising" src="http://static.googleadsserving.cn/pagead/imgad?id=CICAgKCrhM3QCBCgARjYBDIIMOHVIERIqz4" />

            </div>
        )
    }

    componentDidMount() {
        this.getDetailInfo();
    }

    getDetailInfo() {
        const id = this.props.params.id;
        axios.get("/api/detail.json?id=" + id)
             .then(this.handleGetInfoSucc)
    }

    handleGetInfoSucc(response) {
        const { detail } = response.data.data;
        this.setState({
            title: detail.title,
            content: detail.content,
            list: detail.list
        })
    }

} 