var keystone = require('keystone');
var Types = keystone.Field.Types;

var WebLink = new keystone.List('WebLink', {
	label: 'All Fields',
	singular: 'WebLink',
	plural: 'WebLinks',
	autokey: { from: 'name', path: 'autokey', unique: true },
});

WebLink.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});


WebLink.schema.virtual('otherSelectValue').get(function () {
	return (this.otherSelect === 'other') ? this.otherValue : this.otherSelect;
});

WebLink.track = true;
WebLink.register();
