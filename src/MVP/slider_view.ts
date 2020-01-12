import * as $ from 'jquery'
import { RaiseMessage } from './interfaces/observer_interface';

export class View {

    observers: any;

    constructor() {
        this.observers = [];
    }

    // ************************************
    // Observer pattern subject-related methods
    // 

    addSub(sub: any) {
        this.observers.push(sub);
    }

    remSub(sub: any) {
        var index = this.observers.indexOf(sub);
        this.observers.splice(index, index);        
    }

    raise(data: RaiseMessage) {
        Array.prototype.forEach.call(this.observers, (sub: any) => {
            sub.recieve(data)
        })
    }

    //
    // ************************************
    //

    addEventListener(elem: JQuery) {
        let that = this;  
        elem.children().mousedown(function(e) {
            that.raise({message:"mousedown", event: e});
        });
    }
}