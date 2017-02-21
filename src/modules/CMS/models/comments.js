import {Backbone} from '~/src/vendor/libs';
const Comment = Backbone.Model.extend({
  urlRoot: 'http://192.168.3.59:3030/comments/'
});

const Comments = Backbone.Collection.extend({

    model: Comment,

    url: 'http://192.168.3.59:3030/comments/'
});

var comments = null;

function getCommentsCollection() {

    var deferred = $.Deferred();

    if(comments) {

        deferred.resolve(comments);

    } else {

        var tempComments = new Comments();

        tempComments.fetch()
            .then(() => {
                comments = tempComments;
                deferred.resolve(comments);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}
function saveComment(commentContent, user, problemId) {
    var comment = new Comment();
    comment.set({
      content: commentContent,
      author: user,
      problemId: problemId
    });

    var deferred = $.Deferred();

    comment.save()
        .then(() => {
            comments.add(comment);
            deferred.resolve();
        })
        .fail((e) => {
            deferred.reject(e)
        });

    return deferred.promise();
}
function removeComment(comment) {
    var deferred = $.Deferred();
    comment.destroy().then(() => {
        deferred.resolve();
    })
    .fail((e) => {
        deferred.reject(e)
    });

    return deferred.promise();
}

export default {
    getCommentsCollection,
    saveComment,
    removeComment
};
