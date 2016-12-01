class AppHeaderCtrl {
    constructor(AppConstants, User, $scope, $state, SocketService, NotificationsStore, EventBus) {
        'ngInject';
        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.notificationsStore = NotificationsStore;
        this.eventBus = EventBus;
        this.User = User;
        this.logout = () => {
            User.logout(...arguments);
        };

        $scope.$watch('User.current', (newUser) => {
            this.currentUser = newUser;
        });

        this.user = User.current;
        this.notificationsStore.subscribeAndInit($scope, ()=>{
            this.notifications = this.notificationsStore.getNotifications();
            this.notificationsCount = this.notificationsStore.getUndreadNotificationsCount();
            if(!this.notifications) return this.getNotifications();
        });

        SocketService.on('probjectBuild', (data)=>{
            EventBus.emit(this.eventBus.notifications.SET, [data]);
        });

    }

    getNotifications() {
        this.User.getNotifications().then(
            notifications => {
                this.eventBus.emit(this.eventBus.notifications.SET, notifications);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteNotification(param, index){
        param = !param  ? 'all=true' : 'id='+param+'';
        this.User.deleteNotification(param).then(
            notification=>{
                this.eventBus.emit(this.eventBus.notifications.DELETE, index);
            },
            error=>{
                console.log(error);
            }
        )
    }

    updateNotification(param, index, $event){
        this.User.updateNotification({id:param}).then(
            notification=>{
                this.eventBus.emit(this.eventBus.notifications.UPDATE, index);
            },
            error=>{
                console.log(error);
            }
        )
    }

}

let AppHeader = {
    controller: AppHeaderCtrl,
    templateUrl: 'layout/main/header.html'
};

export default AppHeader;
