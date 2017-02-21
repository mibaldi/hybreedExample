import {_ ,Marionette} from '~/src/vendor/libs';
import Template from './layout.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'layout',

    ui: {
        right: '.right'
    },

    triggers: {
        'click .option-button': 'optionPressed'
    },

    regions: {
        left: '.left',
        right: '.right'
    },

    setRightRegionPortraitVisible(isVisible) {
        this.ui.right.toggleClass('portrait-hidden', !isVisible);
    }
});
