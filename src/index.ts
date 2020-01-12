import './style.scss'

import * as $ from 'jquery';
import { View } from './MVP/slider_view';
import { Model } from './MVP/model';
import { Presenter } from './MVP/slider_presenter';

$.fn.slider = function(this: JQuery, options ?: SliderOptions) {
    let model = new Model(options);
    let view = new View();

    let presenter = new Presenter(model, view);

    presenter.createSlider(this);
    return this;
}

$(".test").slider({step: 1,
                start:1488,
                end:8841,
                isDiscrete: false
            });



