/*
 Name:  Jaiquon Smith
 */

GUI = function (element) {
    this.element = element;
    return this;
};
var Class = GUI.prototype;
Class.bringToFront = function () {
    this.element.style.zIndex = 1;
};
Class.moveToBack = function () {
    this.element.style.zIndex = 0;
};

Class.createFont = function (filepath, size) {
    this.font = filepath;
    this.size = size;
};

Class.setAlpha = function (alpha) {
    this.element.style.opacity = alpha;
};
Class.getAlpha = function () {
    return this.element.style.opacity;
};

Class.setEnabled = function (enabled) {
    this.element.disabled = !enabled;
};
Class.getEnabled = function () {
    return this.element.disabled;
};

Class.setFont = function (font) {
    this.element.style.fontFamily = font;
};
Class.getFont = function () {
    return this.element.style.fontFamily;
};

Class.setPosition = function (x, y, relative) {
    if (relative)
        this.element.style.position = 'relative';
    this.element.style.left = x+"px";
    this.element.style.top = y+"px";
};
Class.getPosition = function (relative) {
    var x = this.element.style.left, y = this.element.style.top;
    x = parseInt(x.substr(0,x.indexOf("p")));
    y = parseInt(y.substr(0,y.indexOf("p")));
    if (relative)
        x /= 100, y /= 100;
    return {x:x, y:y};
};

Class.setSize = function (width, height, relative) {
    if (relative)
        this.element.dataset.sizeRelative = true;
    this.element.style.width = width+'px';
    this.element.style.height = height+'px';
};
Class.getSize = function (relative) {
    var width = this.element.style.width, height = this.element.style.height;
    width = parseInt(width.substr(0,width.indexOf("p")));
    height = parseInt(height.substr(0,height.indexOf("p")));
    if (relative)
        width /= 100, height /= 100;
    return {width:width, height:height};
};

Class.setText = function (text) {
    this.element.value = text;
};
Class.getText = function () {
    return this.element.value;
};

Class.setVisible = function (visible) {
    this.element.hidden = !visible;
};
Class.getVisible = function () {
    return !this.element.hidden;
};

function gui(type,parent) {
    var gui = document.createElement(type);
    parent = parent || (body || document.getElementById('canvas'));
    parent.appendChild(gui);
    return gui || false;
}

function Button(x, y, width, height, text, relative, parent) {
    var element = gui('button', parent);
    GUI.call(this, element);

    var s = element.style;
    if (relative)
        s.position = 'relative';
    s.left = x+"px";
    s.top = y+"px";
    s.width = width+"px";
    s.height = height+"px";
    s.value = text;
    this.parent = parent;
    return this;
}
Button.prototype = Object.create(GUI.prototype);
Button.prototype.constructor = Button;

function CheckBox(x, y, width, height, text, selected, relative, parent) {
    var element = gui('input', parent);
    element.type = 'checkbox';
    GUI.call(this, element);

    var s = element.style;
    if (relative)
        s.position = 'relative';
    s.left = x+"px";
    s.top = y+"px";
    s.width = width+"px";
    s.height = height+"px";
    s.value = text;
    s.selected = selected;
    this.parent = parent;
    return this;
}
CheckBox.prototype = Object.create(GUI.prototype);
CheckBox.prototype.constructor = CheckBox;
Class = CheckBox.prototype;

Class.setSelected = function (selected) {
    this.element.checked = selected;
};
Class.getSelected = function () {
    return this.element.checked;
};

function ComboBox(x, y, width, height, caption, relative, parent) {
    var element = gui('select', parent);
    //element.dataset.caption = caption;
    GUI.call(this, element);

    var s = element.style;
    if (relative)
        s.position = 'relative';
    s.left = x+"px";
    s.top = y+"px";
    s.width = width+"px";
    s.height = height+"px";
    this.parent = parent;
    
    var title = this.addItem(caption);
    title.disabled = true;
    this.setSelected(0,false);
    return this;
}
ComboBox.prototype = Object.create(GUI.prototype);
ComboBox.prototype.constructor = ComboBox;
Class = ComboBox.prototype;

