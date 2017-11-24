import React, { Component } from 'react';
import style from './style.mcss';

export default class Canvas extends Component {
    render() {
        return <canvas className={style['clock']} width="400" height="400" ref="clock"></canvas>
    }

    componentDidMount() {
        this.clock();
    }

    clock() {
        this.clock = this.refs.clock;
        this.ctx = this.clock.getContext("2d");
        var this_ = this;
		setInterval(function() {
			this_.ctx.clearRect(0,0,500,500);
			this_.drawClock();
		},1000); 
    }

    drawClock() {
        this.drawArc();
        this.drawCenterPoint();
		this.drawMinusPoint();
		this.drawHoursPoints();
		this.drawHoursNumber();
		this.drawTimes();
    }

    drawArc() {
        this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(250,250);
		this.ctx.arc(0, 0, 150, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.restore();
    }

    drawCenterPoint() {
        this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(250,250);
		this.ctx.arc(0, 0, 5, 0, Math.PI*2);
		this.ctx.fillStyle = "red";
		this.ctx.fill();
		this.ctx.restore();
    }

    drawMinusPoint() {
        this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		for(var i=0; i<60; i++) {
			this.ctx.moveTo(0,-146);
			this.ctx.lineTo(0,-144);
			this.ctx.rotate(Math.PI / 30);
		}
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
    }

    drawHoursPoints() {
        this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		for(var i=0; i<12; i++) {
			this.ctx.moveTo(0,-144);
			this.ctx.lineTo(0,-140);
			this.ctx.rotate(Math.PI / 6);
		}
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
    }

    drawHoursNumber() {
        this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		for(var i=1; i<=12; i++) {
			this.ctx.font = "20px Arial"; 
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillText(i, Math.sin(Math.PI * i / 6) * 130, - Math.cos(Math.PI * i / 6) * 130);
		}
		this.ctx.restore();
    }

    drawTimes() {
        var date = new Date(),
            seconds = date.getSeconds(),
            minutes = date.getMinutes(),
            hours = (date.getHours() % 12) + (minutes / 60);
    
        this.drawSeconds(seconds);
        this.drawMinutes(minutes);
        this.drawHours(hours);
    }

    drawSeconds(seconds) {
		this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * seconds / 30);
		this.ctx.moveTo(0,-100);
		this.ctx.lineTo(0,10);
		this.ctx.strokeStyle = "red";
		this.ctx.stroke();
		this.ctx.restore();
    }
    
    drawMinutes(minutes) {
		this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * minutes / 30);
		this.ctx.moveTo(0,-80);
		this.ctx.lineTo(0,10);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
    }
    
    drawHours (hours) {
		this.ctx.save();
		this.ctx.translate(250,250);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * hours / 6);
		this.ctx.moveTo(0,-50);
		this.ctx.lineTo(0,5);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
    }
}