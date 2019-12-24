interface SliderOptions {
    step?: number
    interval?: boolean
}

interface JQuery {
    slider(options?: SliderOptions): JQuery
}
