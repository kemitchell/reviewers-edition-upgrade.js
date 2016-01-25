This npm package exports a single function. The function takes two
[reviewers edition][reved] string arguments and returns `true` if users
of the first argument edition should automatically upgrade to the second
argument edition, `false` if they should not. The function throws an
exception if either argument is not a valid reviewers edition string.

[reved]: https://npmjs.com/packages/reviewers-edition-parse

```javascript
var upgrade = require('reviewers-edition-upgrade')
```

# Examples

The following examples are also the test suite for the function. The
tests use Node.js' built-in `assert` module.

```javascript
var assert = require('assert')
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

Users can also automatically upgrade from drafts of new editions to
corrections to those editions.

```javascript
assert(upgrade('1e1d', '1e2c'))
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

The function throws an error if it receives an invalid reviewers edition
string argument.

```javascript
assert.throws(function() { upgrade('1.0.0', '1e') })
assert.throws(function() { upgrade('1e', '1.0.0') })
```

# Comparison to node-semver's `satisfies`

Usage is analogous to [node-semver][node-semver]'s `.satisfies()`, with
three key exceptions:

1. `satisfies` takes the constraint (a "sevmer range") as its second
   argument, while reviewers-edition-upgrade takes the constraint (the
   current reviewer edition) as its first argument.

2. node-semver uses different syntax for ranges and versions.
   reviewers-edition-upgrade uses valid reviewers editions for both arguments.

3. While their syntaxes are similar, the meaning and purpose of semantic
   versions and reviewers editions are different.

[node-semver]: https://www.npmjs.com/package/semver

At a high level, reviewers-edition-upgrade supports fewer kinds of
constraints, and the constraints it does support are conservative
relative to what node-semver supports. Starting editions like `1e`,
`1e1u`, and `1e1u1c` are loosely analogous to `~1.0.0`, `~1.1.0`, and
`~1.1.1`, respectively. Starting editions with draft numbers, like
`1e1d`, are loosely analogous to ranges like `~1.0.0-alpha.1`.
