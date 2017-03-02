class AppHeaderCtrl {
    constructor(AppConstants, User, $scope, $state, SocketService, NotificationsStore, EventBus, PagesService, PagesStore) {
        'ngInject';
        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.notificationsStore = NotificationsStore;
        this.eventBus = EventBus;
        this.try = false;

        this._PagesService = PagesService;
        this._PagesStore = PagesStore;

        this.User = User;
        this.logout = () => {
            User.logout(...arguments);
        };

        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getPagesList();
            // console.log(this.pagesList);
            if (this.pagesList.length <= 0 && !this.try) {
                this.try = true;
                return this.getPagesList();
            }
        });

        $scope.$watch('User.current', (newUser) => {
            this.currentUser = newUser;
        });

        this.user = User.current;

        if (this.user) {
            this.notificationsStore.subscribeAndInit($scope, ()=> {
                this.notifications = this.notificationsStore.getNotifications();
                this.notificationsCount = this.notificationsStore.getUndreadNotificationsCount();
                if (!this.notifications) return this.getNotifications();
            });

            SocketService.on('projectBuild', (data)=> {
                EventBus.emit(this.eventBus.notifications.SET_ONE, data);
            });
        }

    }

    getPagesList() {
        this._PagesService.getList().then(
            pagesList => {
                console.log(pagesList);
                this.eventBus.emit(this.eventBus.pages.SET, pagesList);
            },
            err => {
                console.log(err);
            }
        );
    }

    getNotifications() {
        this.User.getNotifications().then(
            notifications => {
                this.eventBus.emit(this.eventBus.notifications.SET, notifications);
            },

            error => {
                console.log(error);
            }
        );
    }

    deleteNotification(param, index) {
        param = !param  ? 'all=true' : 'id=' + param + '';
        this.User.deleteNotification(param).then(
            notification=> {
                this.eventBus.emit(this.eventBus.notifications.DELETE, index);
            },

            error=> {
                console.log(error);
            }
        );
    }

    updateNotification(notification, index, $event) {
        if (notification.isRead) return;
        this.User.updateNotification({ id: notification._id }).then(
            notification=> {
                this.eventBus.emit(this.eventBus.notifications.UPDATE, index);
            },

            error=> {
                console.log(error);
            }
        );
    }

}

let AppHeader = {
    controller: AppHeaderCtrl,
    templateUrl: 'layout/main/header.html',
};

export default AppHeader;
