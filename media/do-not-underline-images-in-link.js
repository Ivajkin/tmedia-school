$(function(){
	$('a:has(img)').addClass('no-u').contents()
        .filter(function(){return this.nodeType === 3})
        .wrap('<u />');;
});