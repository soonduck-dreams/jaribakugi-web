class TableGraphic {
    tableGroup = new Konva.Group({
        draggable: true,
    });

    constructor(pos, name) {
        let tableRect = new Konva.Rect({
            x: 0, y: 0,
            width: TABLE_WIDTH, height: TABLE_HEIGHT,
            name: 'tableRect',
            fill: 'white', stroke: 'black', strokeWidth: 2,
        });

        let tableText = new Konva.Text({
            x: 0, y: 0,
            text: name,
            name: 'tableText',
            fontSize: 20,
            fill: 'black',
        });

        this.#alignCenter(tableRect);
        this.#alignCenter(tableText);

        this.tableGroup.x(pos.x);
        this.tableGroup.y(pos.y);
        this.tableGroup.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        this.tableGroup.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        this.tableGroup.add(tableRect);
        this.tableGroup.add(tableText);
        layoutManager.layer.add(this.tableGroup);
    }

    setPos(pos) {
        this.tableGroup.x(pos.x);
        this.tableGroup.y(pos.y);
    }

    setText(text) {
        let tableText = this.tableGroup.findOne('.tableText');
        tableText.text(text);

        this.#alignCenter(tableText);
    }

    remove() {
        this.tableGroup.destroy();
        this.tableGroup = null;
    }

    #alignCenter(self) {
        self.offsetX(self.width() / 2);
        self.offsetY(self.height() / 2);
    }
}

class Table {
    name = '';
    pos = null;
    display = 'name';
    #tableGraphic = null;

    constructor(pos, name) {
        this.name = name;
        this.pos = pos;
        this.#tableGraphic = new TableGraphic({x: pos.x, y: pos.y}, name);
    }

    setDisplay(type) {
        this.display = type;

        switch (this.display) {
            case 'name':
                this.#tableGraphic.setText(this.name);
                break;
            case 'hide':
                this.#tableGraphic.setText('???');
                break;
            default:
                console.log("Table.setDisplay(): 올바른 displayType이 아닙니다! displayType은 name, hide 중 하나여야 합니다.");
        }
    }

    setPos(pos) {
        this.pos = pos;
        this.#tableGraphic.setPos(pos);
    }

    remove() {
        this.#tableGraphic.remove();
        this.#tableGraphic = null;
    }
}