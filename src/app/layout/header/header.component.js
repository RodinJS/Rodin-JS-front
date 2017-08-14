/**
 * Created by Reinchard on 8/8/2017.
 */
class AppHeaderNewCtrl {
    constructor(AppConstants,
                $window,
                User,
                $scope,
                $state,
                SocketService,
                NotificationsStore,
                Notification,
                ModulesStore,
                $rootScope,
                $stateParams,
                $location,
                PagesService,
                PagesStore,
                EventBus) {
        'ngInject';
        this.isLocal = AppConstants.env === 'local';
        this._$state = $state;
        this._User = User;
        this._$scope = $scope;
        this._$rootScope = $rootScope;
        this._PagesService = PagesService;
        this._PagesStore = PagesStore;
        this._$stateParams = $stateParams;
        this.eventBus = EventBus;
        this._ModulesStore = ModulesStore;
        this.appName = AppConstants.appName;
        this.user = User.current;
        this.notificationsStore = NotificationsStore;
        this._Notification = Notification;
        this.pagesSection = [];
        this.setPagesDropdown = this.setPagesDropdown.bind(this);
        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getHeadarPagesList();
            if (this.pagesList.length <= 0 && !this.try) {
                this.try = true;
                return this.getPagesList();
            }
            this.setPagesDropdown();
        });
        this.logout = () => {
            User.logout(...arguments);
        };

        this.isLanding = this._$state.current.name === 'home.landing';

        let tryAttempt = 0;
        if (this.user) {
            this.notificationsStore.subscribeAndInit($scope, () => {
                this.notifications = this.notificationsStore.getNotifications();
                if (!this.notifications && tryAttempt === 0) {
                    tryAttempt = 1;
                    return this.getNotifications();
                }
            });
        }

        $scope.$watch('User.current', (newUser) => {
            this.currentUser = newUser;
        });

        if (!SocketService.connected) {
            SocketService.on('projectBuild', (data) => this.showSocketResponse(data));
            SocketService.on('gitSync', (data) => this.showSocketResponse(data));
        }

        $("#burger-button").click(function (e) {
            e.preventDefault();
            $("body").toggleClass("scroll-prevent");
            $("#mySidenav").toggleClass("nav-opened");
            $(".side-bar-background").toggleClass("show-background")
        });
        angular.element($window).bind('resize', () => {
            this.setPagesDropdown();
        });
    }

    setPagesDropdown() {
        if (window.innerWidth >= 768) {
            $("body").removeClass("scroll-prevent");
            $("#mySidenav").removeClass("nav-opened");
            $(".side-bar-background").removeClass("show-background");
            this.collapse = false;
            this.pagesList.map((pages, i) => {
                if (pages._id.length === 0) {
                    this.pagesSection = _.slice(this.pagesList[i].values, 0, this.pagesList[i].values.length);
                }
            });
        } else {
            this.pagesSection = [];
        }

    }

    scrollToSignUp() {
        if (this.emailFocused) return;
        const _this = this;
        $('html,body').animate({
            scrollTop: $('.form').offset().top - 100,
        }, {
            duration: 500,
            complete: function () {
                $('#emailControl').focus();
                _this._$rootScope.$broadcast('notificationBoxTrigger', {});
                _this._$scope.$apply();
            },
        });
    }

    getPagesList() {
        this._PagesService.getList().then(
            pagesList => {
                this.eventBus.emit(this.eventBus.pages.SET, pagesList);
            },
            err => {
                console.log(err);
            }
        );
    }

    checkMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    showSocketResponse(data) {
        const respData = (data.data && typeof data.data === 'object') ? data.data : data;
        const message = respData.message || respData.label || respData.data;
        //console.log('respData', respData);
        //console.log('data', data);

        if (respData.error)
            this._Notification.error(message);
        else
            this._Notification.success(message);

        if (!respData.label)
            respData.label = message;
        this.eventBus.emit(this.eventBus.notifications.SET_ONE, respData);
    }

    clickMenu() {
        this.menuOpen = !this.menuOpen;
        this.mobileMenu = this.menuOpen ? {display: 'block'} : {display: 'none'};
    }

    getNotifications() {
        this._User.getNotifications().then(
            notifications => {
                this.eventBus.emit(this.eventBus.notifications.SET, notifications);
            },

            error => {
                console.log(error);
            }
        );
    }

    deleteNotification(param, index) {
        if (this.notifications.length <= 0) return;
        param = !param ? 'all=true' : 'id=' + param + '';

        this._User.deleteNotification(param).then(
            notification => {
                this.eventBus.emit(this.eventBus.notifications.DELETE, index);
            },
            error => {
                console.log(error);
            }
        );
    }

    updateNotification(notification, index, $event) {
        if (notification.isRead) return;
        this._User.updateNotification({id: notification._id}).then(
            notification => {
                this.eventBus.emit(this.eventBus.notifications.UPDATE, index);
            },

            error => {
                console.log(error);
            }
        );
    }

    gotToHome() {
        if (this._User.current) {
            return this._$state.go('app.dashboard');
        }

        return window.location.href = '/';
    }
}

let AppHeaderNew = {
    controller: AppHeaderNewCtrl,
    templateUrl: 'layout/header/header.component.html',
};

export default AppHeaderNew;