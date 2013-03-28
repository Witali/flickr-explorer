/* 
 */

Ext.ns('Ext.ux');

Ext.ux.Application = Ext.extend(Ext.Window, {
	
	config: {
		flickrParams: {
			api_key: '7031f95952091a7a6e9c9a1f61160b70',
			api_sig: '',
			user_id: '21075872@N02', // nvidia id
			perms: 'read'
		},
		
		imgUrlTpl: ''

	},
	
	constructor: function() {
		
		
	},
	
	initComponent: function() {
		
	},
	
	
	buildUrl: function() {
		
	},
	
	items: [{
		xtype: 'thumbnails'
			
	}, {
		xtype: 'imgview'
		
	}]
	
});

