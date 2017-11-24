import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import style from './style.mcss';
import { connect } from 'react-redux';
import { getIndexAction } from './actionCreator';

import  Canvas  from  './canvas';
import '../../app/swiper.css';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.js';

import Radar from './Radar'

class Index extends Component {

    render() {
        
        const list = this.props.list.map((item,index) => {
            return  (
                <li className={style['index-item']} key={item.id}>
                    <Link to={item.link}>[ {item.category} ]{item.title}( {item.time} )</Link>
                </li>
            )
        });

        const friendLink = this.props.friendLink.map((item,index) => {
            return  (
                <li className={style['friendLink-item']} key={item.id}>
                    <Link to={item.link}>{item.title}</Link>
                </li>
            )
        });

        const slideshow = this.props.slideshow.map((item,index) => {
            return  (
                <li className="swiper-slide" key={item.id}>
                   <img alt="轮播图" className={style['swiper-slide-img']} src={item.link} />
                </li>
            )
        });

        return (
            <div>
                 <div className={style['index-content']}>
                    <div className={style['swiper-container-con'] +  ' swiper-container'}>
                        <div className={style['swiper-wrapper-wra'] + ' swiper-wrapper'}>
                            {slideshow}
                        </div>
                    </div>
                    <h3 className={style['index-title']}>VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。</h3>
                    <ul className={style['index-list']}>
                       <Radar />	
                        <Canvas />
                        {list}
                    </ul>
                </div>
                <div className={style['friendLink']}>
                    <p className={style['friendLink-title']}>voa友情链接</p>
                    <ul className={style['index-friendLink']}>
                         {friendLink}
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(!this.props.list.length) {
            this.getIndexInfo();
        }

        new Swiper('.swiper-container',{autoplay : true});

        // // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('main'));
        // // 绘制图表
        // myChart.setOption({
        //     tooltip: {},
        //     xAxis: {
        //         data: ["ES6", "vue", "react", "ES5", "express", "koa"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // });
    }
    
    getIndexInfo() {
        axios.get('/api/index.json')
             .then(this.props.handleGetInfoSucc.bind(this));
        }
    }

const mapStateToProps = (state) => ({
    list: state.index.list,
    friendLink: state.index.friendLink,
    slideshow : state.index.slideshow
})

const mapDispatchToProps = (dispatch) => ({

    handleGetInfoSucc: (response) => {
       
        const { list, friendLink, slideshow } = response.data.data;
        
        // const action = {
        //     type: "CHANGE_INDEX",
        //     value: list,
        //     friendLink : friendLink,
        //     slideshow: slideshow
        // }
        dispatch(getIndexAction(list,friendLink, slideshow));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index);
