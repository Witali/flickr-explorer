/* 
 * просмотр картинок
 */

Ext.ns('Ext.ux');

Ext.ux.ImgView = Ext.extend(Ext.DataView, {
	
	constructor: function(cfg) {
		
		
		Ext.DataView.apply(this, arguments);
		
		this.precompileTpl('smallImgUrlTpl', 'largeImgUrlTpl');
	},
	
	precompileTpl: function() {
		for(var i = 0, n = arguments.length, name; i < n; ++i ) {
			name = arguments[i];
			this[name] = (new Ext.Template(this[name]));
			this[name].compile();
		}
	},
	
	showLargeImg: function(url) {
		var body = this.el,
			ownEl = this.ownerCt.el,
			imgBlock = body.select('.imgview-large-block'),
			imgLarge = body.select('img.imgview-large').item(0).dom;

        var selNode = this.getSelectedNodes()[0],
			selectedEl = new Ext.Element(selNode);
		
		var rec = this.store.getById(selNode.getAttribute('data-id'));

		var myMask = new Ext.LoadMask(selNode, {msg:"Please wait..."});
		myMask.show();
		
		// Предварительно загружаем фото
		var img = new Image();
		img.onload = function() {
			myMask.hide();
			imgLarge.setAttribute('src', img.src);
			
			var fromRegion = selectedEl.getRegion(),
				toRegion = ownEl.getRegion();
			
			imgBlock.setDisplayed(true);
			imgBlock.animate({
				opacity: {to: 1, from: 0},
				top: {to: 0, from: fromRegion.top},
				left: {to: 0, from: fromRegion.left},
				height: {to: toRegion.bottom, from: fromRegion.bottom - fromRegion.top},
				width: {to: toRegion.right, from: fromRegion.right - fromRegion.left}
			},
			0.35);
		};
		
		img.src = this.largeImgUrlTpl.apply(rec.data);
	
	},
	
	hideLargeImg: function() {
		var imgBlock = this.el.query('.imgview-large-block');
		imgBlock.setDisplayed(false); 
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
		'</ul>',
		'<div class="imgview-large-block" style="display: none">',
			'<img class="imgview-large" src="{Ext.BLANK_IMAGE_URL}" />',
		'</div>'
		),
			
	itemSelector: 'li.imgview-thumbnail-block',
	overClass   : 'imgview-hover',
	singleSelect: true,
	autoScroll  : true,
	LoadMask: true
	
	
});

Ext.reg('imgview', Ext.ux.ImgView);

