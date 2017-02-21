import {Backbone} from '~/src/vendor/libs';
const Language = Backbone.Model.extend({

});

const Languages = Backbone.Collection.extend({

    model: Language,

    url: 'http://192.168.3.59:3030/languages/'
});

var languages = null;

function getLanguagesCollection() {

    var deferred = $.Deferred();

    if(languages) {

        deferred.resolve(languages);

    } else {

        var tempLanguages = new Languages();

        tempLanguages.fetch()
            .then(() => {
                languages = tempLanguages;
                deferred.resolve(languages);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

export default {
    getLanguagesCollection
};
