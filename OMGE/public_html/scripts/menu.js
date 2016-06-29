/*
 Name:  Jaiquon Smith
 */

function Menu(x, y) {
    this.menu = new ComboBox(x, y, 150, 200, 'Window', false);
    this.element = this.menu.element;
    this.element.multiple = true;
    this.element.className = 'rightclick';
    return this;
}
Menu.prototype = Object.create(ComboBox.prototype);
Menu.prototype.constructor = Menu;

Class = Menu.prototype;

Class.addItem = function(value) {
  var item = this.menu.addItem(value);
  item.className = 'option';
  return item;
};

Class.show = function (x, y) {
    this.element.style.display = 'block';
    if(x && y)
        this.menu.setPosition(x, y);
};
Class.hide = function () {
    this.element.style.display = 'none';
};
Class.isVisible = function() {
    return this.element.style.display === 'block';
};

Class.event = [];
Class.event.click = function (e) {
    
    e.preventDefault();
};