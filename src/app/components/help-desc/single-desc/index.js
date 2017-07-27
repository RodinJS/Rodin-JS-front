/**
 * Created by Reinchard on 7/26/2017.
 */

class SingleDescController {
    constructor($scope, $element, $attrs, $state, HelpDescService, User) {
        'ngInject';
        this.creationPage = this.id === 'create';
        this.currentUser = User.current;
        this._$state = $state;
        this._$scope = $scope;
        this.configs = {
            questions: {title: 'All Questions', buttonText: 'Ask a Question', type:'Your question', placeholder:'Type your question here...'},
            issues: {title: 'Issue Tracker', buttonText: 'Report a Bug', type:'Bug', placeholder:'Type the bug here...'},
            features: {title: 'Feature Requests', buttonText: 'Post an Idea', type:'Your Idea', placeholder:'Type the idea here...'},
        };
        this.config = this.configs[this.type];
        this.helpService = HelpDescService;
        this.answer = '';
        this.getConversation();
        this.colors = ['Blue','Red'];
        this.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
    }

    getConversation() {
        this.answer = '';
        if(!this.creationPage) {
            this.helpService.getConversation(this.type, this.id)
                .then(response => {
                    this.question = response;
                })
        }
    }

    submitAnswer() {
        if (!this.currentUser) {
            return this._$state.go('landing.login');
        }
        if(this.creationPage) {
            return this.askQuestion();
        }
        this.helpService.createQuestionThread(this.question.id, {description: this.answer})
            .then(response => this.getConversation())

    }
    askQuestion() {
        this.helpService.createQuestion(this.type, {subject:'Galustna Sahakyan', tags:['galus','t', 'sahakyan', 'abort', 'urod'], description:'Երեխեքքք ուզում եմ աբոռտ անեմ,ինչ խորհուրդ կտաաաք'})
            .then(response =>console.log(response))
    }
}

let SingleDescComponent = {
    controller: SingleDescController,
    controllerAs: '$ctrl',
    templateUrl: 'components/help-desc/single-desc/single-desc.component.html',
    bindings: {
        type: '@',
        id: '<'
    }
};

export default SingleDescComponent;