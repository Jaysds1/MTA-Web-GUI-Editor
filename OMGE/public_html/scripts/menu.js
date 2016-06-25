/*
 Name:  Jaiquon Smith
 */
var menu,element;
function createMenu(type, event) {
    if (!menu) {
        menu = new ComboBox(event.clientX, event.clientY, 10, 10, 'Menu', false);
        console
        element = menu.element;
        element.multiple = true;
        element.className = 'rightclick';
        element.style.opacity = .5;
        document.body.appendChild(element);
    }else{
        element.style.left = event.clientX+'px';
        element.style.top = event.clientY+'px';
    }
        element.style.display = 'block';
    switch (type) {
        case 'main':
            
    }
}

function hideMenu() {
    element.style.display = 'none';
}