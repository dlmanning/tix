var test = require('tape');
var Tix = require('../index.js');

test('take a number', function (t) {
  var ids = new Tix();
  var id = ids.take();

  t.plan(2);

  t.equal(id, 0, 'got an id');
  t.equal(ids.has(id), true, 'has an id');
});

test('take a lot of numbers', function (t) {
  var ids = new Tix();
  var i;

  t.plan(3);

  for (i = 0; i < 10000; i++) {
    if (i !== ids.take()) {
      t.fail('ticket indexes out of sync');
      break;
    }
  }

  if (i === 10000) {
    t.pass('issued 10000 tickets');
  }

  for (i = 0; i < 10000; i++) {
    if (!ids.has(i)) {
      t.fail('index not tracking id: ' + i);
      break;
    }
  }

  if (i === 10000) {
    t.pass('verified 10000 tickets');
  }

  if (ids.has(10000)) {
    t.fail('took beyond index');
  } else {
    t.pass('didn\'t take more than requested');
  }

});

test('take and release', function (t) {
  var ids = new Tix();

  t.plan(1);

  for (var i = 0; i < 10000; i++) {
    ids.take();
  }

  ids.release(5555);
  var id = ids.take()

  t.equal(id, 5555, 'always take the smallest free id');

});
