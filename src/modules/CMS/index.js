import {Broker} from '~/src/vendor/libs';
import Books from './models/books';
import Languages from './models/languages';
import Problems from './models/problems'
import Comments from './models/comments'
import Users from './models/users'


function getBooksCollection() {
    return Books.getBooksCollection();
}

function saveBook(book) {
    return Books.saveBook(book);
}

function deleteBook(book) {
    return Books.deleteBook(book);
}

function getEmptyBook() {
    return Books.getEmptyBook();
}

function getLanguagesCollection() {
    return Languages.getLanguagesCollection();
}

function getProblemsCollection() {
    return Problems.getProblemsCollection();
}

function getCommentsCollection() {
    return Comments.getCommentsCollection();
}
function addComment(commentContent, user, problemId){
  return Comments.saveComment(commentContent, user, problemId);
}
function setSolved(model){
  return Problems.setSolved(model);
}
function getCurrentUser(){
  return Users.getCurrentUser();
}
function removeComment(comment){
  return Comments.removeComment(comment);
}

//
// API
//

var API = {
    getBooksCollection,
    saveBook,
    deleteBook,
    getEmptyBook,
    getLanguagesCollection,
    getProblemsCollection,
    getCommentsCollection,
    addComment,
    setSolved,
    getCurrentUser,
    removeComment

};

Broker.channel('CMS').reply(API);
export default API;
