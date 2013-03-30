/* 
 */

Ext.ns('Ext.ux');

Ext.ux.Application = Ext.extend(Ext.Component, {
	
	config: {
		flickrParams: {
			api_key: '7031f95952091a7a6e9c9a1f61160b70',
			method: 'flickr.people.getPublicPhotos',
			user_id: '21075872@N02', // nvidia id
			perms: 'read',
			format: 'json',
			perpage: 20
		},
		
		imgUrlTpl: 'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg'

	},
	
	constructor: function(cfg) {
		
		this.initStore();
		
		this.createViewport();
		
		Ext.Viewport.apply(this, arguments);
        
	},

	
	initStore: function() {
		var me = this,
			store = new Ext.data.Store({
			baseParams: this.config.flickrParams,

			autoLoad: true,
			proxy: new Ext.data.ScriptTagProxy({
				url: 'http://api.flickr.com/services/rest/',
				callbackParam: 'jsoncallback'
			}),
			reader: new Ext.data.JsonReader({
				root: 'photos.photo',
				successProperty: 'stat',
				fields: [
				 "id", 
				 "secret", 
				 "server", 
				 "farm", 
				 "title" 
				]
			}),
			listeners: {
				load: function() {
					
					console.log('Загружено'); 
				},
				loadexception: function() {
					console.log('Ошибка', arguments); 
				}
			}
		});
		
		this.store = store;
	},
	
	createViewport: function() {
		this.viewport = new Ext.Viewport({
			layout: 'fit',
			items: [{
				xtype: 'imgview',
				imgUrlTpl: this.config.imgUrlTpl,
				store: this.store
			}]
		});
	}
	


	
});

