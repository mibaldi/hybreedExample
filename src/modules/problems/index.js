import {Broker, Hybreed} from '~/src/vendor/libs';
import ProblemsView from './views/problems';
import ProblemsCollectionView from './views/problemsCollection';



var problemsView;
var problemsCollectionView;

function show() {

    Hybreed.UI.showSpinner();
    showProblemsView();
    Broker.channel('CMS').request('getProblemsCollection')
        .then(problems => {
            showProblemsCollectionView(problems);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showProblemsView() {

    problemsView = new ProblemsView();

    Broker.channel('layout').request('showViewInRegion', 'left', problemsView);
}

function showProblemsCollectionView(problems) {

    problemsCollectionView = new ProblemsCollectionView({
        collection: problems
    });

    problemsCollectionView.on({

        problemPressed(problem) {
            highlightCurrentProblem(problem);
            Broker.channel('problemDetails').request('show', problem);
        }
    });

    problemsView.showChildView('list', problemsCollectionView);
}
function highlightCurrentProblem(problem) {
    problemsCollectionView.highlightCurrentProblem(problem);
}

//
// API
//

var API = {
    show,
    highlightCurrentProblem
};

Broker.channel('problems').reply(API);
export default API;
