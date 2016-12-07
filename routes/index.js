const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'News', key: 'news', href: '/news' },
		{ label: 'About', key: 'about', href: '/about' },
		{ label: 'Shop', key: 'shop', href: '/shop' },
		{ label: 'Instruction', key: 'instruction', href: '/instruction' },
		{ label: 'Members', key: 'members', href: '/members' },
		{ label: 'Events', key: 'events', href: '/events' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
});



keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/news', routes.views.news);
	app.get('/about', routes.views.about);
	app.get('/shop', routes.views.shop);
	app.get('/instruction', routes.views.instruction);
	app.get('/members', routes.views.members);
	app.get('/events', routes.views.events);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	// Downloads
	app.get('/download/users', routes.download.users);

}
