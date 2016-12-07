var keystone = require('keystone');
var User = keystone.list('User');

module.exports = function (done) {
	new User.model({
		name: {
			first: 'Warren',
			last: 'Helland'
		},
		email: 'whelland@echidna.ca',
		password: 'thomas',
		isAdmin: true,
		
	})
	.save(done);
};
