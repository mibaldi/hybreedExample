import App from '~/src/common/app';
import {Broker} from '~/src/vendor/libs';
function showView(view) {
    App.showView(view);
}

function start() {

    Broker.channel('layout').request('show');
    Broker.channel('problems').request('show');
}

//
// API
//

var API = {
    showView,
    start
};

Broker.channel('main').reply(API);
export default API;
