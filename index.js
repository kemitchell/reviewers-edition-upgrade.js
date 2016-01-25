module.exports = reviewersEditionUpgrade

var parse = require('reviewers-edition-parse')
var numbers = require('reviewers-edition-parse/numbers')

function reviewersEditionUpgrade(current, proposed) {
  // Parse reviewers edition strings to structured data.
  var currentParsed = parse(current)
  var proposedParsed = parse(proposed)
  // Throw errors if either argument was invalid.
  if (!currentParsed) {
    throw new Error('Invalid reviewers edition: "' + current + '"') }
  if (!proposedParsed) {
    throw new Error('Invalid reviewers edition: "' + proposed + '"') }
  // Set any missing edition numbers to placeholder values.
  setMissingValues(currentParsed)
  setMissingValues(proposedParsed)
  // If the current edition number is not the same as the proposed
  // edition number ...
  if (currentParsed.edition !== proposedParsed.edition) {
    // ... do not upgrade automatically.
    return false }
  // If the current update number is not the same as the proposed
  // update number ...
  else if (currentParsed.update !== proposedParsed.update) {
    // ... do not upgrade automatically.
    return false }
  else {
    // If the current edition has a draft number ...
    if (isFinite(currentParsed.draft)) {
      // .. automatically upgrade if ...
      return (
        // .. the proposed correction number is the same and ...
        ( currentParsed.correction === proposedParsed.correction ) &&
        // ... the current draft number is less than the proposed draft
        // number. (Editions without draft numbers have their draft
        // numbers set to `Infinity` by `setMissingValues`.
        ( currentParsed.draft < proposedParsed.draft ) ) }
    // If the current edition does not have a draft number ...
    else {
      // ... automatically upgrade if ...
      return (
        // ... the proposed edition is not a draft and ...
        ( !isFinite(proposedParsed.draft ) ) &&
        // The current correction number is less than the proposed correction
        // number.
        ( currentParsed.correction < proposedParsed.correction ) ) } } }

function setMissingValues(parsed) {
  numbers.forEach(function(number) {
    if (!parsed.hasOwnProperty(number)) {
      parsed[number] = (
        number === 'draft' ?
          // Set missing draft numbers to `Infinity`, since `1e` comes after
          // `1e1d`, `1e2d`, &c.
          Infinity :
          // Set other numbers to `0`, since `1e` comes before `1e1u`, `1e1u`
          // comes before `1e1u1c`, &c.
          0 ) } }) }
