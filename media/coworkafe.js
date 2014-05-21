$(document).ready(
	function()
	{
		$('#sendEmail').click(function()
			{
				
				var value = $('#email').val();
				if (value != '')
				{
					/*if ($('#inviteStatus').val() == -1)
					{ */
						$(this).attr('disabled', 'disabled').addClass('disabled');
						$.post(
							'/coworkafe/inviteme/',
							{
								'email': value
							},
							function()
							{
								$('#signupContainer').html('<div style="margin-left: 0; z-index:1000; position:relative; margin-right:100px; "><p>Мы пригласим вас или напишем по адресу <b>' + value + '</b>, когда Коворкафе станет открыто для всех желающих. Без спама.</p></div>');
							}
						);
					/*}
					else
					{
						
						/*$.post(
							'/coworkafe/sendInvite/',
							{
								'email': value
							},
							function()
							{
							}
						);*/
					//}
				}
				return false;
			}
		);
		$('#requestInvite').submit(
			function()
			{
				$('#sendEmail').trigger('click');
				return false;
			}
		);
		
		$('.eventSwitcher').click(
			function()
			{
				var $this = $(this);
				var $function = $this.attr('data-function');
				if ($this.hasClass('dotInfoActive'))
				{
					return;
				}
				if ($this.hasClass('disabled'))
				{
					return;
				}
				$('.eventSwitcher').removeClass('disabled');
				var eventId = $('.liveSovietActive').attr('data-eventId');
				window[$function](eventId);
				$.ajax(
					'/coworkafe/event/getUsers/' + eventId + '/',
					{
						dataType: 'json',
						success: function(data)
						{
							var html = generateUserList(data.users, data.eventId)
							window.userLists['event_' + data.eventId] = html;
						}
					}
				);
			}
		);
		
		$('.liveSoviet').click(
			function()
			{
				$('.liveSoviet').removeClass('liveSovietActive');
				$(this).addClass('liveSovietActive');
				$('#eventUsers').html(window.userLists['event_' + $(this).attr('data-eventId')]);
				drawSwitcher($(this).attr('data-meGo'));
				drawUserList($(this).attr('data-eventId'));
				return false;
			}
		);
		
	}
);

D = {};

function drawSwitcher(meGo)
{
	if (parseInt(meGo))
	{
		$('.eventSwitcher.esGo').removeClass('dotInfo').addClass('dotInfoActive');
		$('.eventSwitcher.esGo').find('.dot').text('•');
		$('.eventSwitcher.esNoGo').removeClass('dotInfoActive').addClass('dotInfo');
		$('.eventSwitcher.esNoGo').find('.dot').text('○');
	}
	else
	{
		$('.eventSwitcher.esNoGo').removeClass('dotInfo').addClass('dotInfoActive');
		$('.eventSwitcher.esNoGo').find('.dot').text('•');
		$('.eventSwitcher.esGo').removeClass('dotInfoActive').addClass('dotInfo');
		$('.eventSwitcher.esGo').find('.dot').text('○');
	}
	
	var seatsRemainingControl = $('.liveSovietActive .sovietSeats');
	var seatsAvailible = $('.liveSovietActive').attr('data-seatsAvailible');
	var seatsRemaining = $('.liveSovietActive').attr('data-seatsRemaining');
	if (seatsRemaining == 0)
	{
		$('.eventSwitcher.esGo').removeClass('enabled').addClass('disabled');
	}
	else
	{
		$('.eventSwitcher.esGo').removeClass('disabled').addClass('enabled');
	}
	if (parseInt(meGo))
	{
		$('.eventSwitcher.esGo').removeClass('disabled').addClass('enabled');
	}
	
}

function drawSeats()
{
	var seatsRemainingControl = $('.liveSovietActive .sovietSeats');
	var seatsAvailible = $('.liveSovietActive').attr('data-seatsAvailible');
	var seatsRemaining = $('.liveSovietActive').attr('data-seatsRemaining');
	var seatsRemainingText = seatsRemaining < 5 ? '<span style="color: #b30;">' + seatsRemaining + '</span>' : seatsRemaining;
	seatsRemainingText = seatsRemainingText + ' из ' + seatsAvailible + ' мест';
	if (seatsRemaining <= 0)
	{
		seatsRemainingText = '<nobr>Мест не осталось</nobr>';
	}
	seatsRemainingControl.html(seatsRemainingText);
}

function visit(eventId)
{
	decreaseSeats(eventId);
	var html = $('#eventUsers').html() + '<nobr class="meLink" id="burosferaUserMeLink"> <span class="burosferaAnd">и</span> <a class="burosferaUserMeLink" href="/burosfera/me/">вы</a></nobr>';
	if (html == '<span class="burosferaAnd">Вы идёте?</span><nobr class="meLink" id="burosferaUserMeLink"> <span class="burosferaAnd">и</span> <a class="burosferaUserMeLink" href="/burosfera/me/">вы</a></nobr>')
	{
		$('#eventUsers').html('<nobr class="meLink" id="burosferaUserMeLink" style="margin-left: 0;"><a class="burosferaUserMeLink" href="/burosfera/me/">Вы</a> <span class="burosferaAnd">идёте</span></nobr>');
	}
	else
	{
		$('#eventUsers').html(html);
	}
	$('.liveSovietActive').attr('data-meGo', 1);
	var userId = $('#applicationData').attr('data-userId');
	$.get(
		'/coworkafe/event/visit/' + userId + '/' + eventId + '/'
	);
	drawSeats();
	drawSwitcher(1);
}

