This npm package exports a single function. The function takes two
[Reviewers Edition][reved] string arguments and returns `true` if users
of the first argument edition should automatically upgrade to the second
argument edition, `false` if they should not. The function throws an
exception if either argument is not a valid Reviewers Edition string.

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

Automatically upgrade from an edition to a correction.

```javascript
assert(upgrade('1e', '1e1c'))
```

Automatically upgrade from an update to a correction.

```javascript
assert(upgrade('1e1u', '1e1u1c'))
```

Automatically upgrade from a correction to another correction.

```javascript
assert(upgrade('1e1u1c', '1e1u2c'))
```

Automatically upgrade from a draft to a later draft.

```javascript
assert(upgrade('1e1d', '1e2d'))
```

Automatically upgrade from a draft to the final new edition.

```javascript
assert(upgrade('1e1d', '1e'))
```

Automatically upgrade from a draft to a correction.

```javascript
assert(upgrade('1e1d', '1e1c'))
```

Do not automatically upgrade to new editions.

```javascript
assert(!upgrade('1e', '2e'))
```

Do not automatically upgrade to updates.

```javascript
assert(!upgrade('1e', '1e1u'))
```

Do not automatically upgrade from one update to another update.

```javascript
assert(!upgrade('1e1u', '1e2u'))
```

Do not automatically upgrade to drafts of updates.

```javascript
assert(!upgrade('1e1u', '1e2u1d'))
```

Do not automatically upgrade to drafts of corrections.

```javascript
assert(!upgrade('1e1u', '1e1u1c1d'))
```

Do not automatically upgrade to drafts of new editions.

```javascript
assert(!upgrade('1e1u', '1e1u1c1d'))
```

The function throws an error if it receives an invalid Reviewers Edition
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

2. node-semver uses different syntax for constraints ("ranges") and
   versions. reviewers-edition-upgrade uses valid Reviewers Editions for
   both constraints and versions.

3. While their syntaxes are similar, the meanings and purposes of semantic
   versions and Reviewers Editions are different.

[node-semver]: https://www.npmjs.com/package/semver

At a high level, reviewers-edition-upgrade supports fewer kinds of
constraints, and the constraints it does support are conservative
relative to what node-semver supports. Starting editions like `1e`,
`1e1u`, and `1e1u1c` are loosely analogous to `~1.0.0`, `~1.1.0`, and
`~1.1.1`, respectively. Starting editions with draft numbers, like
`1e1d`, are loosely analogous to ranges like `~1.0.0-alpha.1`.

# reved

This package is bundled with other functions for
creating and manipulating Reviewers Editions in
[reved](https://www.npmjs.com/packages/reved).
