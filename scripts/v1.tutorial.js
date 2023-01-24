window.onmessage = function(){
    let x = window.body.clientWidth/2, y = window.body.clientHeight/2;
    Editor['label'].push(new Label(x - 120,0,240,30,'Welcome To MTA Web GUI Editor!'));
    Editor['label'][0].element.innerHTML = 'Welcome To MTA Web GUI Editor!';

    Editor['button'].push(new Button(x - 60,y,125,115,'Start New'));
    Editor['button'][0].element.innerHTML = 'Start New';
    Editor['button'][0].element.onclick = function(){
        Editor['label'][0].destroy();
        Editor['button'][0].destroy();
    };
};