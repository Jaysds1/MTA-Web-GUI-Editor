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
 
 GUIEditor.button[1] = guiCreateButton(13, 25, 104, 30, "", false, GUIEditor.window[1])
 guiSetProperty(GUIEditor.button[1], "NormalTextColour", "FFAAAAAA")
 GUIEditor.memo[1] = guiCreateMemo(144, 29, 109, 26, "", false, GUIEditor.window[1])
 GUIEditor.label[1] = guiCreateLabel(280, 30, 131, 25, "Default", false, GUIEditor.window[1])
 GUIEditor.checkbox[1] = guiCreateCheckBox(420, 26, 55, 29, "Default", false, false, GUIEditor.window[1])
 GUIEditor.edit[1] = guiCreateEdit(540, 25, 65, 30, "", false, GUIEditor.window[1])
 GUIEditor.progressbar[1] = guiCreateProgressBar(622, 20, 71, 35, false, GUIEditor.window[1])
 guiProgressBarSetProgress(GUIEditor.progressbar[1], 50)
 GUIEditor.radiobutton[1] = guiCreateRadioButton(20, 75, 97, 48, "Default", false, GUIEditor.window[1])
 GUIEditor.gridlist[1] = guiCreateGridList(149, 89, 94, 24, false, GUIEditor.window[1])
 GUIEditor.tabpanel[1] = guiCreateTabPanel(276, 92, 135, 134, false, GUIEditor.window[1])
 
 GUIEditor.tab[1] = guiCreateTab("Tab", GUIEditor.tabpanel[1])
 
 GUIEditor.staticimage[1] = guiCreateStaticImage(420, 85, 65, 40, ":guieditor/client/colorpicker/palette.png", false, GUIEditor.window[1])
 GUIEditor.scrollbar[1] = guiCreateScrollBar(528, 86, 77, 29, true, false, GUIEditor.window[1])
 GUIEditor.scrollbar[2] = guiCreateScrollBar(620, 90, 31, 135, false, false, GUIEditor.window[1])
 guiScrollBarSetScrollPosition(GUIEditor.scrollbar[2], 100.0)
 GUIEditor.scrollpane[1] = guiCreateScrollPane(279, 253, 132, 96, false, GUIEditor.window[1])
 GUIEditor.combobox[1] = guiCreateComboBox(30, 251, 223, 83, "", false, GUIEditor.window[1])    
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
    status = new Status('Right click to start!'); //Instructions


    //Create menu-ready interactions
    menu['body'] = new Menu(0, 0);
    menu['create'] = new Menu(0, 0);
    menu['move'] = new Menu(0, 0);
    menu['resize'] = new Menu(0, 0);
    menu['movable'] = new Menu(0, 0);
    menu['size'] = new Menu(0, 0);
    menu['position'] = new Menu(0, 0);
    menu['dimension'] = new Menu(0, 0);

    //Start Organizing the body first
    menu['body'].setSize(150, 325);
    //Create menu interaction
    var create = menu['body'].addItem('Create');
    create.onmouseover = function () { //Show Creation Menu
        hideMenu('create');
        showMenu('create', 1);
    };
    //Move menu interaction
    var move = menu['body'].addItem('Move');
    move.onmouseover = function () { //Show Moving Menu
        hideMenu('move');
        showMenu('move', 2);
    };
    //Resize menu interaction
    var resize = menu['body'].addItem('Resize');
    resize.onmouseover = function () { //Show Resizing Menu
        hideMenu('resize');
        showMenu('resize', 3);
    };
    //Text Selection
    var text = menu['body'].addItem('Set Text');
    text.onclick = function (e) { //Set Selected Element Text
        var newText = prompt('Set new Text');
        var gui = getGuiByElement(srcElement);
        if(!gui)
            return status.setText('');
        gui.setText(newText);
    };
    //Set color
    var color = menu['body'].addItem('Set Color');
    color.onclick = function() {
        
    };
    var alpha = menu['body'].addItem('Alpha');
    alpha.onmouseover = function () { //Show Alpha-ing Menu
        hideMenu('alpha');
        showMenu('alpha', 6);
    };
    //menu['body'].addItem('Variable:');
    //menu['body'].addItem('');
    //menu['body'].addItem('Output Type:');
    var movable = menu['body'].addItem('Movable');
    movable.onmouseover = function () { //Show Movable Menu
        hideMenu('movable');
        showMenu('movable', 7);
    };
    var size = menu['body'].addItem('Sizable');
    size.onmouseover = function () { //Show Sizing Menu
        hideMenu('size');
        showMenu('size', 8);
    };
    var position = menu['body'].addItem('Set Position Code');
    position.onmouseover = function () { //Show Positioning Menu
        hideMenu('position');
        showMenu('position', 9);
    };
    var dimension = menu['body'].addItem('Dimensions');
    dimension.onmouseover = function () { //Show Dimensioning Menu
        hideMenu('dimension');
        showMenu('dimension', 10);
    };
    //menu['body'].addItem('Properties');
    var back = menu['body'].addItem('Move To Back');
    back.onclick = function (e) { //Move Selected Element Back
        if (e.target !== back)
            return;
        var gui = getGuiByElement(srcElement);
        if(!gui)
            return status.setText('');
        gui.moveToBack();
    };
    //var copy = menu['body'].addItem('Copy');
    //menu['body'].addItem('Parent Menu');
    var del = menu['body'].addItem('Delete');
    del.onclick = function (e) { //Delete Selected Element
        if (e.target !== del)
            return;
        var gui = getGuiByElement(srcElement);
        if(!gui)
            return status.setText("Could not delete element");
        gui.destroy();
    };
    //Cancel out the menu
    var cancel = menu['body'].addItem('Cancel');
    cancel.onclick = function () {
        hideMenu('body'); //Hide every other menu
        menu['body'].hide(); //Hide the body menu afterwards
    };

    //Create item Menu
    menu['create'].setItemText(0, "Create Item");
    menu['create'].setSize(150, 230);
    var button = menu['create'].addItem('Button');
    button.onclick = function (e) { //Create Button
        if (e.target !== button)
            return;
        var pos = menu['body'].getPosition();
        Editor['button'].push(new Button(pos.x, pos.y, 100, 100, '', false));
    };
    var memo = menu['create'].addItem('Memo');
    memo.onclick = function (e) { //Create Memo
        if (e.target !== memo)
            return;
        var pos = menu['body'].getPosition();
        Editor['memo'].push(new Memo(pos.x, pos.y, 100, 100, '', false));
    };
    var label = menu['create'].addItem('Label');
    label.onclick = function (e) { //Create Label
        if (e.target !== label)
            return;
        var pos = menu['body'].getPosition();
        Editor['label'].push(new Label(pos.x, pos.y, 100, 100, '', false));
    };
    var checkbox = menu['create'].addItem('Checkbox');
    checkbox.onclick = function (e) { //Create CheckBox
        if (e.target !== checkbox)
            return;
        var pos = menu['body'].getPosition();
        Editor['checkbox'].push(new CheckBox(pos.x, pos.y, 100, 100, '', false));
    };
    var edit = menu['create'].addItem('Edit box');
    edit.onclick = function(e) { //Create Edit
        if (e.target !== edit)
            return;
        var pos = menu['body'].getPosition();
        Editor['edit'].push(new Edit(pos.x,pos.y,100,50,'',false));
    };
    var progress = menu['create'].addItem('Progress Bar');
    progress.onclick = function(e) { //Create ProgressBar
        if (e.target !== progress)
            return;
        var pos = menu['body'].getPosition();
        Editor['progressbar'].push(new ProgressBar(pos.x,pos.y,100,50,false));
    };
    var radio = menu['create'].addItem('Radio Button');
    radio.onclick = function(e) { //Create RadioButton
        if (e.target !== radio)
            return;
        var pos = menu['body'].getPosition();
        Editor['radiobutton'].push(new RadioButton(pos.x,pos.y,100,100,'',false));
    };
    var gridlist = menu['create'].addItem('Gridlist');
    gridlist.onclick = function(e) { //Create Gridlist
        if (e.target !== gridlist)
            return;
        var pos = menu['body'].getPosition();
    };
    var tabpanel = menu['create'].addItem('Tab Panel');
    tabpanel.onclick = function(e) { //Create TabPanel
        if (e.target !== tabpanel)
            return;
        var pos = menu['body'].getPosition();
    };
    var image = menu['create'].addItem('Image');
    image.onclick = function(e) { //Create Image
        if (e.target !== image)
            return;
        var pos = menu['body'].getPosition();
        Editor['staticimage'].push(new StaticImage(pos.x,pos.y,100,100,'',false));
    };
    var scrollbar = menu['create'].addItem('Scrollbar');
    scrollbar.onclick = function(e) { //Create ScrollBar
        if (e.target !== scrollbar)
            return;
        var pos = menu['body'].getPosition();
        Editor['scrollbar'].push(new ScrollBar());
    };
    var scrollpane = menu['create'].addItem('Scrollpane');
    scrollpane.onclick = function(e) { //Create ScrollPane
        if (e.target !== scrollpane)
            return;
        var pos = menu['body'].getPosition();
        Editor['scrollpane'].push(new ScrollPane(pos.x,pos.y));
    };
    var combobox = menu['create'].addItem('Combobox');
    combobox.onclick = function(e) { //Create ComboBox
        if (e.target !== combobox)
            return;
        var pos = menu['body'].getPosition();
        Editor['combobox'].push(new ComboBox(pos.x,pos.y,100,100,'',false));
    };

    //Main window configuration
    body.oncontextmenu = function (e) { //Create custom context menu
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            menu['body'].show(e.clientX, e.clientY);
        if (e.target === body) { //Check if body is target
            srcElement = body; //Set selected element
            menu['body'].setItemText(0, 'Window'); //Change 'body' menu Title
        }
        e.preventDefault(); //Ignore original context menu
    };
    //Hide menu(s)
    body.onclick = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            for (var m in menu)
                menu[m].hide();
    };
    body.onmouseover = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            for (var m in menu)
                if (m !== 'body')
                    menu[m].hide();
    };
    
    //Custom Menu Functions
    hideMenu = function (leave) {
        for (var m in menu)
            if (m !== 'body' && m !== leave)
                menu[m].hide();
    };
    showMenu = function (show, plusy) {
        var pos = menu['body'].getPosition();
        menu[show].show(pos.x + 150, pos.y + (plusy * 20));
    };

    l.style.display = 'none'; //Stop loader
};