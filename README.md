#Tix

Tix is a unique id generator.

1. Gives you unique ids
2. Keeps track of whether a given id has been taken
3. You can release a previously taken id
4. Automatically expands backing store
4. Uses bitmasks on an integer array for speed and awesomeness

```javascript
var Tix = require('tix');

var ids = new Tix();

var id = ids.take(); // 0

var anotherId = ids.take(); // 1

ids.has(1); // true
ids.has(2); // false

var id = ids.take(); // 2
ids.has(2); // false

ids.release(1);
ids.has(1); // false

var id = ids.take() // 1
```

## API

### take() -> integer

returns the smallest positive integer not currently taken.

### has() -> boolean

returns `true` or `false` depending on whether or not a given id currently taken.

### release(id: integer) -> void

releases a taken id. Does nothing if the passed id hasn't been taken.
