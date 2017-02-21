
import {_ ,Marionette} from '~/src/vendor/libs';
import BooksChildViewTemplate from './booksChild.html';

const BooksChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'books-child-view',

    template: _.template(BooksChildViewTemplate),

    triggers: {
        click: 'bookPressed',
        'click .delete': 'deletePressed'
    }
});

const BooksCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'books-collection-view',

    childView: BooksChildView,

    childViewEvents: {
        bookPressed: 'bookPressed',
        deletePressed: 'deletePressed'
    },

    collectionEvents: {
        change: 'render'
    },

    bookPressed(view) {
        this.trigger('bookPressed', view.model);
    },

    deletePressed(view) {
        this.trigger('deletePressed', view.model);
    },

    highlightCurrentBook(book) {
        this.children.each(childView => {
            childView.$el.toggleClass('current', childView.model == book)
        });
    }
});

export default BooksCollectionView;
