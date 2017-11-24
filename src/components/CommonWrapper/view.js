import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './style.mcss';
import axios from 'axios';
 
export default class CommonWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            standard: [],
            standardlist: [],
            sky: [],
            skylist: [],
            teaching: [],
            teachinglist: [],
            develop: []
        }
        this.handleGetHeaderDataSucc = this.handleGetHeaderDataSucc.bind(this);
    }
    
    render() {
       
        const list =  this.state.list.map((item,index) => {
            return <li className={style['header-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
        });
        const standard =  this.state.standard.map((item,index) => {
            return <h4 className={style['nav-title']} key={item.id}><Link  to={item.url}>{item.content}</Link></h4>
        });
        
        const standardlist =  this.state.standardlist.map((item,index) => {
            return <li className={style['nav-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
        });
        const sky =  this.state.sky.map((item,index) => {
            return <h4 className={style['nav-title']} key={item.id}><Link to={item.url}>{item.content}</Link></h4>
        });
        
        const skylist =  this.state.skylist.map((item,index) => {
            return <li className={style['nav-item-list']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
        });
        const teaching =  this.state.teaching.map((item,index) => {
            return <h4 className={style['nav-title']} key={item.id}><Link to={item.url}>{item.content}</Link></h4>
        });
        
        const teachinglist =  this.state.teachinglist.map((item,index) => {
            return <li className={style['nav-item-list']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
        });

        const develop =  this.state.develop.map((item,index) => {
            return <p className={style['copy-develop']} key={item.id}>{item.develop}</p>
        });

        return (
            <div className={style['header-audio']}>
                <div className={style['audio-audio']}>
                    <audio ref="audio" controls="controls" style={{display:"none"}} >
                        <source src={require("../../static/audio/audio.mp3")} type="audio/mpeg" ></source>
                    </audio>
                    <button className={style['audio-btn']} ref="btn" >♬</button>
                </div>
                <div className={style['header']}>
                    <Link to="/">
                        <img alt="logo" className={style['header-logo']} src={require('../../static/images/logo.png')} />
                    </Link>
                    <ul className={style['header-list']}>
                        {list}
                    </ul>
                </div>
                <div className={style['index-nav']}>
                    <ul className={style['nav-list']}>
                        {standard}
                        {standardlist}
                    </ul>
                    <ul className={style['nav-list-sky']}>
                        {sky}
                        {skylist}
                    </ul>
                    <ul className={style['nav-list-teach']}>
                        {teaching}
                        {teachinglist}
                    </ul>
                </div>
                <div>
                     {this.props.children}
                </div>
                <div className={style['copy']}>
                    {develop}
                    <img alt="copy-img" className={style['copy-img']} src="http://icon.users.51.la/icon_9.gif" />
                </div>
            </div>
        )

    }

    componentDidMount() {
        axios.get('/api/header.json').then(this.handleGetHeaderDataSucc);

        this.btn = this.refs.btn;
        this.audio = this.refs.audio;
        var isPlaying = false;
        // console.log(this.btn);
        this.btn.addEventListener("click", () => {
            if (isPlaying) {
                this.audio.pause();
            }else {
                this.audio.play();
            }
            isPlaying = !isPlaying;
        })
    }

    handleGetHeaderDataSucc(response) {
        const { list, standard,  sky, teaching, copy } = response.data.data;
        this.setState({
            list: list,
            standard: standard.title,
            standardlist: standard.list,
            sky: sky.title,
            skylist: sky.list,
            teaching: teaching.title,
            teachinglist: teaching.list,
            develop: copy
        })
    }
}


