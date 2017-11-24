import React, { Component } from 'react'
import './audio.css'
import $ from 'jquery'
export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: true,
            isVoice: true,
            isvoiceTime: '0:00'
        }
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleVoiceClick = this.handleVoiceClick.bind(this);
        this.hanleTimeChange = this.hanleTimeChange.bind(this);
        this.handleVoiceMouseDown = this.handleVoiceMouseDown.bind(this);
        this.handleVoiceMouseMove = this.handleVoiceMouseMove.bind(this);
        this.handleVoiceMouseUp = this.handleVoiceMouseUp.bind(this);
        this.handleProcessMouseDown = this.handleProcessMouseDown.bind(this);
        this.handleProcessMouseMove = this.handleProcessMouseMove.bind(this);
        this.handleProcessMouseUp = this.handleProcessMouseUp.bind(this);
        this.handleFalseClick = this.handleFalseClick.bind(this);
    }
    render() {
        return (
            <div className='audio'>
                <audio src={require('../../static/audio/audio.mp3')} ref={(audio) => { this.audio = audio }} controls="controls" className='audiomp3'></audio>
                <div className="audioCon">
                    <p><i className='iconfont icon-play' onClick={this.handlePlayClick} ref={(iconPlay) => {this.iconPlay=iconPlay}}></i></p>
                    <p onClick={this.handleFalseClick}><i ref={(stime) => { this.stime = stime }}>0:00</i><i>/</i><i>{this.state.isvoiceTime}</i></p>
                    <p><i ref={(bProcessCon)=> {this.bProcessCon = bProcessCon}}></i><b ref={(bProcess)=> {this.bProcess = bProcess}}></b></p>
                    <p><i className="iconfont icon-yinliang" onClick={this.handleVoiceClick} ref={(iconVoice) => {this.iconVoice=iconVoice}}></i></p>
                    <p><i ref={(bvoiceCon)=> {this.bvoiceCon = bvoiceCon}}></i><b ref={(bvoice)=> {this.bvoice = bvoice}}></b></p>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getAudioInfo();
        this.vx=50;
        this.audio.volume=this.vx/100;
        this.bvoiceCon.style.width = this.vx + 'px';
        this.bvoice.style.left = this.vx + 'px';
        this.BVWidth=this.bvoice.parentNode.offsetWidth;
        this.BPWidth=this.bProcess.parentNode.offsetWidth;
        this.audio.addEventListener('timeupdate', this.hanleTimeChange);
        this.bvoice.addEventListener('mousedown', this.handleVoiceMouseDown);
        this.bProcess.addEventListener('mousedown',this.handleProcessMouseDown);
    }
    componentWillUnmount() {
        this.audio.removeEventListener('timeupdate', this.hanleTimeChange);
    }
    handleVoiceMouseDown(e){
       this.VX=e.clientX -this.bvoice.offsetLeft;
        document.addEventListener('mousemove', this.handleVoiceMouseMove);
        document.addEventListener('mouseup',this.handleVoiceMouseUp);        
    }
    handleVoiceMouseMove(e) {
        this.vx = e.clientX - this.VX;
        if (this.vx >= this.BVWidth)this.vx=this.BVWidth;
        if(this.vx <= 0)this.vx=0;
        this.bvoiceCon.style.width=this.vx+'px';        
        this.bvoice.style.left = this.vx + 'px';
        this.audio.volume=this.vx/100;
       this.vx === 0 ? $(this.iconVoice).removeClass('icon-yinliang').addClass('icon-ttpodicon') : $(this.iconVoice).removeClass('icon-ttpodicon').addClass('icon-yinliang');
        return false;
    }
    handleFalseClick() {
        return false;
    }
    handleVoiceMouseUp() {
        document.removeEventListener('mousemove', this.handleVoiceMouseMove);
        document.removeEventListener('mouseup', this.handleVoiceMouseUp);
    }

    handleProcessMouseDown(e) {
        this.PX = e.clientX - this.bProcess.offsetLeft;
        this.speed=(this.BPWidth/this.audio.duration);
        document.addEventListener('mousemove', this.handleProcessMouseMove);
        document.addEventListener('mouseup', this.handleProcessMouseUp);
    }
    handleProcessMouseMove(e) {
        this.px = e.clientX - this.PX;
        if (this.px >= this.BPWidth) this.px = this.BPWidth;
        if (this.px <= 0) this.px = 0;
        this.bProcessCon.style.width = this.px + 'px';
        this.bProcess.style.left = this.px + 'px';
        this.audio.currentTime=(this.px/this.speed);
        if(this.px === this.BPWidth){
            $(this.iconPlay).removeClass('icon-zanting1').addClass('icon-play');
        }else{
            this.audio.play();
            $(this.iconPlay).removeClass('icon-play').addClass('icon-zanting1');
        }
        return false;
    }
    handleProcessMouseUp() {
        document.removeEventListener('mousemove', this.handleProcessMouseMove);
        document.removeEventListener('mouseup', this.handleProcessMouseUp);
    }
    handlePlayClick(e) {
        var playing = e.target.getAttribute('class');
        if (this.state.isPlaying) {
            this.audio.play();
            playing = playing.replace('icon-play', 'icon-zanting1');
            e.target.setAttribute('class', playing);
        } else {
            this.audio.pause();
            playing = playing.replace('icon-zanting1', 'icon-play');
            e.target.setAttribute('class', playing);
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    handleVoiceClick(e) {
        var voice = e.target.getAttribute('class');
        if (this.state.isVoice) {
            this.audio.muted = true;
            voice = voice.replace('icon-yinliang', 'icon-ttpodicon');
            e.target.setAttribute('class', voice);
            $(this.bvoice).css({'left':0})
            $(this.bvoiceCon).css({'width':0})
        } else {
            this.audio.muted = false;
            voice = voice.replace('icon-ttpodicon', 'icon-yinliang' );
            e.target.setAttribute('class', voice);
            $(this.bvoice).css({'left':50});
             $(this.bvoice).css({'left':50})
            $(this.bvoiceCon).css({'width':50})
        }
        this.setState({
            isVoice: !this.state.isVoice
        })
    }

    getAudioInfo() {
        setTimeout(() => {
            this.setState({
                isvoiceTime: ((this.audio.duration-15) / 60).toFixed(2)
            });
        }, 700)
    }

    hanleTimeChange() {
        var _stime = Math.round(this.audio.currentTime);
        this.speed=(this.BPWidth/this.audio.duration);
        var a = _stime % 60;
        var b = Math.floor(_stime / 60);
        if (a < 10) this.stime.innerText = b + ':0' + a;
        else if (a < 60) this.stime.innerText = b + ':' + a;
        $(this.bProcess).css({'left':this.speed*_stime});
        $(this.bProcessCon).css({'width':this.speed*_stime});
        if( Math.ceil(this.speed*_stime) ===this.BPWidth){
            this.stime.innerText ='0:00'
            $(this.bProcess).css({'left':0});
            $(this.bProcessCon).css({'width':0});
            $(this.iconPlay).removeClass('icon-zanting1').addClass('icon-play');
        }
    }
}