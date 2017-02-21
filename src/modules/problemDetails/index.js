import {Broker, Hybreed} from '~/src/vendor/libs';
import ProblemDetailsView from './views/problemDetails';
import CommentsCollectionView from './views/commentsCollection'


var currentProblem;
var problemsDetailsView;
var commentsCollectionView;

function show(problem) {

    currentProblem = problem;

    Hybreed.UI.showSpinner();
    Broker.channel('CMS').request('getCurrentUser')
      .then((user) => {
        Broker.channel('CMS').request('getCommentsCollection')
            .then(comments => {
                showProblemDetailsView(problem,user);
                showCommentsCollectionView(problem.attributes.id,comments,user);
            })
            .fail(error => {
                console.error(error);
            })
            .always(() => {
                Hybreed.UI.hideSpinner();
            });
      })
}

function showAddNewProblem() {
    Broker.channel('problems').request('highlightCurrentProblem', null);
    show(Broker.channel('CMS').request('getEmptyBook'));
    Broker.channel('layout').request('setRightRegionPortraitVisible', true);
}

function showProblemDetailsView(problem,user) {

    problemsDetailsView = new ProblemDetailsView({
        model: problem,user
    });


    problemsDetailsView.on({

        backPressed() {
            Broker.channel('layout').request('setRightRegionPortraitVisible', false);
        },
        addComment(commentContent,user,problemId) {
            Broker.channel('CMS').request('addComment',commentContent,user,problemId)
              .then(() => {
                commentsCollectionView.render();
              });
        },
        setSolved(model){
            Broker.channel('CMS').request('setSolved',model)
              .always(() =>{
                show(currentProblem);
              })
        }
    });

    Broker.channel('layout').request('showViewInRegion', 'right', problemsDetailsView);
    Broker.channel('layout').request('setRightRegionPortraitVisible', true);
}

function showCommentsCollectionView(problemId,comments,user) {

    commentsCollectionView = new CommentsCollectionView({
        collection: comments,user
    });
    commentsCollectionView.on({
      removePressed(comment) {
          Broker.channel('CMS').request('removeComment', comment)
            .always (() => {
              show(currentProblem);
            });
      }
    });

    problemsDetailsView.showChildView('list', commentsCollectionView);
    setCommentsCollectionViewFilter(problemId);

}


function setCommentsCollectionViewFilter(problemId) {

    commentsCollectionView.setFilter(comment => {
        return comment.get('problemId') == problemId ;
    });
}


//
// API
//

var API = {
    show,
    showAddNewProblem,
};

Broker.channel('problemDetails').reply(API);
export default API;
