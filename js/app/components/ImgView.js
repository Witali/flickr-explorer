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
			'<table class="imgview-large-table"><tr><td>',
			'<img class="imgview-large" src="{Ext.BLANK_IMAGE_URL}" />',
			'</td></tr><table>',
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
		
		selectionchange: function(me, selections) {
			this.showLargeImg(true);
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
	
	refresh: function() {
		Ext.ux.ImgView.superclass.refresh.call(this);
		this.addLargeImgBlockListeners();
	},
		
	precompileTpl: function() {
		for(var i = 0, n = arguments.length, name; i < n; ++i ) {
			name = arguments[i];
			this[name] = (new Ext.Template(this[name]));
			this[name].compile();
		}
	},
	
	showLargeImg: function(animate) {
		var selNode = this.getSelectedNodes()[0];
		if(!selNode) {
			return;
		}
		
		var me = this,
			body = me.el,
			ownEl = me.ownerCt.el,
			imgBlock = body.select('.imgview-large-block'),
			imgLarge = body.select('img.imgview-large').item(0),
			imgLargeDom = imgLarge.dom,
			selectedEl = new Ext.Element(selNode),
			rec = me.store.getById(selNode.getAttribute('data-id')),
			myMask = new Ext.LoadMask(selNode, {msg:"Please wait..."});
			
		if(animate) {	
			myMask.show();
		}
		
		var setEndState = function() {
				imgBlock.setStyle('height', '100%');
				imgBlock.setStyle('width', '100%');
			};
		
		// Предварительно загружаем фото
		var img = new Image();
		img.onload = function() {
			myMask.hide();
			imgLargeDom.setAttribute('src', img.src);
			
			var fromRegion = selectedEl.getRegion(),
				toRegion = ownEl.getRegion();
			
			imgBlock.setDisplayed(true);
			if(animate) {
				imgBlock.animate({
					opacity: {to: 1, from: 0},
					top: {to: 0, from: fromRegion.top},
					left: {to: 0, from: fromRegion.left},
					height: {to: toRegion.bottom, from: fromRegion.bottom - fromRegion.top},
					width: {to: toRegion.right, from: fromRegion.right - fromRegion.left}
				}, 0.35, setEndState);
			}
			else {
				setEndState();
			}
		};
		
		img.src = this.largeImgUrlTpl.apply(rec.data);
	
	},
	
	// запрещаем снимать выделение при клике не на элемент
	// предотвращаем сброс выделения при щелчке в режиме просмотра фото
	onContainerClick: Ext.emptyFn,
	
	addLargeImgBlockListeners: function() {
		var me = this,
			body = me.el,
			closeBtn = body.select('.imgview-close'),
			nextBtn = body.select('.imgview-next'),
			prevBtn = body.select('.imgview-prev');
		
		closeBtn.on('click', function() {
			me.hideLargeImg();
		});
		
		nextBtn.on('click', function() {
			me.showNextLargeImg();
		});
		
		prevBtn.on('click', function() {
			me.showPrevLargeImg();
		});
		
	},
	
	showNextLargeImg: function() {
		var me = this,
			nextIndex = me.getSelectedIndexes()[0] + 1,
			store = me.getStore(),
			count = store.getCount();
			
		if(nextIndex < count) {
			this.select(nextIndex, false, true);
			this.showLargeImg();
		}
		else {
			var lastParams = Ext.apply({
				start: 0
			}, store.baseParams, store.lastOptions && store.lastOptions.params);
			
			store.load({
				params: {
					start: lastParams.start + lastParams.per_page
				},
				callback: function() {
					me.select(0);
				}
			});
		}
	},

	showPrevLargeImg: function() {
		var me = this,
			prevIndex = this.getSelectedIndexes()[0] - 1,
			store = me.getStore();
			
		if(prevIndex >= 0) {
			this.select(prevIndex, false, true);
			this.showLargeImg();
		}
		else {
			var lastParams = Ext.apply({
				start: 0
			}, store.baseParams, store.lastOptions && store.lastOptions.params);
			
			store.load({
				params: {
					start: lastParams.start - lastParams.per_page
				},
				callback: function() {
					me.select(this.getCount() - 1);
				}
			});
		}
		
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

