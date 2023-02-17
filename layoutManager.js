let scale = 1;

let layoutManager = {

    stage: new Konva.Stage({
        container: 'canvas',
        width: document.querySelector('#canvas-parent').offsetWidth,
        height: document.querySelector('#canvas-parent').offsetHeight,
        draggable: true
    }),
    
    layer: new Konva.Layer(),
    initialWindowWidth: window.innerWidth,
    initialStageWidth: document.querySelector('#canvas-parent').offsetWidth,

    initialText: new Konva.Text({
        x: document.querySelector('#canvas-parent').offsetWidth / 2,
        y: document.querySelector('#canvas-parent').offsetHeight / 2,
        text: '이곳에 교실이 생길 거예요.\n\n오른쪽 메뉴에서 교실을 만들어 보세요!',
        align: 'center',
        name: 'initialText',
        fontSize: 28,
        fontFamily: 'Noto Sans KR, sans-serif',
        fill: 'gray',
    }),

    initSpace: function() {
        this.initialText.offsetX(this.initialText.width() / 2);
        this.initialText.offsetY(this.initialText.height() / 2);
        this.layer.add(this.initialText);
        this.stage.add(this.layer);
        this.layer.draw();

        this.loadFromLocalStorage();
    },

    trimToFit: function() {
        this.stage.width(window.innerWidth - document.querySelector('#sidebar').offsetWidth);
        this.stage.height(document.querySelector('#canvas-parent').offsetHeight)
    },

    refitSpace: function() {
        this.initialText.destroy();

        this.stage.x(0);
        this.stage.y(0);

        scale = 1;
        layoutManager.stage.scale({ x: scale, y: scale });
        layoutManager.stage.batchDraw();
    },

    loadFromLocalStorage: function() {
        document.getElementById("people-male").value = localStorage.getItem('maleString');
        document.getElementById("people-female").value = localStorage.getItem('femaleString');
        document.getElementById("table-column").value = localStorage.getItem('tableColumn');
        document.getElementById("pairing-mf").checked = JSON.parse(localStorage.getItem('pairingMF'));
    }

};

document.getElementById('canvas').addEventListener('wheel', (event) => {
    const delta = event.deltaY;
    const sign = Math.sign(delta);

    console.log(sign);
    if (sign === -1) {
        scale *= 1.1;
    } else {
        scale /= 1.1;
    }

    layoutManager.stage.scale({ x: scale, y: scale });
    layoutManager.stage.batchDraw();

    event.preventDefault();
});