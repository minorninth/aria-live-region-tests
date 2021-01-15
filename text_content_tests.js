// These are the different permutations of ARIA attributes to try.
var attrs = [
  'alert',
  'aria-live="polite" aria-relevant="text additions" (default)'];

build();

var live_region_counter = 0;

addTests(
    'alert',
    'add new alert to page',
    '<div></div>',
    function(region) {
      region.innerHTML = '<div role="alert">Alert ' + (++live_region_counter) + '.</div>';
    });

addTests(
    'text',
    'set textContent',
    '<div ARIA-ATTRS></div>',
    function(region) {
      region.innerHTML = 'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'text',
    'set textContent (repeat same text)',
    '<div ARIA-ATTRS></div>',
    function(region) {
      region.innerHTML = 'Live region succeeded';
    });

addTests(
    'text',
    'set textContent in inner div',
    '<div ARIA-ATTRS><div id="setTextContentInInnerDiv"></div></div>',
    function(region) {
      document.getElementById('setTextContentInInnerDiv').innerHTML =
          'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'text',
    'set textContent in inner paragraph',
    '<div ARIA-ATTRS><p id="setTextContentInInnerPara"></p></div>',
    function(region) {
      document.getElementById('setTextContentInInnerPara').innerHTML =
          'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'text',
    'set innerText replacing similar text',
    '<div ARIA-ATTRS>Live region space</div>',
    function(region) {
      region.innerText = 'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'additions',
    'append new div as child',
    '<div ARIA-ATTRS></div>',
    function(region) {
      var msg = document.createElement('div');
      var text = document.createTextNode('Live region succeeded ' + (++live_region_counter));
      msg.appendChild(text);
      region.appendChild(msg);
    });

addTests(
    'additions',
    'append two new divs as children',
    '<div ARIA-ATTRS></div>',
    function(region) {
      var msg = document.createElement('div');
      var text = document.createTextNode('This live region has a first half ');
      msg.appendChild(text);
      region.appendChild(msg);

      window.setTimeout(function() {
	msg = document.createElement('div');
	text = document.createTextNode('and a second half');
	msg.appendChild(text);
	region.appendChild(msg);
      }, 50);
    });

addTests(
    'additions',
    'add element to live region that already has content',
    '<div ARIA-ATTRS><div>Live region failed.</div></div>',
    function(region) {
      var msg = document.createElement('div');
      var text = document.createTextNode('Live region succeeded ' + (++live_region_counter));
      msg.appendChild(text);
      region.appendChild(msg);
    });

addTests(
    'additions',
    'add element to atomic live region',
    '<div ARIA-ATTRS aria-atomic="true">Live region s</div>',
    function(region) {
      var msg = document.createElement('span');
      var text = document.createTextNode('ucceeded ' + (++live_region_counter));
      msg.appendChild(text);
      region.appendChild(msg);
    });

addTests(
    'additions',
    'set textContent of two elements in an atomic live region',
    '<div ARIA-ATTRS aria-atomic="true">' +
    '<div id="atomic-a"></div>' +
    '<div id="atomic-b">region</div>' +
    '<div id="atomic-c"></div>' +
    '</div>',
    function(region) {
      document.getElementById('atomic-a').textContent = 'Live';
      document.getElementById('atomic-c').textContent = 'succeeded';
    });

addTests(
    'additions',
    'set textContents of live region grandchild',
    '<div ARIA-ATTRS>' +
    '<div id="abc"></div>' +
    '</div>',
    function(region) {
      document.getElementById('abc').textContent = 'Live region succeeded ' + (++ live_region_counter);
    });

addTests(
    'additions',
    'two live region changes, one second apart',
    '<div ARIA-ATTRS id="first"></div>' +
    '<div ARIA-ATTRS id="second"></div>',
    function(region) {
      document.getElementById('first').textContent =
          'This utterance should be interrupted before it finishes';
      setTimeout(function() {
        document.getElementById('second').textContent = 'Live region succeeded ' + (++live_region_counter);
      }, 1000);
    });

addTests(
    'additions',
    'remove display none',
    '<div ARIA-ATTRS><div style="display:none">Live region succeeded ' + (++live_region_counter) + '</div></div>',
    function(region) {
      region.firstElementChild.style.display = 'block';
    });

addTests(
    'additions',
    'remove visibility hidden',
    '<div ARIA-ATTRS><div style="visibility:hidden">Live region succeeded ' + (++live_region_counter) + '</div></div>',
    function(region) {
      region.firstElementChild.style.visibility = 'visible';
    });

addTests(
    'text',
    'text node set data',
    '<div ARIA-ATTRS>Live region failed.</div>',
    function(region) {
      region.firstChild.data = 'Live region succeeded ' + (++live_region_counter);
    });

addTests(
    'text',
    'text node replaceData',
    '<div ARIA-ATTRS>Live region failed.</div>',
    function(region) {
      region.firstChild.replaceData(12, 6, 'succeeded ' + (++live_region_counter));
    });

addTests(
    'additions',
    'reparent div with existing text',
    '<div ARIA-ATTRS></div>' +
    '<div id="offscreen" style="position: absolute; left: -99999px;">' +
    'Live region succeeded ' + (++live_region_counter) +
    '</div>',
    function(region) {
      region.appendChild(document.getElementById('offscreen').firstChild);
    });
