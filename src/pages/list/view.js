import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { getListChangeAction } from './actionCreator'
import style from './style.mcss';
// import '../../app/iscroll-probe';
// <audio src={require('../../static/mp3/Leonardo.mp3')} ref={(audio) => {this.audio = audio}}  controls="controls" className='audiomp3'></audio>
// 引入 ECharts 主模块

import Echarts from './echarts'

class List extends Component {

    render() {

        const list = this.props.list.map((item,index) => {
            return  <li className={style['list-content-item']} key={item.id}><Link to={item.link}>{item.title} ({item.time} )</Link></li>
        })

        return (
            <div className={style['list-content']}>
            <Echarts/>  
                <h3 className={style['list-content-title']}>列表页</h3>
                <div id={style['wrapper']}>
                    <div id="scroll">
                        <ul className={style['list-content-list']}>
                            {list}
                            <div className={style['video']}>
                                <video ref="video" loop="loop" autoplay="autoplay" width="500">
                                    <source src={require("../../static/video/video.mp4")} ></source>
                                </video>
                                <div className={style['video-new']}>
                                    <button className={style['btnStart']} ref="start">播放</button>
                                    <button className={style['btnEnd']} ref="end">暂停</button>   
                                    <input type="range" className={style['range']} step=".01" max="1" min="0" ref="range" />
                                    <p ref="playTime" className={style['playTime']}></p>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getListInfo();

        this.video = this.refs.video;
        this.start = this.refs.start;
        this.end = this.refs.end;
        this.playTime = this.refs.playTime;
        this.range = this.refs.range;

        this.start.addEventListener("click", () => {
            this.video.play();
        })
        this.end.addEventListener("click", () => {
            this.video.pause();
        })
        this.video.addEventListener("canplay", () => {
            this.playTime.innerHTML = parseInt(this.video.currentTime) + "/" + parseInt(this.video.duration);
        })
        this.video.addEventListener("timeupdate", () => {
            this.playTime.innerHTML = parseInt(this.video.currentTime) + "/" + parseInt(this.video.duration);
            var ratio = this.video.currentTime / this.video.duration;
            this.range.value = ratio;
        })
        this.range.addEventListener("change", (e) => {
            this.video.currentTime = this.video.duration * e.target.value;
        })  

        // this.myScroll = new IScroll('#wrapper', {probeType:2, mouseWheel:true}) 
        // this.myScroll.on('scroll', () => {
        //     // if(this.myScroll.y < (-this.weekendInfo.length * 202) + 404) {
        //     // 	this.showLoading = true;
        //     // 	this.$store.commit("refreshInfo");
        //     // }
        //     if(this.myScroll.y > 50) {
        //         this.showLoading = true;
        //             this.$store.commit("refreshInfo");
        //     }
        // })
 
    }

    // componentWillUpdate() {
    //     // setTimeout(() => {
	// 			this.showLoading = false;
	// 			this.myScroll.refresh();
	// 		// },500);
    // }

    getListInfo() {
        const id = this.props.params.id;
        axios.get("/api/list.json?id=" + id)
             .then(this.props.changeListData.bind(this));
    }

} 

const mapStateToProps = (state) => ({
    list: state.list.list
})

const mapDispatchToProps = (dispatch) => ({
    changeListData: (response) => {
        const { list } = response.data.data;
        // const action = {
        //     type: "CHANGE_LIST",
        //     value: list
        // }
        dispatch(getListChangeAction(list));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(List);