function unvisit(eventId)
{
	increaseSeats(eventId);
	$('#burosferaUserMeLink').remove();
	if ($('#eventUsers').html() == '')
	{
		$('#eventUsers').html('<span class="burosferaAnd">Вы идёте?</span>');
	}
	$('.liveSovietActive').attr('data-meGo', 0);
	var userId = $('#applicationData').attr('data-userId');
	$.get(
		'/coworkafe/event/unvisit/' + userId + '/' + eventId + '/'
	);
	drawSeats();
	drawSwitcher(0);
}

function generateUserList(users, eventId)
{
	var userId = parseInt($('#applicationData').attr('data-userId'));
	var html = '';
	var meGo = '';
	if (users.length == 0)
	{
		html = '<span class="burosferaAnd">Вы идёте?</span>';
	}
	else
	{
		usersResult = [];
		for (var i in users)
		{
			var user = users[i];
			if (user.id != userId)
			{
				usersResult.push('<nobr><a class="burosferaUserOtherLink" href="/burosfera/' + user.englishName + '/">' + user.name + '</a></nobr>');
			}
			else
			{
				meGo = 'yes';
			}
		}
		html += usersResult.join('<span style="margin-right: 5px;" class="burosferaComma">, </span>');
		if (meGo != '')
		{
			if (users.length == 1)
			{
				html = '<nobr class="meLink" id="burosferaUserMeLink" style="margin-left: 0;"><a class="burosferaUserMeLink" href="/burosfera/me/">Вы</a> <span class="burosferaAnd">идёте</span></nobr>';
			}
			else
			{
				if (users.length == 2)
				{
					html = '<span class="burosferaGo">Идёт</span> ' + html + '<nobr class="meLink" id="burosferaUserMeLink"> <span class="burosferaAnd">и</span> <a class="burosferaUserMeLink" href="/burosfera/me/">вы</a></nobr>';
				}
				else
				{
					html = '<span class="burosferaGo">Идут:</span> ' + html + '<nobr class="meLink" id="burosferaUserMeLink"> <span class="burosferaAnd">и</span> <a class="burosferaUserMeLink" href="/burosfera/me/">вы</a></nobr>';
				
				}
			}
		}
		else
		{
			if (users.length == 1)
			{
				html = '<span class="burosferaGo">Идёт</span> ' + html;
			}
			else
			{
				html = '<span class="burosferaGo">Идут:</span> ' + html;
			}
		}
	}
	return html;
}

function drawUserList(eventId)
{
	$.ajax(
		'/coworkafe/event/getUsers/' + eventId + '/',
		{
			dataType: 'json',
			success: function(data)
			{
				var html = generateUserList(data.users, data.eventId)
				var seatsAvailible = parseInt($('.liveSovietActive').attr('data-seatsAvailible'));
				var selectedEventId = parseInt($('.liveSovietActive').attr('data-eventId')) 
				var activeSoviet = $('#event_' + data.eventId);
				window.userLists['event_' + data.eventId] = html;
				activeSoviet.attr('data-seatsRemaining', seatsAvailible - data.users.length);
				if (eventId == data.eventId && selectedEventId == data.eventId)
				{
					$('#eventUsers').html(html);
				} 
				drawSeats();
			}
		}
	);
}

function increaseSeats(eventId)
{
	var seatsAvailible = $('.liveSovietActive').attr('data-seatsAvailible');
	var seatsRemaining = $('.liveSovietActive').attr('data-seatsRemaining');
	seatsRemaining++
	if (seatsRemaining >= seatsAvailible)
	{
		$('.liveSovietActive').attr('data-seatsRemaining', 20); 
	}
	else
	{
		$('.liveSovietActive').attr('data-seatsRemaining', seatsRemaining);
	}
	$('.liveSovietActive').attr('data-seatsRemaining', seatsRemaining);
}

function decreaseSeats(eventId)
{
	var seatsAvailible = $('.liveSovietActive').attr('data-seatsAvailible');
	var seatsRemaining = $('.liveSovietActive').attr('data-seatsRemaining');
	seatsRemaining--
	$('.liveSovietActive').attr('data-seatsRemaining', seatsRemaining);
}

/*function increaseSeats()
{
	var seatsAvailible = $('#seatsRemaining').attr('data-seatsRemaining');
	seatsAvailible++
	$('#seatsRemaining').text(seatsAvailible);
	$('#seatsRemaining').attr('data-seatsRemaining', seatsAvailible);
	redrawSeats();
}

function decreaseSeats()
{
	var seatsAvailible = $('#seatsRemaining').attr('data-seatsRemaining');
	seatsAvailible--
	if (seatsAvailible <= 0)
	{
		$('#seatsRemaining').text('0');
		$('#seatsRemaining').attr('data-seatsRemaining', 0);
	}
	else
	{
		$('#seatsRemaining').text(seatsAvailible);
		$('#seatsRemaining').attr('data-seatsRemaining', seatsAvailible);
	}
	redrawSeats()
}*/