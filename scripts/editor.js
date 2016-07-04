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
 window: window,
 button: {},
 memo: {},
 label: {},
 checkbox: {},
 editbox: {},
 progressbar: {},
 radiobutton: {},
 gridlist: {},
 tabpanel: {},
 image: {},
 scrollbar: {},
 scrollpane: {},
 combobox: {}
 }; */

var body, menu = {}, status;
window.onload = function () {
    body = document.getElementById('canvas');
    //status = new Status('Right click to start!');


    menu['body'] = new Menu(0, 0);
    menu['create'] = new Menu(0, 0);
    menu['move'] = new Menu(0,0);
    menu['move'] = new Menu(0,0);
    menu['size'] = new Menu(0,0);
    menu['position'] = new Menu(0,0);
    menu['dimension'] = new Menu(0,0);

    menu['body'].setSize(150, 325);
    var create = menu['body'].addItem('Create');
    create.onmouseover = function () {
        hideMenu('create');
        var pos = menu['body'].getPosition();
        menu['create'].show(pos.x + 150, pos.y + 20);
    };
    var move = menu['body'].addItem('Move');
    move.onmouseover = function () {
        hideMenu('move');
        var pos = menu['body'].getPosition();
        menu['move'].show(pos.x + 150, pos.y + 40);
    };
    var resize = menu['body'].addItem('Resize');
    resize.onmouseover = function () {
        hideMenu('resize');
        var pos = menu['body'].getPosition();
        menu['resize'].show(pos.x + 150, pos.y + 40);
    };
    menu['body'].addItem('Set Text');
    menu['body'].addItem('Set Color');
    var alpha = menu['body'].addItem('Alpha');
    alpha.onmouseover = function () {
        hideMenu('alpha');
        var pos = menu['body'].getPosition();
        menu['alpha'].show(pos.x + 150, pos.y + 40);
    };
    //menu['body'].addItem('Variable:');
    //menu['body'].addItem('');
    //menu['body'].addItem('Output Type:');
    var movable = menu['body'].addItem('Movable');
    movable.onmouseover = function () {
        hideMenu('movable');
        var pos = menu['body'].getPosition();
        menu['movable'].show(pos.x + 150, pos.y + 40);
    };
    var size = menu['body'].addItem('Sizable');
    size.onmouseover = function () {
        hideMenu('size');
        var pos = menu['body'].getPosition();
        menu['size'].show(pos.x + 150, pos.y + 40);
    };
    var position = menu['body'].addItem('Set Position Code');
    position.onmouseover = function () {
        hideMenu('position');
        var pos = menu['body'].getPosition();
        menu['position'].show(pos.x + 150, pos.y + 40);
    };
    var dimension = menu['body'].addItem('Dimensions');
    dimension.onmouseover = function () {
        hideMenu('dimension');
        var pos = menu['body'].getPosition();
        menu['dimension'].show(pos.x + 150, pos.y + 40);
    };
    //menu['body'].addItem('Properties');
    menu['body'].addItem('Move To Back');
    //var copy = menu['body'].addItem('Copy');
    //menu['body'].addItem('Parent Menu');
    var del = menu['body'].addItem('Delete');
    var cancel = menu['body'].addItem('Cancel');

    menu['create'].setItemText(0, "Create Item");
    menu['create'].setSize(150, 230);
    menu['create'].addItem('Button');
    menu['create'].addItem('Memo');
    menu['create'].addItem('Label');
    menu['create'].addItem('Checkbox');
    menu['create'].addItem('Edit box');
    menu['create'].addItem('Progress Bar');
    menu['create'].addItem('Radio Button');
    menu['create'].addItem('Gridlist');
    menu['create'].addItem('Tab Panel');
    menu['create'].addItem('Image');
    menu['create'].addItem('Scrollbar');
    menu['create'].addItem('Scrollpane');
    menu['create'].addItem('Combobox');
    

    body.oncontextmenu = function (e) {
        if (e.target.className !== 'rightclick' && e.target.className !== 'option')
            menu['body'].show(e.clientX, e.clientY);
        e.preventDefault();
    };
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
    hideMenu = function (leave) {
        for (var m in menu)
            if (m !== 'body' && m !== leave)
                menu[m].hide();
    };
};