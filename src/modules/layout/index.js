import {Broker} from '~/src/vendor/libs';
import LayoutView from './views/layout';



var layoutView;

function show() {
  console.log('Broker ',Broker)
    showLayoutView();
}

function showLayoutView() {

    layoutView = new LayoutView();

    layoutView.on({

        optionPressed() {
            Broker.channel('bookDetails').request('showAddNewBook');
        }
    });

    Broker.channel('main').request('showView', layoutView);
}

function showViewInRegion(region, view) {
    layoutView.showChildView(region, view);
}

function setRightRegionPortraitVisible(isVisible) {
    layoutView.setRightRegionPortraitVisible(isVisible);
}

//
// API
//

var API = {
    show,
    showViewInRegion,
    setRightRegionPortraitVisible
};

Broker.channel('layout').reply(API);
export default API;
