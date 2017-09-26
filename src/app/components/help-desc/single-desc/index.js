/**
 * Created by Reinchard on 7/26/2017.
 */

class SingleDescController {
    constructor($scope, $state, $timeout, HelpDescService, User, Notification) {
        'ngInject';
        this.$timeout = $timeout;
        this.creationPage = this.id === 'create';
        this.editPage = false;
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
        this.editorConfig = {
            iconlibrary: 'fa',
            fullscreen: {enable: false},
            resize: 'none'
        };
        this.onPreview = false;
        this.markdownShow = (e) => {
            this.editor = e.$editor;
            e.$editor.bind('input', this.onMarkdownChange.bind(this, e));
            e.$editor.bind('click', this.onMarkdownChange.bind(this, e));
            e.hideButtons(['cmdHeading', 'cmdImage', 'cmdList', 'cmdQuote', 'cmdUrl']);
        };

        this.helpService = HelpDescService;
        this.post = this.helpService.history.post ? this.helpService.history.post : {
            subject: '',
            description: '',
            tags: []
        };
        this.selectedTags = this.helpService.history.tags ? this.helpService.history.tags : [];
        this.config = this.configs[this.type];
        this.showLoader = true;
        this.getConversation();
        this.getFeaturedTags();
        this.answer = '';
        this.modals = {
            remove: false
        };
        this.isEditable = false;
        this.updated = {
            tags: []
        };
    }

    getFeaturedTags() {
        this.helpService.getTags(this.type)
            .then((response) => {
                this.tags = response.slice(0, 8);
            })
    }

    filterByTag(name) {
        this.showLoader = true;
        this._$state.go('landing.' + this.type.slice(0, -1), {tag: name});
        this.helpService.searchConversations(this.type + `?tags[]=${name}`)
            .then((response) => {
                this.config.searchTitle = name;
                this.showLoader = false;
            })
            .catch((err) => {
                this.showLoader = false;
            })
    }

    getConversation() {
        if (!this.creationPage) {
            this.helpService.getConversation(this.type, this.id)
                .then(response => {
                    this.showLoader = false;
                    this.question = response;
                    this.question.preview = this.escapeHtml(response.preview)
                    if (this.currentUser) {
                        this.isEditable = this.question.user.email === this.currentUser.email;
                    }
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
        if (!this.currentUser) {
            this.Notification.success('You need to be logged in to upvote things.');
            return
        }
        let upvoted = vote === 1;
        let downvoted = vote === -1;
        let voteType = vote === 1 ? 1 : -1;
        if (upvoted && this.question.voted) {
            switch (this.question.voted.vote) {
                case 0:
                    this.question.rating += vote;
                    this.question.voted.vote = vote;
                    break;
                case 1:
                    this.question.rating -= 1;
                    this.question.voted.vote = 0;
                    vote = 0;
                    break;
                case -1:
                    this.question.rating += 2;
                    this.question.voted.vote = 1;
                    vote = 1;
                    break;
                default:
                    console.log('error');
                    break
            }
        } else if (downvoted && this.question.voted) {
            switch (this.question.voted.vote) {
                case 0:
                    this.question.rating += vote;
                    this.question.voted.vote = vote;
                    break;
                case 1:
                    this.question.rating -= 2;
                    this.question.voted.vote = -1;
                    vote = -1;
                    break;
                case -1:
                    this.question.rating += 1;
                    this.question.voted.vote = 0;
                    vote = 0;
                    break;
                default:
                    console.log('error');
                    break
            }
        }

        if (!this.question.voted) {
            this.question.rating = this.question.rating + vote;
            this.question.voted = {vote}
        }
        this.helpService.vote(this.type, id, vote, voteType)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
            })
    }

    submitAnswer(form) {
        if (!this.currentUser) {
            this.helpService.history = {
                tags: this.selectedTags, post: this.post
            };
            return this._$state.go('landing.login');
        }
        if (this.answer && this.answer.length > 0) {
            if (this.creationPage) {
                return this.askQuestion(form);
            }
            this.showLoader = true;
            this.helpService.createQuestionThread(this.question.id, {description: this.answer})
                .then(response => {
                    this.previewTrigger();
                    this.helpService.history.tags = null;
                    this.helpService.history.post = null;
                    this.showLoader = false;
                    this.answer = '';
                    this.getConversation()
                })
                .catch(err => {
                    this.showLoader = false;
                })
        }
        if (form.$invalid) {
            this.editor.addClass('editor-has-error')
        }


    }

    askQuestion(form) {
        if (!this.currentUser) {
            this.helpService.history = {
                tags: this.selectedTags, post: this.post
            };
            return this._$state.go('landing.login');
        }
        if (form.$valid) {
            if (this.selectedTags.length > 0) {
                this.post.tags = this.selectedTags.map((tag) => tag.text)
            }
            this.showLoader = true;
            this.helpService.createQuestion(this.type, this.post)
                .then(response => {
                    this.helpService.resetValues();
                    this.showLoader = false;
                    this.post.subject = '';
                    this.post.description = '';
                    this.post.tags = [];
                    this._$state.go('landing.' + this.type.slice(0, -1))
                }).catch((err) => {
                this.showLoader = false;
            })
        }
        if (!form.description.$valid) {
            this.editor.addClass('editor-has-error')
        }
    }

    switchToEdit() {
        this.creationPage = false;
        this.editPage = true;
    }

    updateSubject(subject) {
        this.updated.subject = subject;
    }

    updatePreview(preview) {
        this.updated.description = preview;
    }

    updateQuestion() {
        this.showLoader = true;
        let updateSubject = {
            subject: this.updated.subject,
        };
        if (this.updated.tags.length > 0) {
            updateSubject.tags = this.updated.tags
        }
        let promises = [this.helpService.updateConversation(this.type, this.question.id, updateSubject)];

        if (this.updated.description) {
            promises.push(this.helpService.updateThread(this.question.id, {
                description: this.updated.description,
                threadId: this.question.myThreadId,
            }))
        }
        Promise.all(promises)
            .then((resp) => {
                this.showLoader = true;
                this.previewTrigger();
                this.Notification.success('Conversation updated');
                this.goBack()
            })
            .catch((err) => {
                this.showLoader = true;
                this.Notification.error('Something went wrong');
            })
    }

    deleteQuestion() {
        this.helpService.deleteConversation(this.type, this.question.id)
            .then((resp) => {
                this.goBack();
                this.modals.remove = false;
            })
            .catch((err) => console.log(err))
    }

    onAddTags(tag) {
        this.updated.tags.push(tag.text);
    }

    onRemoveTag(tag) {
        if (this.updated.tags.indexOf(tag.text) !== -1) {
            this.updated.tags.splice(this.updated.tags.indexOf(tag.text), 1);
        }
    }

    open(modal) {
        this.modals[modal] = true;
    }

    goToPage(id = 'create') {
        this._$state.go('landing.single-' + this.type.slice(0, -1), {id});
    }

    goBack() {
        this._$state.go('landing.' + this.type.slice(0, -1), {page: this._$state.params.page ? this._$state.params.page : 1})
    }

    escapeHtml(html) {
        if (html) {
            return html.replace(/<br\s*\/?>/gi, '')
                .replace(/&lt;/, "<")
                .replace(/&gt;/, ">")
        }
        return html
    }

    onMarkdownChange(editor, e) {
        this.onPreview = editor.$isPreview;
    }

    previewTrigger() {
        if (this.onPreview) {
            this.$timeout(() => {
                angular.element("button[title='Preview']").trigger('click');
                this.onPreview = false;
            });
        }
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