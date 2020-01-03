import './style.scss'

import * as $ from 'jquery';
import { View } from './MVP/view';
import { Model } from './MVP/model';
import { Presenter } from './MVP/presenter';

$.fn.slider = function(this: JQuery, options ?: SliderOptions) {
    let model = new Model(options);
    let view = new View();

    let presenter = new Presenter(model, view);

    presenter.createSlider(this);
    return this;
}

$(".test").slider({step: 5});

// function posToValue(){
//     let handler = document.getElementById("handler")
//     let container = document.getElementById("container")
//     return handler.offsetLeft/container.clientWidth
// }

// function setPosition(pos: string) {
//     (<HTMLElement>document.querySelector('#handler')).style.left = pos;
// }



// let handler = <HTMLElement>document.querySelector('#handler_1');

// handler.onmousedown = function(e) {
//     e.preventDefault();

//     let shiftX = e.clientX - handler.getBoundingClientRect().left;

//     function moveAt(pageX: number) {
//         if((pageX - shiftX) > 0 && (pageX - shiftX ) < 265) {
//             handler.style.left = pageX - shiftX + 'px';
//             // console.log(Math.round(posToValue()*100));
//         }
//     }

//     function onMouseMove(e: any) {
//         moveAt(e.pageX);
//     }
    
//     function onMouseUp() {
//         document.removeEventListener('mouseup', onMouseUp);
//         document.removeEventListener('mousemove', onMouseMove);
//     }

//     moveAt(e.pageX);

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
// }


