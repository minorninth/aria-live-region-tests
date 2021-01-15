// These are the different permutations of ARIA attributes to try.
var attrs = [
  'aria-live="polite" aria-relevant="text additions" (default)'];

build();

var live_region_counter = 0;

addTests(
    'text',
    'set focus to link 1, then modify live region.',
    '<div ARIA-ATTRS></div>' +
    '<div><a id="f1" href="#" tabindex="-1">Link 1</a></div>',
    function(region) {
      document.getElementById('f1').focus();
      region.innerHTML = 'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'text',
    'modify live region, then set focus to link 2.',
    '<div ARIA-ATTRS></div>' +
    '<div><a id="f2" href="#" tabindex="-1ZZ">Link 2</a></div>',
    function(region) {
      region.innerHTML = 'Live region succeeded ' + (++live_region_counter);
      document.getElementById('f2').focus();
    });

addTests(
    'text',
    'set focus to link 3, then modify live region after delay.',
    '<div ARIA-ATTRS></div>' +
    '<div><a id="f3" href="#">Link 3</a></div>',
    function(region) {
      document.getElementById('f3').focus();
      setTimeout(function() {
        region.innerHTML = 'Live region succeeded ' + (++live_region_counter);
      }, 150);
    });

addTests(
    'text',
    'modify live region, then set focus to link 4 after delay.',
    '<div ARIA-ATTRS></div>' +
    '<div><a id="f4" href="#">Link 4</a></div>',
    function(region) {
      region.innerHTML = 'Live region succeeded ' + (++live_region_counter);
      setTimeout(function() {
        document.getElementById('f4').focus();
      }, 150);
    });
