/**
 * Created by Reinchard on 7/26/2017.
 */
class HelpDescComponentController {
    constructor($scope, $element, $attrs, HelpDescService) {
        'ngInject';
        this._$scope = $scope;
        this.inProgress = false;
        this.showLoader= true;
        this.helpService = HelpDescService;
        this.configs = {
            questions: {title: 'All Questions', buttonText:'Ask a Question'},
            issues: {title: 'Issue Tracker', buttonText:'Report a Bug'},
            features: {title: 'Feature Requests', buttonText:'Post an Idea'},
        };
        this.config = this.configs[this.type];
        this.response = [];
        this.tags = [];
        this.searchField = '';
        this.getContent();
        this.getFeaturedTags();

    }

    search($event) {
        this.showLoader= true;
        $event.preventDefault();
        if(this.searchField.length >0) {
            this.helpService.searchConversations(this.type + `?subject=${this.searchField}`)
                .then((response) => {
                this.configs.title = 'Results For' + this.searchField;
                    this.showLoader= false;
                    this.response = response;
                })
                .catch((err) => {
                    this.showLoader= false;
                })
        }
    }
    getFeaturedTags() {
        this.helpService.getTags(this.type)
            .then((response) => {
                this.tags = response.slice(0,8);
            })
    }
    getContent() {
        this.helpService.getList(this.type)
            .then((response) => {
                this.showLoader= false;
                this.response = response;
            })
    }

    vote(id, vote, index) {
        this.inProgress = true;
        this.response.items[index].rating  = this.response.items[index].rating + vote;
        this.helpService.vote(this.type, id, vote)
            .then((response) => {
                this.inProgress = false;
            })
            .catch((err) => {
                this.inProgress = false;
            })
    }

    filterByTag(name) {
        this.showLoader= true;
        this.helpService.searchConversations(this.type + `?tags[]=${name}`)
            .then((response) => {
                this.configs.title = name;
                this.showLoader= false;
                this.response = response;
            })
            .catch((err) => {
                this.showLoader= false;
            })
    }
}

let HelpDescComponent = {
    controller: HelpDescComponentController,
    controllerAs: '$ctrl',
    templateUrl: 'components/help-desc/help-desc.component.html',
    bindings: {
        type: '@'
    }
};

export default HelpDescComponent;