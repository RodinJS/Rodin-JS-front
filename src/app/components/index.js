/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';
import Utils from './utils';


const componentsModule = angular.module('app.components', []);

componentsModule.directive('showAuthed', Utils.ShowAuthed);
componentsModule.directive('checkForUnique', Utils.CheckForUnique);
componentsModule.directive('customInput', Utils.CustomInput);
componentsModule.directive('compile', Utils.Compile);
componentsModule.directive('limitTo', Utils.limitTo);
componentsModule.directive('closeModal', Utils.CloseModal);
componentsModule.directive('ngAutocomplete', Utils.NgAutocomplete);
componentsModule.directive('codify', ['$timeout', Utils.Codify]);
componentsModule.directive('confirmPassword', Utils.ConfirmPassword);
componentsModule.directive('rdScroll', Utils.RdScroll);


import EditorNavigation from './editorNavigation/index';
componentsModule.directive('editorNavigation', EditorNavigation);

export default componentsModule;
