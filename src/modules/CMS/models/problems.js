import {Backbone} from '~/src/vendor/libs';
const Problem = Backbone.Model.extend({

    urlRoot: 'http://192.168.3.59:3030/problems/',

    defaults: {
        title: '',
        description: '',
        author: '',
        date: 0,
        solved: false
    }
});

const Problems = Backbone.Collection.extend({

    model: Problem,

    url: 'http://192.168.3.59:3030/problems/'
});

var problems = null;

function getProblemsCollection() {

    var deferred = $.Deferred();

    if(problems) {

        deferred.resolve(problems);

    } else {

        var tempProblems = new Problems();

        tempProblems.fetch()
            .then(() => {
                problems = tempProblems;
                deferred.resolve(problems);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}
function setSolved(model){
  var deferred = $.Deferred();
  model.save()
    .then(() => {
      deferred.resolve();
    })
    .fail((error) => {
      deferred.reject(error)
    });
    return deferred.promise();
}

export default {
    getProblemsCollection,
    setSolved
};
