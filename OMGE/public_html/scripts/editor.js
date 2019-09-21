/*
 Name:  Jaiquon Smith aka Jaysds1
 --[[-------------------------------------------------
 Notes:
 
 > This code is using a relative image filepath. This will only work as long as the location it is from always exists, and the resource it is part of is running.
 To ensure it does not break, it is highly encouraged to move images into your local resource and reference them there.
 --]]-------------------------------------------------
 
 
 GUIEditor = {
 tab = {},
 progressbar = {},
 edit = {},
 label = {},
 window = {},
 checkbox = {},
 memo = {},
 scrollpane = {},
 staticimage = {},
 tabpanel = {},
 radiobutton = {},
 button = {},
 gridlist = {},
 scrollbar = {},
 combobox = {}
 }
 addEventHandler("onClientResourceStart", resourceRoot,
 function()
 local screenW, screenH = guiGetScreenSize()
 GUIEditor.window[1] = guiCreateWindow((screenW - 721) / 2, (screenH - 391) / 2, 721, 391, "", false)
 guiWindowSetSizable(GUIEditor.window[1], false)
 
 
 guiSetProperty(GUIEditor.button[1], "NormalTextColour", "FFAAAAAA")
 
 
 
 
 
 
 
 GUIEditor.tabpanel[1] = guiCreateTabPanel(276, 92, 135, 134, false, GUIEditor.window[1])
 
 GUIEditor.tab[1] = guiCreateTab("Tab", GUIEditor.tabpanel[1])
 
 
 GUIEditor.scrollbar[1] = guiCreateScrollBar(528, 86, 77, 29, true, false, GUIEditor.window[1])
 GUIEditor.scrollbar[2] = guiCreateScrollBar(620, 90, 31, 135, false, false, GUIEditor.window[1])
 guiScrollBarSetScrollPosition(GUIEditor.scrollbar[2], 100.0)
 GUIEditor.scrollpane[1] = guiCreateScrollPane(279, 253, 132, 96, false, GUIEditor.window[1])
 
 end
 )
 */
/*{
 }; */

var status, srcElement, menu = {},
        Editor = {
            tab: [],
            progressbar: [],
            edit: [],
            label: [],
            window: [],
            checkbox: [],
            memo: [],
            scrollpane: [],
            staticimage: [],
            tabpanel: [],
            radiobutton: [],
            button: [],
            gridlist: [],
            scrollbar: [],
            combobox: []
        }; //Element Storage

