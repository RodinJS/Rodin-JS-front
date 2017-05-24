/**
 * Created by xgharibyan on 11/1/16.
 */

function PagesStore(EventBus, BaseStore, $stateParams, $state, Project) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Pages';

    EventBus.on(EventBus.pages.SET, function (scope, data) {
        factory.data.pagesList = data;
        factory.emitChanges();
    });

    EventBus.on(EventBus.pages.SET_CONTENT, function (scope, data) {
        if (!factory.data.pages) factory.data.pages = [];
        const pageIndex = _.findIndex(factory.data.pages, (page)=> page.slug === data.slug);
        if (pageIndex > -1) {
            factory.data.pages[pageIndex] = data;
        } else {
            factory.data.pages.push(data);
        }

        factory.emitChanges();

    });

    factory.getPagesList =  () => {
        return _.map(factory.data.pagesList, (page) => _.pick(page, ['title', 'slug']));
    };

    factory.getHeadarPagesList = () => {
        return _.filter(factory.data.pagesList, (filterPage) => filterPage.state === 'published');
    };

    factory.getFooterPagesList = () => {
        return _.filter(factory.data.pagesList, (filterPage) =>  filterPage.putOnFooter == true);
    };

    factory.getPage = function (url) {
        return _.find(factory.data.pages, (page)=> page.slug === url);
    };

    return factory;
}

export default PagesStore;
