/* 
 * просмотр картинок
 */

Ext.ns('Ext.ux');

Ext.ux.ImgView = Ext.extend(Ext.DataView, {
	
	constructor: function() {
		
		
		Ext.DataView.call(this, arguments);
	},
	
	showLargeImg: function(url) {
	
		
	},
	
	hideLargeImg: function() {
		
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
					'<img class="imgview-thumbnail" src="{url}" />',
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

