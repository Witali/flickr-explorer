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
			per_page: 20
		},
		
		smallImgUrlTpl: 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_s.jpg',
		largeImgUrlTpl: 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_b.jpg'

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

			autoLoad: false,
			
			paramNames: {
				limit : 'per_page'
			},
			proxy: new Ext.data.ScriptTagProxy({
				url: 'http://api.flickr.com/services/rest/',
				callbackParam: 'jsoncallback'
			}),
			reader: new Ext.data.JsonReader({
				root: 'photos.photo',
				successProperty: 'stat',
				totalProperty: 'photos.total',
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
				},
				beforeload: function(store, options) {
					console.log(options);
					var p = options.params;
					p.page = ~~(p.start / this.baseParams.per_page) + 1;
					

					
				}
			}
		});
		
		store.load({
			start: 0,
			per_page: 20
		});
		this.store = store;
	},
	
	createViewport: function() {
		this.viewport = new Ext.Viewport({
			layout: 'fit',
			items: [{
				xtype: 'panel',
				bodyStyle: 'overflow: auto;',
				bbar: new Ext.PagingToolbar({
					store: this.store,  
					displayInfo: true,
					pageSize: this.config.flickrParams.per_page

				}),
				items: [{
					xtype: 'imgview',
					smallImgUrlTpl: this.config.smallImgUrlTpl,
					largeImgUrlTpl: this.config.largeImgUrlTpl,
					store: this.store
				}]
			}]
		});
	}
	


	
});

