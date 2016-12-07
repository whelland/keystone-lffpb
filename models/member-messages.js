var keystone = require('keystone');
var Types = keystone.Field.Types;

var MemberMessage = new keystone.List('MemberMessage', {
	label: 'All Fields',
	singular: 'MemberMessage',
	plural: 'MemberMessages',
	autokey: { from: 'name', path: 'autokey', unique: true },
});

MemberMessage.add({
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


MemberMessage.schema.virtual('otherSelectValue').get(function () {
	return (this.otherSelect === 'other') ? this.otherValue : this.otherSelect;
});

MemberMessage.track = true;
MemberMessage.register();
