/* 
 * главный файл приложения
 * 
 * 
 * 
 */

if(!window.console) {
	window.console = {
		log: Ext.emptyFn
	}
}

Ext.onReady(function(){
	new Ext.ux.Application();

}, this,  {single: true});



