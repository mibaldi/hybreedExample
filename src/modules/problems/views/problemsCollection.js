import {_ ,Marionette} from '~/src/vendor/libs';
import ProblemsChildViewTemplate from './problemsChild.html';


const ProblemsChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'problems-child-view',

    template: _.template(ProblemsChildViewTemplate),

    templateContext: {
      formatDate: (date) => {
          date = new Date(date);
          return date.toLocaleDateString();
      },
      isSolved(solved) {
          return solved ? '' : 'hide';
      }
    },

    triggers: {
        click: 'problemPressed',
    },
    ui: {
        check: '.check',
        date: '.date'
    },
    onRender(){
      this.checkSolve();
      this.ui.date.html(this.dateToString(this.model.attributes.date));
    },
    dateToString(date){
      const fecha  = new Date(date);
      var month = fecha.getMonth() + 1;
      var day = fecha.getDate();
      var year = fecha.getFullYear();
      const fechaString = `${day}/${month}/${year}`;
      return fechaString;
    },
    checkSolve() {
      this.ui.check.toggleClass('hide-check',!this.model.attributes.solved)
    }
});

const ProblemsCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'problems-collection-view',

    childView: ProblemsChildView,


    childViewEvents: {
        problemPressed: 'problemPressed'
    },

    collectionEvents: {
        change: 'render'
    },



    problemPressed(view) {
        this.trigger('problemPressed', view.model);
    },

    highlightCurrentProblem(problem) {
        this.children.each(childView => {
            childView.$el.toggleClass('current', childView.model == problem)
        });
    }
});

export default ProblemsCollectionView;
