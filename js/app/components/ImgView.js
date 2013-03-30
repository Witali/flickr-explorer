/* 
 * просмотр картинок
 */

Ext.ns('Ext.ux');

Ext.ux.ImgView = Ext.extend(Ext.DataView, {
	
	constructor: function(cfg) {
		
		
		Ext.DataView.apply(this, arguments);
		
		this.smallImgUrlTpl = (new Ext.Template(this.smallImgUrlTpl));
		this.smallImgUrlTpl.compile();
	},
	
	showLargeImg: function(url) {
	
		
	},
	
	hideLargeImg: function() {
		
	},
	
	prepareData: function(data) {
		
		data.smallImgUrl = this.smallImgUrlTpl.apply(data);
		return data;
	},
	
	listeners: {
		'dblclick': function() {
			this.showLargeImg();
		}
	},
	
	cls: 'imgview',
	
	tpl: new Ext.XTemplate(
		'<ul>',
			'<tpl for=".">',
				'<li data-id="{id}" class="imgview-thumbnail-block">',
					'<img class="imgview-thumbnail" src="{smallImgUrl}" />',
					'<strong>{title}</strong>',
				'</li>',
			'</tpl>',
		'</ul>'
		
		),
			
	itemSelector: 'imgview-thumbnail-block',
	overClass   : 'imgview-hover',
	singleSelect: true,
	autoScroll  : true
	
	
});

Ext.reg('imgview', Ext.ux.ImgView);

