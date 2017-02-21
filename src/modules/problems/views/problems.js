import {_ ,Marionette} from '~/src/vendor/libs';
import ProblemsViewTemplate from './problems.html';

const ProblemView = Marionette.View.extend({

    template: _.template(ProblemsViewTemplate),

    className: 'problems-view',

    regions: {
        list: '.list'
    }
});

export default ProblemView;
