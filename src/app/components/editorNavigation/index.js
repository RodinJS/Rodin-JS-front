/**
 * Created by xgharibyan on 10/29/16.
 */
function EditorNavigation() {
    'ngInject';

    const ControllerInjector = [
        '$scope',
        '$state',
        '$stateParams',
        editorNavigationCtrl
    ];

    return {
        restrict: 'E',
        templateUrl: 'components/editorNavigation/index.html',
        bindToController: true,
        controllerAs: 'vm',
        replace: true,
        controller: ControllerInjector
    };
}

function editorNavigationCtrl($scope, $state, $stateParams){
    const vm = this;
    const active = $state.$current.url.segments[1].replace(/\//g,'') || 'setting';
    vm.projectID = $stateParams.projectId;
    vm.navigation = {
      setting:{
         active:false,
         title:'Settings',
         url:'app.editproject'
      },
      ios:{
         active:false,
         title:'IOS',
         url:'app.editprojectIos'
      },
      android: {
          active:false,
          title:'Android',
          url:'app.editprojectAndroid'
      },
      oculus:{
          active:false,
          title:'Oculus',
          url:'app.editprojectOculus'
      },
      vive:{
          active:false,
          title:'VIVE',
          url:'app.editprojectVive'
      },
      web:{
          active:false,
          title:'Web',
          url:'app.editprojectWeb'
      },
      publish:{
          active:false,
          title:'Publish',
          url:'app.editprojectPublish'
      }
      //app.editproject({projectId: $ctrl.project._id})
    };

    vm.navigation[active].active = true;

    vm.goTo = function(url){
        $state.go(url, {projectId: vm.projectID});
    }

}

export default EditorNavigation;
