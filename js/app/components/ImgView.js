/* 
 * просмотр картинок
 */

Ext.ns('Ext.ux');

Ext.ux.ImgView = Ext.extend(Ext.DataView, {
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
			'<a class="imgview-close">&times;</a>',
			'<a class="imgview-next">&gt;</a>',
			'<a class="imgview-prev">&lt;</a>',
		'</div>'
		),
			
	itemSelector: 'li.imgview-thumbnail-block',
	overClass   : 'imgview-hover',
	singleSelect: true,
	autoScroll  : true,
	LoadMask: true,
	
	constructor: function(cfg) {
		
		Ext.DataView.apply(this, arguments);

		this.precompileTpl('smallImgUrlTpl', 'largeImgUrlTpl');
	},
	
	listeners: {
		'dblclick': function() {
			this.showLargeImg();
		},
		
		'render': function() {
			var me = this;
			me.mask = new Ext.LoadMask(this.ownerCt.el, {msg:"Please wait..."});

			this.store.on('beforeload', function() {
				me.mask.show();
			});

			this.store.on('load', function() {
				me.mask.hide();
			});
			
		}
	},
		
	precompileTpl: function() {
		for(var i = 0, n = arguments.length, name; i < n; ++i ) {
			name = arguments[i];
			this[name] = (new Ext.Template(this[name]));
			this[name].compile();
		}
	},
	
	showLargeImg: function(url) {
		var me = this,
			body = me.el,
			ownEl = me.ownerCt.el,
			closeBtn = body.select('.imgview-close'),
			imgBlock = body.select('.imgview-large-block'),
			imgLarge = body.select('img.imgview-large').item(0).dom;

        var selNode = me.getSelectedNodes()[0],
			selectedEl = new Ext.Element(selNode);
		
		var rec = me.store.getById(selNode.getAttribute('data-id'));

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
			0.35, function() {
				imgBlock.setStyle('height', '100%');
				imgBlock.setStyle('width', '100%');
				
				
			});
		};
		
		closeBtn.on('click', function() {
			me.hideLargeImg();
		}, me, {
			single: true
		});
		
		img.src = this.largeImgUrlTpl.apply(rec.data);
	
	},
	
	hideLargeImg: function() {
		var imgBlock = this.el.select('.imgview-large-block');
		imgBlock.setDisplayed(false); 
	},
	
	prepareData: function(data) {
		
		data.smallImgUrl = this.smallImgUrlTpl.apply(data);
		return data;
	}
	
	
});

Ext.reg('imgview', Ext.ux.ImgView);

