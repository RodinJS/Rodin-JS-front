/**
 * Created by Reinchard on 7/26/2017.
 */

class SingleDescController {
    constructor($scope, $element, $attrs, $state, HelpDescService, User, Notification) {
        'ngInject';
        this.creationPage = this.id === 'create';
        this.currentUser = User.current;
        this._$state = $state;
        this._$scope = $scope;
        this.Notification = Notification;
        this.configs = {
            questions: {
                title: 'Ask a Question',
                buttonText: 'Ask a Question',
                type: 'Your question',
                placeholder: 'Type your question here...'
            },
            issues: {
                title: 'Issue Tracker',
                buttonText: 'Report a Bug',
                type: 'Bug',
                placeholder: 'Type the bug here...'
            },
            features: {
                title: 'Feature Requests',
                buttonText: 'Post an Idea',
                type: 'Your Idea',
                placeholder: 'Type the idea here...'
            },
        };
        this.post = {
            subject: '',
            description: '',
            tags: []
        };
        this.selectedTags = [];
        this.config = this.configs[this.type];
        this.helpService = HelpDescService;
        this.showLoader = true;
        this.getConversation();
        this.getFeaturedTags();
        this.answer = '';
    }

    getFeaturedTags() {
        this.helpService.getTags(this.type)
            .then((response) => {
                this.tags = response.slice(0, 8);
            })
    }
    getConversation() {
        if (!this.creationPage) {
            this.helpService.getConversation(this.type, this.id)
                .then(response => {
                    this.showLoader = false;
                    this.question = response;
                })
                .catch((err) => {
                    this.showLoader = false;
                })
        } else {
            this.showLoader = false;
        }
    }

    getTags() {
        return this.helpService.getTags(this.type)
            .then((response) => {
                this.autoCompleteTags = response.map((tag) => {
                    return {
                        text: tag.name
                    }
                })
            })
    }

    vote(id, vote, index) {
        if(!this.currentUser) {
            this.Notification.success('You need to be logged in to upvote things.');
            return
        }
        this.question.rating = this.question.rating + vote;
        this.helpService.vote(this.type, id, vote)
            .then((response) => {
            })
            .catch((err) => {
            })
    }

    submitAnswer() {
        if (!this.currentUser) {
            return this._$state.go('landing.login');
        }
        if (this.creationPage) {
            return this.askQuestion();
        }
        this.showLoader = true;
        this.helpService.createQuestionThread(this.question.id, {description: this.answer})
            .then(response => {
                this.showLoader = false;
                this.answer = '';
                this.getConversation()
            }).catch(err => {
            this.showLoader = false;

        })

    }

    askQuestion() {
        if(this.selectedTags.length > 0) {
            this.post.tags = this.selectedTags.map((tag) => tag.text)
        }
        this.showLoader = true;
        this.helpService.createQuestion(this.type, this.post)
            .then(response => {
                this.showLoader = false;
                this._$state.go('landing.' + this.type.slice(0, -1))
            }).catch((err) => {
            this.showLoader = false;
        })
    }

    goToPage(id = 'create') {
        this._$state.go('landing.single-' + this.type.slice(0, -1), {id});
    }

    autoResize($event) {
        $event.target.style.height = 'auto';
        $event.target.style.height = $event.target.scrollHeight+'px';
    }

    goBack() {
        this._$state.go('landing.' + this.type.slice(0, -1),{page: this._$state.params.page ? this._$state.params.page : 1})
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