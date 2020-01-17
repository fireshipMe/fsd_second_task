import './style.scss'

import * as $ from 'jquery';
import { View } from './MVP/slider_view';
import { Model } from './MVP/model';
import { Presenter } from './MVP/slider_presenter';

$.fn.slider = function(this: JQuery, options ?: SliderOptions) {
    let model = new Model(options);
    let view = new View();
    let presenter = new Presenter(model, view);

    Model.counter += 1;
    if(options.range) {
        presenter.createRangeSlider(this);
    } else {
        presenter.createSlider(this);
    }
    return this;
}

$(".test_1").slider({step: 1,
                start:0,
                end:100,
                isDiscrete: false
            });
$(".test_2").slider({step: 5,
                start:0,
                end:100,
                isDiscrete: true,
                range: true
});
$(".test_3").slider({step: 0.1,
                start:0,
                end:1.5,
                isDiscrete: true
});




