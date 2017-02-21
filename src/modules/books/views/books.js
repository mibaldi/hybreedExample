import {_ ,Marionette} from '~/src/vendor/libs';
import BooksViewTemplate from './books.html';

const BookView = Marionette.View.extend({

    template: _.template(BooksViewTemplate),

    className: 'books-view',

    regions: {
        list: '.list'
    },

    ui: {
        filter: '.filter input',
        sort: '.sort select'
    },

    events: {
        'keyup @ui.filter': 'filterChanged',
        'change @ui.sort': 'sortCriteriaChanged'
    },

    triggers: {
        'click .back-button': 'backPressed',
        'click .option-button': 'optionPressed'
    },

    filterChanged() {
        this.trigger('filterChanged', this.ui.filter.val().toLowerCase());
    },

    sortCriteriaChanged() {
        this.trigger('sortCriteriaChanged', this.ui.sort.val());
    }
});

export default BookView;
