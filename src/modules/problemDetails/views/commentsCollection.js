
import {_ ,Marionette} from '~/src/vendor/libs';
import CommentsChildViewTemplate from './commentsChild.html';


const CommentsChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'comments-child-view',

    template: _.template(CommentsChildViewTemplate),
    ui: {
      remove: '.remove'
    },
    triggers: {
      'click .remove': 'removePressed'
    }
});

const CommentsCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'comments-collection-view',

    childView: CommentsChildView,

    collectionEvents: {
        change: 'render'
    },
    childViewEvents: {
        removePressed: 'removePressed'
    },
    currentUser: null,
    initialize(options){
      this.currentUser = options.user.attributes.name;
      console.log(this.currentUser)
    },
    onRender(){
      this.children.each(childView => {
          childView.ui.remove.toggleClass('hide', this.currentUser !== childView.model.attributes.author)
      });
    },
    removePressed(view) {
      console.log('removePressed')
        this.trigger('removePressed', view.model);
    },
});

export default CommentsCollectionView;
