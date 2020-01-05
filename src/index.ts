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

$(".test").slider({step: 10, isDiscrete: true});

// function setPosition(pos: string) {
//     (<HTMLElement>document.querySelector('#handler')).style.left = pos;
// }




