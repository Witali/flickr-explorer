/* 
 */

Ext.ns('Ext.ux');

Ext.ux.Application = Ext.extend(Ext.Viewport, {
	
	config: {
		flickrParams: {
			api_key: '7031f95952091a7a6e9c9a1f61160b70',
			method: 'flickr.people.getPublicPhotos',
			user_id: '21075872@N02', // nvidia id
			perms: 'read'
		},
		
		imgUrlTpl: ''

	},
	
	constructor: function(cfg) {
		Ext.ux.Application.prototype.constructor.apply(this, arguments);
        
	},
	
	initComponent: function() {
		
	},
	
	buildSrcUrl: function() {
		
	},
	
	initStore: function() {
		var store = new Ext.data.Store({
			url: this.buildSrcUrl(),
			root: 'images',
			fields: [
				'name', 'url',
				{name:'size', type: 'float'},
				{name:'lastmod', type:'date', dateFormat:'timestamp'}
			]
		});
	},
	
	
	layout: 'fit',
	
	items: [{
		xtype: 'imgview'
		
	}]
	
});

