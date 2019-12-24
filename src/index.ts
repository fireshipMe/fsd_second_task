import './style.scss'

import * as $ from 'jquery';
import { View } from './MVP/view';

$.fn.slider = function(this: JQuery, options ?: SliderOptions) {
    const defaults: SliderOptions = {
        step: 1,
        interval: true
    }
    
    let view = new View();
    view.createSlider(this);

    return this;
}

function posToValue(){
    let handler = document.getElementById("handler")
    let container = document.getElementById("container")
    return handler.offsetLeft/container.clientWidth
}

function setPosition(pos: string) {
    (<HTMLElement>document.querySelector('#handler')).style.left = pos;
}

$(".test").slider();

let handler = <HTMLElement>document.querySelector('#handler');
handler.onmousedown = function(e) {
    e.preventDefault();

    let shiftX = e.clientX - handler.getBoundingClientRect().left;

    function moveAt(pageX: number) {
        if((pageX - shiftX) > 0 && (pageX - shiftX ) < 265) {
            handler.style.left = pageX - shiftX + 'px';
            // console.log(Math.round(posToValue()*100));
        }
    }

    function onMouseMove(e: any) {
        moveAt(e.pageX);
    }
    
    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

    moveAt(e.pageX);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}


