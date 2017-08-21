/**
 * Created by Reinchard on 7/26/2017.
 */
class HelpDescComponentController {
    constructor($scope, $element, $attrs,$state,User, HelpDescService) {
        'ngInject';
        this.currentUser = User.current;
        this._$scope = $scope;
        this._$state = $state;
        this.inProgress = false;
        this.showLoader = true;
        this.helpService = HelpDescService;
        this.configs = {
            questions: {title: 'All Questions', buttonText: 'Ask a Question', searchTitle: '', create:''},
            issues: {title: 'Issue Tracker', buttonText: 'Report a Bug', searchTitle: '', create:''},
            features: {title: 'Feature Requests', buttonText: 'Post an Idea', searchTitle: '', create:''},
        };
        this.config = this.configs[this.type];
        this.response = [];
        this.tags = [];
        this.searchField = '';
        this.getContent();
        this.getFeaturedTags();
        this.pages = [];

    }

    search($event) {
        $event.preventDefault();
        if (this.searchField.length > 0) {
            this.config.searchTitle = '';
        }
        this.showLoader = true;
        this.helpService.searchConversations(this.type + `?subject=${this.searchField}`)
            .then((response) => {
                this.config.searchTitle = 'Results For: ' + this.searchField;
                this.showLoader = false;
                this.response = response;
                this.updatePagination(response.pages);
            })
            .catch((err) => {
                this.showLoader = false;
            })
    }

    getFeaturedTags() {
        this.helpService.getTags(this.type)
            .then((response) => {
                this.tags = response.slice(0, 8);
            })
    }

    getContent(page =1) {
        if(this._$state.params.page) {
            page = this._$state.params.page;
        }
        this.helpService.getList(this.type, page)
            .then((response) => {
                this.showLoader = false;
                this.response = response;
                this.updatePagination(response.pages);
            })
    }

    vote(id, vote, index) {
        if(!this.currentUser) {
            this.Notification.success('You need to be logged in to upvote things.');
            return
        }
        this.inProgress = true;
        this.response.items[index].rating = this.response.items[index].rating + vote;
        this.helpService.vote(this.type, id, vote)
            .then((response) => {
                this.inProgress = false;
            })
            .catch((err) => {
                this.inProgress = false;
            })
    }

    filterByTag(name) {
        this.showLoader = true;
        this.helpService.searchConversations(this.type + `?tags[]=${name}`)
            .then((response) => {
                this.config.searchTitle = name;
                this.showLoader = false;
                this.response = response;
                this.updatePagination(response.pages);
            })
            .catch((err) => {
                this.showLoader = false;
            })
    }
    goToPage(id = 'create') {
        this._$state.go('landing.single-' + this.type.slice(0,-1), {id, page: this.response.page}, );
    }

    changePage(page) {
        this.showLoader = true;
        if(page < 1) {
            this.showLoader = false;
            return;
        }
        if(page > this.response.pages) {
            this.showLoader = false;
            return;
        }
        this.getContent(page);
    }

    updatePagination(pages) {
        this.pages = [];
        for(let i =0; i< pages; i++) {
            this.pages.push(i+ 1);
        }
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