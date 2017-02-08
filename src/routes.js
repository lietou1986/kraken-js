var controller = require('./controllers');
var searchController = require('./controllers/jobs');
var assistController = require('./controllers/assist');

var searchMiddleware = require('./middlewares/search');
var seoRedirectMiddleware = require('./middlewares/seoredirect');


module.exports = function (router) {
    router.get('/', controller.index);

    router.get('/jobs/companysearch.ashx?*', searchMiddleware.setCompanySearchInfo, searchController.companySearch);
    router.get('/jobs/searchresult.ashx?*', searchMiddleware.setSearchInfo, searchController.index);
    router.get('/jobs/redirecturl', searchController.redirectUrl);

    router.get('/assist/seoredirect', seoRedirectMiddleware.setRedirectInfo, assistController.seoRedirect);
    router.get('/assist/getjobcount', searchMiddleware.setSearchInfo, assistController.getJobCount);

    router.get('/assist/getip/:ip', assistController.getIp);
    router.get('/assist/getip', assistController.getIp);

    router.get('/error', controller.error);
    router.get('/nofound', controller.nofound);
};