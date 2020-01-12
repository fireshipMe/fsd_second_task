export class Model {
    static counter: number = 0;

    sliderId: string;
    handlerId: string;
    elem: JQuery;
    currentPercentage: number;
    currentValue: number;
    arrValues: Array<number>;

    // Either step or discrete option is used
    defaults: SliderOptions = {
        step: 1,
        start: 0,
        end: 100,
        isDiscrete: true
    };

    constructor(options?:SliderOptions) {
        for(let key in options) {
            this.defaults[key] = options[key];
        }
        this.currentPercentage = 0;
        this.currentValue = 0;
    }
}