Class.addItem = function (value) {
    var element = gui('option', this.element);
    element.label = value;
    return element;
};
Class.clear = function () {
    this.element.innerHTML = '';
    return true;
};
Class.getItemText = function (id) {
    return this.element.childNodes[id].label;
};
Class.setItemText = function (id, text) {
    this.element.childNodes[id].label = text;
    return true;
};
Class.removeItem = function (id) {
    this.element.removeChild(this.element.childNodes[id]);
    return true;
};
Class.getSelected = function () {
    var element = this.element;
    for (var i = 0; i < element.length; i++)
        if (element.childNodes[i].selected)
            return i;
};
Class.setSelected = function (id,select) {
    this.element.childNodes[id].selected = select;
    return true;
};

function Edit(x, y, width, height, text, relative, parent) {
    var element = gui('input', parent);
    element.type = 'text';
    GUI.call(this, element);

    var s = element.style;
    if (relative)
        s.position = 'relative';
    s.left = x+"px";
    s.top = y+"px";
    s.width = width+"px";
    s.height = height+"px";
    element.dataset.caption = text;
    this.parent = parent;
    return this;
}
Edit.prototype = Object.create(GUI.prototype);
Edit.prototype.constructor = Edit;
Class = Edit.prototype;

Class.setMasked = function (status) {
    if (status)
        this.element.type = 'password';
    else
        this.element.type = 'text';
    return true;
};

Class.setMaxLength = function (length) {
    this.element.maxLength = length;
    return true;
};

Class.setReadOnly = function (status) {
    this.element.readOnly = status;
    return true;
};

Class.setCaretIndex = function(index) {
    this.element.selectionStart = index;
    return true;
};
Class.getCaretIndex = function() {
    return this.element.selectionStart;
};


function GridList(x,y,width,height,relative,parent) {
    return this;
}
GridList.prototype = Object.create(GUI.prototype);
GridList.prototype.constructor = GridList;
Class = GridList.prototype;

function Memo(x,y,width,height,text,relative,parent) {
    return this;
}
Memo.prototype = Object.create(GUI.prototype);
Memo.prototype.constructor = Memo;
Class = Memo.prototype;

function ProgressBar() {}
ProgressBar.prototype = Object.create(GUI.prototype);
ProgressBar.prototype.constructor = ProgressBar;
Class = ProgressBar.prototype;
function RadioButton() {}
RadioButton.prototype = Object.create(GUI.prototype);
RadioButton.prototype.constructor = RadioButton;
Class = RadioButton.prototype;
function ScrollBar() {}
ScrollBar.prototype = Object.create(GUI.prototype);
ScrollBar.prototype.constructor = ScrollBar;
Class = ScrollBar.prototype;
function ScrollPane() {}
ScrollPane.prototype = Object.create(GUI.prototype);
ScrollPane.prototype.constructor = ScrollPane;
Class = ScrollPane.prototype;
function StaticImage() {}
StaticImage.prototype = Object.create(GUI.prototype);
StaticImage.prototype.constructor = StaticImage;
Class = StaticImage.prototype;
function TabPanel() {}
TabPanel.prototype = Object.create(GUI.prototype);
TabPanel.prototype.constructor = TabPanel;
Class = TabPanel.prototype;
function Tab() {}
Tab.prototype = Object.create(GUI.prototype);
Tab.prototype.constructor = Tab;
Class = Tab.prototype;
function Label() {}
Label.prototype = Object.create(GUI.prototype);
Label.prototype.constructor = Label;
Class = Label.prototype;
function Window() {}
Window.prototype = Object.create(GUI.prototype);
Window.prototype.constructor = Window;
Class = Window.prototype;


//******************************Status Label**********************************//

Status = function(text){
    this.element = document.getElementById('status');
    if(text)
        this.element.innerHTML = text;
    return this;
};
Class = Status.prototype;

Class.setText = function(text) {
    this.element.innerHTML = text;
};

Class.setLevel = function(level) {
    var c = this.element.style.color;
    switch(level) {
        case 0:
             c = 'white';
            break;
        case 1:
            c = 'orange';
            break;
        case 2:
            c = 'red';
            break;
    }
};