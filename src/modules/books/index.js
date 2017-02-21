import {Broker, Hybreed} from '~/src/vendor/libs';
import BooksView from './views/books';
import BooksCollectionView from './views/booksCollection';

var booksView;
var booksCollectionView;

function show() {

    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getBooksCollection')
        .then(books => {
            showBooksView();
            showBooksCollectionView(books);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showBooksView() {

    booksView = new BooksView();

    booksView.on({

        backPressed() {
            Broker.channel('dashboard').request('show');
        },

        optionPressed() {
            Broker.channel('bookDetails').request('showAddNewBook');
        },

        filterChanged(filter) {
            setBooksCollectionViewFilter(filter);
        },

        sortCriteriaChanged(sortCriteria) {
            setBooksCollectionViewSort(sortCriteria);
        }
    });

    Broker.channel('layout').request('showViewInRegion', 'left', booksView);
}

function showBooksCollectionView(books) {

    booksCollectionView = new BooksCollectionView({
        collection: books
    });

    booksCollectionView.on({

        bookPressed(book) {
            highlightCurrentBook(book);
            Broker.channel('bookDetails').request('show', book);
        },

        deletePressed(book) {

            if(confirm('Are you sure you want to delete it?')) {
                Broker.channel('CMS').request('deleteBook', book)
                    .then(() => {
                        Broker.channel('bookDetails').request('clearDetailBookDeleted', book);
                    })
                    .fail(() => {
                        alert('Error');
                    });
            }
        }
    });

    booksView.showChildView('list', booksCollectionView);
}

function setBooksCollectionViewFilter(filter) {

    booksCollectionView.setFilter(book => {
        return book.get('title').toLowerCase().includes(filter);
    });
}

function setBooksCollectionViewSort(sort) {

    booksCollectionView.viewComparator = sort;
    booksCollectionView.render();
}

function highlightCurrentBook(book) {
    booksCollectionView.highlightCurrentBook(book);
}

//
// API
//

var API = {
    show,
    highlightCurrentBook
};

Broker.channel('books').reply(API);
export default API;
