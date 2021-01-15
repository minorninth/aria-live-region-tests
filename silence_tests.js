// These are the different permutations of ARIA attributes to try.
var attrs = [
  'role="alert"'];

var live_region_counter = 0;

build();

addTests(
    'alert',
    'just changing the css position should not announce anything',
    '<div ARIA-ATTRS>This is an alert.</div>',
    function(region) {
      region.style.position = 'absolute';
    });

addTests(
    'alert',
    'changing the css position after deleting the alert text should not announce anything either',
    '<div ARIA-ATTRS>This is an alert.</div>',
    function(region) {
      region.textContent = '';
      region.style.position = 'absolute';
    });

addTests(
    'alert',
    'change unrelated attribute in a live region, should not speak',
    '<div id="foo15" ARIA-ATTRS>Live region failure' +
    '</div>',
    function(region) {
      document.getElementById('foo15').className = 'cats-are-liquid';
    });
