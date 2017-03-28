import angular from 'angular/index';

// Create the module where our functionality can attach to
let contactsModule = angular.module('landing.contacts', []);

// Include our UI-Router config settings
import ContactsConfig from './contacts.config';
contactsModule.config(ContactsConfig);


// Include controllers
import ContactsCtrl from './contacts.controller';
contactsModule.controller('ContactsCtrl', ContactsCtrl);


export default contactsModule;
