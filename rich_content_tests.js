// These are the different permutations of ARIA attributes to try.
var attrs = [
  'aria-live="polite" aria-relevant="text additions" (default)'];

build();

var live_region_counter = 0;

addTests(
    'additions',
    'append img with alt text',
    '<div ARIA-ATTRS></div>',
    function(region) {
      var img = document.createElement('img');
      img.src = 'http://google.com/favicon.ico';
      img.setAttribute('alt', 'Live region succeeded ' + (++live_region_counter));
      region.appendChild(img);
    });

addTests(
    'text',
    'change img alt text where img is contained within live region',
    '<div ARIA-ATTRS>' +
    '<img src="http://google.com/favicon.ico" alt="Live region failed.">' +
    '</div>',
    function(region) {
      region.firstChild.setAttribute('alt', 'Live region succeeded ' + (++live_region_counter));
    });

addTests(
    'text',
    'change img alt text where aria-live is on img itself',
    '<div>' +
    '<img ARIA-ATTRS src="http://google.com/favicon.ico" alt="Live region failed.">' +
    '</div>',
    function(region) {
      region.firstChild.setAttribute('alt', 'Live region succeeded ' + (++live_region_counter));
    });

addTests(
    'additions',
    'append button with inner text',
    '<div ARIA-ATTRS></div>',
    function(region) {
      var b = document.createElement('button');
      b.tabIndex = -1;
      b.textContent = 'Live region succeeded ' + (++live_region_counter);
      region.appendChild(b);
    });

addTests(
    'additions',
    'append button with aria-label',
    '<div ARIA-ATTRS></div>',
    function(region) {
      var b = document.createElement('button');
      b.tabIndex = -1;
      b.textContent = 'Live region failed.';
      b.setAttribute('aria-label', 'Live region succeeded ' + (++live_region_counter));
      region.appendChild(b);
    });

addTests(
    'text',
    'change button\'s aria-label',
    '<div ARIA-ATTRS>' +
    '<button tabindex="-1" aria-label="Fail 2.">Fail 1.</button>' +
    '</div>',
    function(region) {
      region.firstChild.setAttribute('aria-label', 'Live region succeeded ' + (++live_region_counter));
    });

addTests(
    'text',
    'button which is itself a life region (as opposed to being inside of one)',
    '<div><input type="button" value="Live region failed" tabindex="-1" ARIA-ATTRS>' +
    '</div>',
    function(region) {
      region.firstChild.setAttribute('value', 'Live region succeeded ' + (++live_region_counter));
    });
