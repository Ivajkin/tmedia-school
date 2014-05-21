$(document).ready(
	function()
	{
		$('#subscribe').click(function()
			{
				
				var value = $('#email').val();
				var type = $('#type').val();
				var eventId = $('#eventId').val();
				if (value != '')
				{
					$(this).attr('disabled', 'disabled').addClass('disabled');
					$('#subscribeContainer').html('<div style="margin-left: 0; z-index:1000; position:relative; margin-right:100px; "><p>Мы напишем вам по адресу <b>' + value + '</b>, ' + $('#subscribeContainer').attr('data-description') + '. Без спама.</p></div>');
					$.post(
						'/rp/subscribe.php',
						{
							'email': value,
							'type': type,
							'eventId': eventId
						}
					);
				}
				return false;
			}
		)
		
		$('#email').on('keydown change blur',
			function()
			{
				var $button = $('#subscribe');
				var value = $.trim($(this).val());
				if (value == '')
				{
					$button.attr('disabled', 'disabled');
				}
				else
				{
					$button.removeAttr('disabled');
				}
			}
		)
	}
);