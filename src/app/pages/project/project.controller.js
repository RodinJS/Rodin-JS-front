class ProjectCtrl {
	constructor(AppConstants, Project, $state) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.Project = Project;
		this.$state = $state;

		this.project = {
			name: "",
			description: ""
		};

		this.showLoader = false;

		this.tinymceOptions = {
			menubar:false,
			statusbar: false,
			toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist',
			inline: false,
			plugins : 'advlist autolink link image lists charmap print preview',
			theme : "modern"
		};
	}

	save() {
		this.showLoader = true;
		this.Project.create(this.project).then(
			data => {
				this.showLoader = false;
				this.$state.go('app.dashboard');
			},
			err => {
				this.showLoader = false;
			}
		)
	}
}

export default ProjectCtrl;
