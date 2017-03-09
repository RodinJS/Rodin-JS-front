function ContactsConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.contacts', {
			url: '/contacts',
			controller: 'ContactsCtrl as $ctrl',
			templateUrl: 'pages/contacts/contacts.html',
			title: 'Contacts',
            pageClass:'new',
        })
}

export default ContactsConfig;
