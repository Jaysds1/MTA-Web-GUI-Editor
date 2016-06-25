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
var body;
window.onload = function(){
    body = document.getElementById('canvas');
    var status = document.getElementById('status');
    status.innerHTML = 'Right click to start';
    status.style.color = 'orange';
    
    var editor = document.getElementById('canvas');
    editor.oncontextmenu = function(e){
        createMenu('main',e);
        e.preventDefault();
    };
    editor.onclick = function(e) {
        hideMenu();
    };
};