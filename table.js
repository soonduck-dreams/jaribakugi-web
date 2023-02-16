class TableGraphic {
    #tableGroup = new Konva.Group({
        draggable: true,
    });

    #parent = null;

    constructor(pos, name, parent) {
        this.#parent = parent;

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
            fontSize: 28,
            fontFamily: 'Noto Sans KR, sans-serif',
            fill: 'black',
        });

        this.#alignCenter(tableRect);
        this.#alignCenter(tableText);

        this.#tableGroup.x(pos.x);
        this.#tableGroup.y(pos.y);
        this.#tableGroup.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        this.#tableGroup.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
        this.#tableGroup.on('mouseup', function() {
            this.setDisplay('name', this.#parent.name);
        }.bind(this));

        this.#tableGroup.add(tableRect);
        this.#tableGroup.add(tableText);
        layoutManager.layer.add(this.#tableGroup);
    }

    setPos(pos) {
        this.#tableGroup.x(pos.x);
        this.#tableGroup.y(pos.y);
    }

    getPos() {
        return {
            x: this.#tableGroup.x(),
            y: this.#tableGroup.y()
        }
    }

    setText(text, color) {
        let tableText = this.#tableGroup.findOne('.tableText');
        tableText.text(text);
        tableText.fill(color);

        this.#alignCenter(tableText);
    }

    setRectColor(color) {
        let tableFill = this.#tableGroup.findOne('.tableRect');
        tableFill.fill(color);
    }

    setDisplay(type, name) {
        switch (type) {
            case 'name':
                this.setText(name, 'black');
                this.setRectColor('rgb(255, 255, 220)');
                break;
            case 'hide':
                this.setText('???', 'white');
                this.setRectColor('rgb(60, 60, 60)');
                break;
            case 'one':
                this.setText(cho_hangul(name[randomIndex(name)]), 'white');
                this.setRectColor('rgb(60, 60, 60)');
                break;
            default:
                console.log("Table.setDisplay(): 올바른 displayType이 아닙니다!");
        }
    }

    remove() {
        this.#tableGroup.destroy();
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
        this.#tableGraphic = new TableGraphic({x: pos.x, y: pos.y}, name, this);
        this.setDisplay('name');
    }

    setDisplay(type) {
        this.display = type;
        this.#tableGraphic.setDisplay(type, this.name);
    }

    setPos(pos) {
        this.pos = pos;
        this.#tableGraphic.setPos(pos);
    }

    getPos() {
        return this.#tableGraphic.getPos();
    }

    remove() {
        this.#tableGraphic.remove();
        this.#tableGraphic = null;
    }
}