var doubleHover = function(parentSelector) {
  $('a').live('mouseover',
     function() {
       var $this = $(this);
       $this.parents(parentSelector).find('a[href="' + $this.attr('href') + '"]').not($this).addClass('pseudo-hover');
     }
  );
  $('a').live('mouseout',
     function() {
       $('a').removeClass('pseudo-hover');
     }
  );
}

$(function(){
  doubleHover('.doublehover');
});