window.onload = function () {
    var l = document.getElementById('loader'); //Get loader
    l.style.display = 'block'; //Show loader

    window.body = document.getElementById('canvas'); //Get window canvas
    status = new Status('Right click to start!'); //Instructionss


    //Create menu-ready interactions
    menu['body'] = new Menu(0, 0);
    menu['create'] = new Menu(0, 0);
    menu['move'] = new Menu(0, 0);
    menu['resize'] = new Menu(0, 0);
    menu['position'] = new Menu(0, 0);
    menu['dimension'] = new Menu(0, 0);

    //Start Organizing the body first
    menu['body'].setSize(150, 300);
    //Create menu interaction
    var create = menu['body'].addItem('Create');
    create.onmouseover = function () { //Show Creation Menu
        hideMenu('create');
        showMenu('create', 1);
        new Status('Select an element in the "Create Item" Menu');
    };
    create.onclick = function (e) {
        e.preventDefault();
    };
    //Move menu interaction
    var move = menu['body'].addItem('Move');
    move.onclick = function () {
        if (!isMovable(srcElement)) //Is element movable?
            return new Status('Element not movable!', 2);

        body.addEventListener('mousemove', _moveXY);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveXY);
        };
        hideAll();
        new Status('Left Click when you are done');
    };
    move.onmouseover = function () { //Show Moving Menu
        if (!isMovable(srcElement)) //Is element movable?
            return new Status('Element not movable!', 2);

        hideMenu('move');
        showMenu('move', 1.5);
        new Status('Select "Move" to position the element anywhere');
    };
    //Resize menu interaction
    var resize = menu['body'].addItem('Resize');
    resize.onclick = function () { //Resize Width and Height
        if (!isSizable(srcElement)) //Is element movable?
            return new Status('Element not sizable!', 2);
        body.addEventListener('mousemove', _resizeWH);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeWH);
        };
        hideAll();
        new Status('Left Click when you are done');
    };
    resize.onmouseover = function () { //Show Resizing Menu
        if (!isSizable(srcElement)) //Is element movable?
            return new Status('Element not sizable!', 2);
        
        hideMenu('resize');
        showMenu('resize', 2);
        new Status('Select "Resize" to resize the width and height');
    };
    //Text Selection
    var text = menu['body'].addItem('Set Text');
    text.onclick = function () { //Set Selected Element Text
        var newText = prompt('Set New Text');
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return new Status('Element not found. Delete and create Element again.');
        gui.setText(newText);
        hideAll();
        new Status('Text Successfully Changed!');
    };
    //Set color
    var color = menu['body'].addItem('Set Color');
    color.onclick = function () {
        var newColor = prompt('Enter A Color Name');
        srcElement.style.color = newColor + '';
        hideAll();
        new Status('Color Successfully Changed!');
    };
    var alpha = menu['body'].addItem('Alpha');
    alpha.onclick = function () { //Show Alpha-ing Menu
        var newAlpha = prompt('Enter a value between 0-100');
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return new Status('Element not found. Delete and create Element again.');
        gui.setAlpha(newAlpha);
        hideAll();
        new Status('Alpha Successfully Changed!');
    };
    //menu['body'].addItem('Variable:');
    //menu['body'].addItem('');
    //menu['body'].addItem('Output Type:');
    var movable = menu['body'].addItem('Set Movable');
    movable.onclick = function () {
        if (menu['body'].getItemText(menu['body'].getSelected()) === 'Set unMovable') {
            srcElement.dataset.movable = "false";
            menu['body'].setItemText(movable.id, 'Set Movable');
        } else {
            srcElement.dataset.movable = "true";
            menu['body'].setItemText(movable.id, 'Set unMovable');
        }
        hideAll();
    };
    var size = menu['body'].addItem('Set Sizable');
    size.onclick = function () {
        if (menu['body'].getItemText(menu['body'].getSelected()) === 'Set unSizable') {
            srcElement.dataset.sizable = "false";
            menu['body'].setItemText(size.id, 'Set Sizable');
        } else {
            srcElement.dataset.sizable = "true";
            menu['body'].setItemText(size.id, 'Set unSizable');
        }
        hideAll();
    };
    var position = menu['body'].addItem('Set Position Code');
    position.onmouseover = function () { //Show Positioning Menu
        if (!isMovable(srcElement)) //Is element movable?
            return new Status('Element not movable!', 2);

        hideMenu('position');
        showMenu('position', 7);
        new Status('Fast Element Positioniong');
    };
    var dimension = menu['body'].addItem('Dimensions');
    dimension.onmouseover = function () { //Show Dimensioning Menu
        if (!isSizable(srcElement)&&!isMovable(srcElement)) //Is element sizable and movable?
            return new Status('Element not sizable and movable!', 2);
        
        hideMenu('dimension');
        showMenu('dimension', 7.5);
    };
    //menu['body'].addItem('Properties');
    var back = menu['body'].addItem('Move To Back');
    back.onclick = function (e) { //Move Selected Element Back
        if (e.target !== back)
            return;
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return status.setText('Element not found. Delete and create Element again.');
        gui.moveToBack();
        hideAll();
    };
    //var copy = menu['body'].addItem('Copy');
    //menu['body'].addItem('Parent Menu');
    var del = menu['body'].addItem('Delete');
    del.onclick = function (e) { //Delete Selected Element
        if (e.target !== del)
            return;
        var gui = getGuiByElement(srcElement);
        if (!gui)
            return status.setText("Could not delete element.");
        gui.destroy();
        hideAll();
    };
    //Cancel out the menu
    var cancel = menu['body'].addItem('Cancel');
    cancel.onclick = function () {
        hideAll();
    };
    //Output Code
    var outputCode = menu['body'].addItem('Output');
    outputCode.onclick = function () {
        var output = window.open('output.html', '', '', false);
        output.onload = (function () {
            var _document = this.document;
            var memo = _document.getElementById('output');
            memo.innerHTML = 'GUIEditor = {\n\twindow = {},\n\t';
            for (var ele in Editor) {
                if (Editor[ele].length !== 0) {
                    memo.innerHTML += ele + ' = {},\n\t';
                }
            }
            memo.innerHTML += '}\n\n\GUIEditor.window[0] = guiCreateWindow(' +
                    window.screenLeft + ',' +
                    window.screenTop + ',' +
                    window.innerWidth + ',' +
                    window.innerHeight + ',' +
                    window.document.title + ',false)\n';
            for (var ele in Editor) {
                if (Editor[ele].length !== 0) {
                    for (var i = 0; i < Editor[ele].length; i++) {
                        var gui = Editor[ele][i];

                        var tmp = '';
                        switch (ele) {
                            /*tab: [],
                             scrollpane: [],
                             tabpanel: [],
                             scrollbar: [],*/
                            case 'button':
                                var pos = gui.getPosition(),
                                        size = gui.getSize(),
                                        val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateButton(' + pos.x + ', ' + pos.y + ', ' + size.width + ', ' + size.height + ', "' + val + '", false, GUIEditor.window[0])';
                                break;
                            case 'memo':
                                var pos = gui.getPosition(),
                                        size = gui.getSize(),
                                        val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateMemo('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, GUIEditor.window[1])';
                                break;
                            case 'label':
                                var pos = gui.getPosition(),
                                size = gui.getSize(),
                                val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateLabel('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, GUIEditor.window[1])';
                                break;
                            case 'checkbox':
                                var pos = gui.getPosition(),
                                size = gui.getSize(),
                                val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateCheckBox('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, false, GUIEditor.window[1])';
                                break;
                            case 'edit':
                                var pos = gui.getPosition(),
                                size = gui.getSize(),
                                val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateEdit('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, GUIEditor.window[1])';
                                break;
                            case 'progressbar':
                                var pos = gui.getPosition(),
                                size = gui.getSize();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateProgressBar('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', false, GUIEditor.window[1])';
                                //guiProgressBarSetProgress(GUIEditor.progressbar[1], 50)
                                break;
                            case 'radiobutton':
                                var pos = gui.getPosition(),
                                size = gui.getSize(),
                                val = gui.getText();
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateRadioButton('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, GUIEditor.window[1])';
                                break;
                            case 'gridlist':
                                tmpArray = elements['gridlist'];
                                //GUIEditor.gridlist[1] = guiCreateGridList(149, 89, 94, 24, false, GUIEditor.window[1])
                                break;
                            case 'staticimage':
                                var pos = gui.getPosition(),
                                size = gui.getSize();
                                //GUIEditor.staticimage[1] = guiCreateStaticImage(pos.x, pos.y, size.width, size.height, ":guieditor/client/colorpicker/palette.png", false, GUIEditor.window[1])
                                break;
                            case 'combobox':
                                var pos = gui.getPosition(),
                                size = gui.getSize(),
                                val = gui.getItemText(0);
                                tmp += 'GUIEditor.' + ele + '[' + i + '] = guiCreateComboBox('+pos.x+', '+pos.y+', '+size.width+', '+size.height+', "' + val + '", false, GUIEditor.window[1])';
                                break;
                        }
                        memo.innerHTML += tmp + '\n';
                    }
                }
            }
        });
    };


    //Create item Menu
    menu['create'].setItemText(0, "Create Item");
    menu['create'].setSize(150, 230);
    var button = menu['create'].addItem('Button');
    button.onclick = function (e) { //Create Button
        if (e.target !== button)
            return;
        
        var pos = menu['body'].getPosition();
        var btn = new Button(pos.x, pos.y, 100, 100, '', false);
        Editor['button'].push(btn);
        hideAll();
        
        //Resize afterwards
        srcElement=btn.element;
        resize.click();
    };
    var memo = menu['create'].addItem('Memo');
    memo.onclick = function (e) { //Create Memo
        if (e.target !== memo)
            return;
        
        var pos = menu['body'].getPosition();
        var mem = new Memo(pos.x, pos.y, 100, 100, '', false);
        Editor['memo'].push(mem);
        hideAll();
        
        //Resize afterwards
        srcElement=mem.element;
        resize.click();
    };
    var label = menu['create'].addItem('Label');
    label.onclick = function (e) { //Create Label
        if (e.target !== label)
            return;
        
        var pos = menu['body'].getPosition();
        var lbl = new Label(pos.x, pos.y, 100, 100, '', false);
        Editor['label'].push(lbl);
        hideAll();
        
        //Resize afterwards
        srcElement=lbl.element;
        resize.click();
    };
    var checkbox = menu['create'].addItem('Checkbox');
    checkbox.onclick = function (e) { //Create CheckBox
        if (e.target !== checkbox)
            return;
        
        var pos = menu['body'].getPosition();
        var cbox = new CheckBox(pos.x, pos.y, 100, 100, '', false);
        Editor['checkbox'].push(cbox);
        hideAll();
        
        //Resize afterwards
        srcElement=cbox.element;
        resize.click();
    };
    var edit = menu['create'].addItem('Edit box');
    edit.onclick = function (e) { //Create Edit
        if (e.target !== edit)
            return;
        
        var pos = menu['body'].getPosition();
        var edt = new Edit(pos.x, pos.y, 100, 50, '', false);
        Editor['edit'].push(edt);
        hideAll();
        
        //Resize afterwards
        srcElement=edt.element;
        resize.click();
    };
    var progress = menu['create'].addItem('Progress Bar');
    progress.onclick = function (e) { //Create ProgressBar
        if (e.target !== progress)
            return;
        
        var pos = menu['body'].getPosition();
        var prog = new ProgressBar(pos.x, pos.y, 100, 50, false);
        Editor['progressbar'].push(prog);
        hideAll();
        
        //Resize afterwards
        srcElement=prog.element;
        resize.click();
    };
    var radio = menu['create'].addItem('Radio Button');
    radio.onclick = function (e) { //Create RadioButton
        if (e.target !== radio)
            return;
        
        var pos = menu['body'].getPosition();
        var rad = new RadioButton(pos.x, pos.y, 100, 100, '', false);
        Editor['radiobutton'].push(rad);
        hideAll();
        
        //Resize afterwards
        srcElement=rad.element;
        resize.click();
    };
    var gridlist = menu['create'].addItem('Gridlist');
    gridlist.onclick = function (e) { //Create Gridlist
        return new Status('Gridlist not available.',3);
        if (e.target !== gridlist)
            return;
        
        var pos = menu['body'].getPosition();
        hideAll();
        
        //Resize afterwards
        srcElement=grid.element;
        resize.click();
    };
    var tabpanel = menu['create'].addItem('Tab Panel');
    tabpanel.onclick = function (e) { //Create TabPanel
        return new Status('Tab Panel not available.',3);
        if (e.target !== tabpanel)
            return;
        
        var pos = menu['body'].getPosition();
        hideAll();
    };
    var image = menu['create'].addItem('Image');
    image.onclick = function (e) { //Create Image
        if (e.target !== image)
            return;
        var pos = menu['body'].getPosition();
        var img = new StaticImage(pos.x, pos.y, 100, 100, '', false);
        Editor['staticimage'].push(img);
        hideAll();
        
        //Resize afterwards
        srcElement=img.element;
        resize.click();
    };
    var scrollbar = menu['create'].addItem('Scrollbar');
    scrollbar.onclick = function (e) { //Create ScrollBar
        return new Status('ScrollBar not available.',3);
        
        if (e.target !== scrollbar)
            return;
        
        var pos = menu['body'].getPosition();
        Editor['scrollbar'].push(new ScrollBar());
        hideAll();
    };
    var scrollpane = menu['create'].addItem('Scrollpane');
    scrollpane.onclick = function (e) { //Create ScrollPane
        return new Status('ScrollPane not available.',3);
        
        if (e.target !== scrollpane)
            return;
        
        var pos = menu['body'].getPosition();
        Editor['scrollpane'].push(new ScrollPane(pos.x, pos.y));
        hideAll();
    };
    var combobox = menu['create'].addItem('Combobox');
    combobox.onclick = function (e) { //Create ComboBox
        if (e.target !== combobox)
            return;
        
        var pos = menu['body'].getPosition();
        var combox = new ComboBox(pos.x, pos.y, 100, 100, '', false);
        combox.setEnabled(false);
        Editor['combobox'].push(combox);
        hideAll();
        
        //Resize afterwards
        srcElement=combox.element;
        resize.click();
    };


    //Movement Memu
    menu['move'].setSize(150, 80);
    menu['move'].setItemText(0, 'Movement');
    var moveX = menu['move'].addItem('Move X');
    moveX.onclick = function () {
        new Status('Moving from Left to Right',2);
        body.addEventListener('mousemove', _moveX);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveX);
        };
        hideAll();
    };
    var moveY = menu['move'].addItem('Move Y');
    moveY.onclick = function () {
        new Status('Moving from Top to Bottom',2);
        body.addEventListener('mousemove', _moveY);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _moveY);
        };
        hideAll();
    };


    //Resizement Menu
    menu['resize'].setSize(150, 80);
    menu['resize'].setItemText(0, 'Resize');
    var resizeWidth = menu['resize'].addItem('Resize Width');
    resizeWidth.onclick = function () {
        new Status('Resizing Width Only',2);
        body.addEventListener('mousemove', _resizeWidth);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeWidth);
        };
        hideAll();
    };
    var resizeHeight = menu['resize'].addItem('Resize Height');
    resizeHeight.onclick = function () {
        new Status('Resizing Height Only',2);
        body.addEventListener('mousemove', _resizeHeight);
        srcElement.onclick = function () {
            body.removeEventListener('mousemove', _resizeHeight);
        };
        hideAll();
    };
    var parentWidth = menu['resize'].addItem('Fit Parent Width');
    parentWidth.onclick = function (e) {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        gui.setSize(window.innerWidth, size.height);
        hideAll();
    };
    var parentHeight = menu['resize'].addItem('Fit Parent Height');
    parentHeight.onclick = function (e) {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        gui.setSize(size.width, window.innerHeight);
        hideAll();
    };


    //Positioning Menu
    menu['position'].setSize(150, 100);
    menu['position'].setItemText(0, 'Positioning');
    var center = menu['position'].addItem('Center');
    center.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        //Find Window center
        var wSize = {width: window.innerWidth, height: window.innerHeight};
        var wCenter = {x: wSize.width / 2, y: wSize.height / 2};
        gui.setPosition(wCenter.x - size.width / 2, wCenter.y - size.height / 2);
        hideAll();
    };
    var snapTop = menu['position'].addItem('Snap Top');
    snapTop.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        gui.setPosition(position.x, 0);
        hideAll();
    };
    var snapRight = menu['position'].addItem('Snap Right');
    snapRight.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        var size = gui.getSize();
        gui.setPosition(window.innerWidth - size.width, position.y);
        hideAll();
    };
    var snapBottom = menu['position'].addItem('Snap Bottom');
    snapBottom.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        var size = gui.getSize();
        gui.setPosition(position.x, window.innerWidth - size.height);
        hideAll();
    };
    var snapLeft = menu['position'].addItem('Snap Left');
    snapLeft.onclick = function () {
        var gui = getGuiByElement(srcElement);
        var position = gui.getPosition();
        gui.setPosition(0, position.y);
        hideAll();
    };


    //Dimension Menu
    menu['dimension'].setSize(150, 100);
    menu['dimension'].setItemText(0, 'Dimensions');
    var setX = menu['dimension'].addItem('Set X: ');
    setX.onclick = function () {
        if (!isMovable(srcElement)) //Is element movable?
            return new Status('Element not movable!', 2);
        
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var newX = prompt('Enter new X position');
        gui.setPosition(newX, pos.y);
        hideAll();
    };
    var setY = menu['dimension'].addItem('Set Y: ');
    setY.onclick = function () {
        if (!isMovable(srcElement)) //Is element movable?
            return new Status('Element not movable!', 2);
        
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        var newY = prompt('Enter new Y position');
        gui.setPosition(pos.x, newY);
        hideAll();
    };
    var setWidth = menu['dimension'].addItem('Set Width: ');
    setWidth.onclick = function () {
        if (!isSizable(srcElement)) //Is element sizable?
            return new Status('Element not sizable!', 2);
        
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        var newW = prompt('Enter new Width size');
        gui.setSize(newW, size.height);
        hideAll();
    };
    var setHeight = menu['dimension'].addItem('Set Height: ');
    setHeight.onclick = function () {
        if (!isSizable(srcElement)) //Is element sizable?
            return new Status('Element not sizable!', 2);
        
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        var newH = prompt('Enter new Height size');
        gui.setSize(size.width, newH);
        hideAll();
    };
    //**************************Main window configuration*********************//
    body.oncontextmenu = function (e) { //Create custom context menu
        if (e.target.className !== 'rightclick' && e.target.className !== 'option') {
            var pos = {x: e.clientX, y: e.clientY};
            //Making the menu visible (if off-screen)
            if (pos.x + 150 > window.innerWidth)
                pos.x -= 150;
            if (pos.y + 200 > window.innerHeight)
                pos.y -= 200;
            menu['body'].show(pos.x, pos.y);
        }
        if (e.target === body) { //Check if body is target
            //srcElement = body; //Set selected element
            menu['body'].setItemText(0, 'Window'); //Change 'body' menu Title
        } else {//Changing Menu Values
            if (isMovable(srcElement)) //Movable/unMovable
                menu['body'].setItemText(movable.id, 'Set unMovable');
            else
                menu['body'].setItemText(movable.id, 'Set Movable');
            if (isSizable(srcElement)) //Sizable/unSizable
                menu['body'].setItemText(size.id, 'Set unSizable');
            else
                menu['body'].setItemText(size.id, 'Set Sizable');
        }
        e.preventDefault(); //Ignore original context menu
    };
    //Hide menu(s)
    body.onclick = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option') {
            for (var m in menu)
                menu[m].hide();
            new Status('Right Click to continue');
        }
    };
    body.onmouseover = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option') {
            for (var m in menu)
                if (m !== 'body') //Hide Menus (Excl. Body)
                    menu[m].hide();
            new Status('Right Click to continue');
        }
    };
    //Custom Menu Functions
    hideMenu = function (leave) { //Hide Menus (Excl. Body and Specified Menu)
        for (var m in menu)
            if (m !== 'body' && m !== leave)
                menu[m].hide();
    };
    showMenu = function (show, plusy) { //Show Menus (Excl. Body)
        var pos = menu['body'].getPosition();
        //Making the menu visible (if off-screen)
        if (pos.x + 300 > window.innerWidth)
            pos.x -= 300;
        if (pos.y + plusy * 20 * 2 > window.innerHeight)
            pos.y -= plusy * 20 * 2;
        menu[show].show(pos.x + 150, pos.y + (plusy * 20));
    };
    hideAll = function () {
        //Hide every other menu then the body menu afterwards
        hideMenu('body');
        menu['body'].hide();
    };
    
    function isMovable(element){
        return tobool(element.dataset.movable);
    }
    function isSizable(element){
        return tobool(element.dataset.sizable);
    }
    //Event Functions
    function _moveX(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition(),
                size = gui.getSize();
        gui.setPosition(e.clientX - size.width / 2, pos.y);
    }
    function _moveY(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition(),
                size = gui.getSize();
        gui.setPosition(pos.x, e.clientY - size.height / 2);
    }
    function _moveXY(e) {
        var gui = getGuiByElement(srcElement);
        var size = gui.getSize();
        gui.setPosition(e.clientX - size.width / 2, e.clientY - size.height / 2);
    }
    function _resizeWidth(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition(),
                size = gui.getSize();
        gui.setSize(e.clientX + 1 - pos.x, size.height);
    }
    function _resizeHeight(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition(),
                size = gui.getSize();
        gui.setSize(size.width, e.clientY + 1 - pos.y);
    }
    function _resizeWH(e) {
        var gui = getGuiByElement(srcElement);
        var pos = gui.getPosition();
        gui.setSize(e.clientX + 1 - pos.x, e.clientY + 1 - pos.y);
    }

    //Custom Functions
    function tobool(bool) {
        switch (bool) {
            case 'true':
            case 1:
                return true;
            case 'false':
            case 0:
                return false;
            default:
                return false;
        }
    }

    l.style.display = 'none'; //Stop loader
};