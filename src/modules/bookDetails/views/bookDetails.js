import {_ ,Marionette} from '~/src/vendor/libs';
import Template from './bookDetails.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'book-details',

    ui: {
        headingTitle: '.header .title',
        title: 'input.title',
        language: '.language',
        edition: '.edition',
        publisher: '.publisher',
        saveButton: '.save'
    },

    events: {
        'click @ui.saveButton': 'savePressed'
    },

    triggers: {
        'click .back-button': 'backPressed'
    },

    languages: null,

    initialize(options) {
        this.languages = options.languages;
    },

    onRender() {
        this.fillLanguageSelect();
        this.ui.language.val(this.model.get('language'));
        this.prepareUpdateOrAdd();
    },

    fillLanguageSelect() {
        this.languages.each(lang => {
            this.ui.language.append(
                `<option>${lang.get('language')}</option>`);
        });
    },

    prepareUpdateOrAdd() {
        if(this.model.id) {
            this.ui.headingTitle.html(this.model.get('title'));
            this.ui.saveButton.html('Update');
        } else {
            this.ui.headingTitle.html('Add new book');
            this.ui.saveButton.html('Add');
        }
    },

    savePressed() {

        this.model.set({
            title: this.ui.title.val(),
            language: this.ui.language.val(),
            edition: this.ui.edition.val(),
            publisher: this.ui.publisher.val()
        });

        this.trigger('modelUpdated', this.model);
    }
});
