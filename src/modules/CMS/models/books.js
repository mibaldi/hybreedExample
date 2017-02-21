import {Backbone} from '~/src/vendor/libs';
const Book = Backbone.Model.extend({

    urlRoot: 'http://192.168.3.59:3030/books/',

    defaults: {
        title: '',
        language: '',
        edition: '',
        publisher: ''
    }
});

const Books = Backbone.Collection.extend({

    model: Book,

    url: 'http://192.168.3.59:3030/books/'
});

var books = null;

function getBooksCollection() {

    var deferred = $.Deferred();

    if(books) {

        deferred.resolve(books);

    } else {

        var tempBooks = new Books();

        tempBooks.fetch()
            .then(() => {
                books = tempBooks;
                deferred.resolve(books);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

function saveBook(book) {

    var deferred = $.Deferred(),
        isInCollection = books ? books.contains(book) : false;

    book.save()
        .then(() => {

            if(!isInCollection) {
                books.add(book);
            }

            deferred.resolve();
        })
        .fail((e) => {
            deferred.reject(e)
        });

    return deferred.promise();
}

function deleteBook(book) {
    return book.destroy(); //It will be also deleted from the collection
}

function getEmptyBook() {
    return new Book();
}

export default {
    getBooksCollection,
    saveBook,
    deleteBook,
    getEmptyBook
};
