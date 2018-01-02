var SocketClientManager = require('SocketIO/SocketClientManager');
var NSURL = require('Foundation/NSURL');
var NSDictionary = require('Foundation/NSDictionary');

var url = NSURL.alloc().initWithString('http://localhost:8080');
var manager = SocketClientManager.alloc().initWithSocketURLConfig(url, NSDictionary.dictionaryWithObjectsAndKeys(true, 'log', true, 'compress'));
var socket = manager.defaultSocket;

socket.onCallback('connect', function(data, ack) {
    Ti.API.info('socket connected');
});

socket.onCallback('currentAmount', function(data, ack) {
  var cur = data.objectAtIndex(0).floatValue;
  socket.emitWithAckWithTimingOutAfterCallback('canUpdate',[ cur ], 0, function(data) {
      socket.emitWith('update', [ NSDictionary.dictionaryWithObjectsAndKeys((cur + 2.50), 'amount') ]);
  });

  ack.with([ 'Got your currentAmount, ', 'dude' ]);
});

var win = Ti.UI.createWindow({
  backgroundColor: '#fff'
});

var btn = Ti.UI.createButton({
  title: 'Connect Socket'
});

btn.addEventListener('click', function(e) {
  socket.connect();
});

win.add(btn);
win.open();
