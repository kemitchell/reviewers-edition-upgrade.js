This npm package exports a single function. The function takes two
[reviewers edition][reved] string arguments and returns `true` if users
of the first argument edition should automatically upgrade to the second
argument edition, and `false` if they should not. The function throws an
exception if either argument is not a valid reviewers edition string.

[reved]: https://npmjs.com/packages/reviewers-edition-parse

Usage is analogous to [node-semver][node-semver]'s `semver.satisfies(version, range)`, with two key differences:

1. `satisfies` takes the constraint (a "sevmer range") as its second
   argument, while reviewers-edition-upgrade takes the constraint (the
   current reviewer edition) as its first argument.

2. node-semver uses different syntax for ranges and versions.
   reviewers-edition-upgrade uses valid reviewers editions for both arguments.

[node-semver]: https://www.npmjs.com/package/semver

The following examples are also the test suite for the function. The
tests use Node.js' built-in `assert` module.

```javascript
var assert = require('assert')
var upgrade = require('reviewers-edition-upgrade')
```

Users should not automatically upgrade to updated editions without
reviewing changes.

```javascript
assert(!upgrade('1e', '1e1u'))
```

Users should not automatically upgrade to new editions without
reviewing as a whole.

```javascript
assert(!upgrade('1e', '2e'))
```

Users can automatically upgrade from drafts of new editions to the final
new editions.

```javascript
assert(upgrade('1e1d', '1e'))
```

Users should not automatically upgrade from one update to another
without reviewing changes.

```javascript
assert(!upgrade('1e1u', '1e2u'))
```

Users should automatically upgrade to corrections.

```javascript
assert(upgrade('1e1u', '1e1u1c'))
```

Users should not automatically upgrade to drafts of corrections.

```javascript
assert(!upgrade('1e1u', '1e1u1c1d'))
```

Users should not automatically upgrade to drafts of new updates.

```javascript
assert(!upgrade('1e1u', '1e2u1d'))
```
