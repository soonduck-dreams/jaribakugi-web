let layoutManager = {

    stage: new Konva.Stage({
        container: 'canvas',
        width: document.querySelector('#canvas-parent').offsetWidth,
        height: document.querySelector('#canvas-parent').offsetHeight,
    }),
    
    layer: new Konva.Layer(),
    initialWindowWidth: window.innerWidth,
    initialStageWidth: document.querySelector('#canvas-parent').offsetWidth,

    initSpace: function() {
        this.stage.add(this.layer);
        this.layer.draw();
    },

    trimToFit: function() {
        this.stage.width(window.innerWidth - document.querySelector('#sidebar').offsetWidth);
        this.stage.height(document.querySelector('#canvas-parent').offsetHeight)
    },

};