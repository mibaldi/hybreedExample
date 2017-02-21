import {_ ,Marionette} from '~/src/vendor/libs';
import Template from './problemDetails.html';



export default Marionette.View.extend({

    template: _.template(Template),

    className: 'problem-details',

    ui: {
        headingTitle: '.header .title',
        title: 'input.title',
        language: '.language',
        edition: '.edition',
        publisher: '.publisher',
        saveButton: '.save',
        check: '.check',
        publishButton: '.publish',
        comment: '.comment'
    },
    regions: {
        list: '.list'
    },
    templateContext: {
      formatDate: (date) => {
          date = new Date(date);
          return date.toLocaleDateString();
      },
      isSolved(solved) {
          return solved ? '' : 'hide';
      }
    },

    events: {
        'click @ui.publishButton': 'publishPressed',
        'click @ui.check': 'checkPressed',
    },

    triggers: {
        'click .back-button': 'backPressed'

    },
    currentUser: null,
    initialize(options) {
      this.currentUser = options.user;
    },

    onRender() {
        this.prepareUpdateOrAdd();
        this.ui.check.toggleClass('check-solved',this.model.attributes.solved);
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
    checkPressed() {
        console.log(this.model)
        this.model.set({
          solved: !this.model.attributes.solved
        })
        this.trigger('setSolved',this.model)
    },
    publishPressed(){
      const comment = this.ui.comment.val();
      const user = this.currentUser.attributes.name;
      const problemId = this.model.attributes.id;
      this.ui.comment.val('');
      this.trigger('addComment', comment,user,problemId);

    }
});
