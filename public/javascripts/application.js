var socket = io.connect(':8080');
socket.emit('log', { my: 'hello' });
socket.on('presence', function (data) {
  $('div#presence').html(data.presence);
});
