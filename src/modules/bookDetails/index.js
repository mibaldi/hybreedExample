import {Broker, Hybreed} from '~/src/vendor/libs';
import BookDetailsView from './views/bookDetails';

var currentBook;
var booksDetailsView;

function show(book) {

    currentBook = book;

    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getLanguagesCollection')
        .then(languages => {
            showBookDetailsView(book, languages);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showAddNewBook() {
    Broker.channel('books').request('highlightCurrentBook', null);
    show(Broker.channel('CMS').request('getEmptyBook'));
    Broker.channel('layout').request('setRightRegionPortraitVisible', true);
}

function showBookDetailsView(book, languages) {

    booksDetailsView = new BookDetailsView({
        model: book,
        languages
    });

    booksDetailsView.on({

        backPressed() {
            Broker.channel('layout').request('setRightRegionPortraitVisible', false);
        },

        modelUpdated(book) {

            Broker.channel('CMS').request('saveBook', book)
                .then(() => {
                    booksDetailsView.render();
                    Broker.channel('books').request('highlightCurrentBook', book);
                })
                .fail(() => {
                    alert('Error');
                });
        }
    });

    Broker.channel('layout').request('showViewInRegion', 'right', booksDetailsView);
    Broker.channel('layout').request('setRightRegionPortraitVisible', true);
}

function clearDetailBookDeleted(book) {
    if(book == currentBook) {
        booksDetailsView.destroy();
        Broker.channel('layout').request('setRightRegionPortraitVisible', false);
    }
}

//
// API
//

var API = {
    show,
    showAddNewBook,
    clearDetailBookDeleted
};

Broker.channel('bookDetails').reply(API);
export default API;
