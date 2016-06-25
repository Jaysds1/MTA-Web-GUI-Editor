/*
 Name:  Jaiquon Smith
 */
var menu, element;
function createMenu(type, event) {
    if (!menu) {
        menu = new ComboBox(event.clientX, event.clientY, 10, 10, 'Menu', false);
        element = menu.element;
        element.multiple = true;
        element.className = 'rightclick';
        element.style.opacity = .7;
    } else {
        menu.setPosition(event.clientX, event.clientY);
    }
    element.style.display = 'block';
    switch (type) {
        case 'main':

    }
}

function hideMenu() {
    if (element)
        element.style.display = 'none';
}