import * as $ from 'jquery'
import { RaiseMessage } from './interfaces/observer_interface';

export class View {

    handler: JQuery;
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
    // addEventListener(elem: JQuery) {
    //     elem.children().mousedown(function(e) {
    //         e.preventDefault()

    //         let shiftX = e.clientX - elem.children().position().left;
            // function moveAt(pageX: number) {
            //     if((pageX - shiftX) > 0 && (pageX - shiftX ) < 265) {
            //         elem.children().css("left",  pageX - shiftX + 'px');
            //     }
            // }

            // function onMouseMove(e: any) {
            //     moveAt(e.pageX);
            // }

            // function onMouseUp() {
            //     document.removeEventListener('mouseup', onMouseUp);
            //     document.removeEventListener('mousemove', onMouseMove);
            // }

            // document.addEventListener('mousemove', onMouseMove);
            // document.addEventListener('mouseup', onMouseUp);

    //     });
    // }
}