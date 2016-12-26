/**
 * Created by xgharibyan on 11/1/16.
 */


function NotificationstStore(EventBus, BaseStore, $stateParams, $state, Project, moment, $sce) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Notifications';

    EventBus.on(EventBus.notifications.SET,  (scope, data) => {
        if(factory.data.notifications){
            factory.data.notifications = _.sortBy(_.uniqBy(_.concat(factory.data.notifications, mapNotifications(data)), 'id'), (notification)=>{
                return -notification.originDate
            });
        }

        else{
            factory.data.notifications = mapNotifications(data);
        }

        factory.emitChanges();
    });

    EventBus.on(EventBus.notifications.SET_ONE,  (scope, data) => {
        factory.data.notifications.unshift(mapNotifications([data])[0]);
        factory.emitChanges();
    });

    EventBus.on(EventBus.notifications.DELETE,  (scope, index) => {
        if(index)
            factory.data.notifications.splice(index, 1);
        else
            factory.data.notifications = [];
        factory.emitChanges();
    });

    EventBus.on(EventBus.notifications.UPDATE,  (scope, index)  =>{
        factory.data.notifications[index].isRead = true;
        factory.data.notifications[index].readClass = 'readed';
        factory.emitChanges();
    });


    factory.getNotifications = function () {
        return factory.data.notifications;
    };

    factory.getUndreadNotificationsCount = function(){
        return _.filter(factory.data.notifications, (notification)=>{
            return !notification.isRead;
        }).length
    };

    function mapNotifications(notifications) {
        const validDevices = ['oculus', 'vive', 'daydream', 'gearvr', 'ios', 'android'];
        return _.map(notifications, (val, key) => {
            let notification = {
                typeClass: val.error ? 'red' : 'blue',
                readClass: val.isRead ? 'readed' : 'not-readed',
                isRead:val.isRead,
                date: moment(val.createdAt).fromNow(),
                originDate:val.createdAt,
                label: '<span>'+val.label+'</span>',
                id : val._id
            };
            if (val.project && !val.error) {

                const device = _.find(validDevices, ( s ) => {
                    return val.label.indexOf(s) !== -1;
                });

                /// TODO: Xch stex editori buildi depqnel dnenq syntax errora qcum

                let url = '';
                switch(device){
                    case 'ios':
                        url = 'app.editprojectIos';
                        break;
                    case 'android':
                        url = 'app.editprojectAndroid';
                        break;
                    case 'oculus':
                        url = 'app.editprojectOculus';
                        break;
                    case 'vive':
                        url = 'app.editprojectVive';
                }
                url+="({ projectId:'"+val.project._id+"'})";

                notification.label = '<a ui-sref=" '+url+'">'+val.label+'</a>';
            }

            return notification;
        });
    }

    return factory;
}

export default NotificationstStore;