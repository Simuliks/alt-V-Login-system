/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';
import * as notify from "NotifyMe";


let webview;

alt.onServer('client::auth:init', init);


function init(){
    if (webview === undefined) {
        webview = new alt.WebView('http://resource/client/html/index.html');
        webview.focus();
        alt.showCursor(true); 
        alt.toggleGameControls(false); // Disable game controls 
    } 


    webview.on('cef::auth:authorization', (data) => {
     alt.emitServer('server:auth:authorization', { login: data.login, pass: data.pass },
      )});



    webview.on('cef::auth:registration', (data) => {
    alt.emitServer('server:auth:registration', { login: data.login, pass: data.pass, email: data.email  },
    )});      


    alt.onServer('client::auth:close', () => {
        alt.showCursor(false);
        alt.toggleGameControls(true);
        webview.destroy();
        webview = undefined;
        notify.littleNotification('Sėkmingai prisijungei prie serverio!', 'success');
      });

    alt.onServer('accNotValidLogin', () => {
        webview.emit("web:accNotValidLogin");
    });

    alt.onServer('accRegsistered', () => {
        webview.emit("web:accRegsistered");
    });
};



