import * as $ from 'jquery'

export class View {

    handler: JQuery;
    
    constructor() {
    }

    buildSlider(elem: JQuery, handlerId: string, sliderId: string) {
        let handler = '<div class="slider__handler" id="' + handlerId + '"></div>';

        elem.addClass("slider");
        elem.attr("id", sliderId);
        elem.append(handler);
    }

    addEventListener(elem: JQuery) {
        elem.children().mousedown(function(e) {
            e.preventDefault()

            let shiftX = e.clientX - elem.children().position().left;
            function moveAt(pageX: number) {
                if((pageX - shiftX) > 0 && (pageX - shiftX ) < 265) {
                    elem.children().css("left",  pageX - shiftX + 'px');
                }
            }

            function onMouseMove(e: any) {
                moveAt(e.pageX);
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

        });
    }
}