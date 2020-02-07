// These are the different permutations of ARIA attributes to try.
var attrs = [
    'role="alert"',
    'aria-live="polite" aria-relevant="text additions" (default)',
    'aria-live="polite" aria-relevant="additions"',
    'aria-live="polite" aria-relevant="text"',
    'aria-live="assertive" aria-relevant="text additions"'];

var live_region_counter = 0;

// Adds one test to the page.
function addTest(section, title, regionInnerHTML, clickHandler) {
  var testContainer = document.createElement('div');
  testContainer.className = 'testContainer';

  var button = document.createElement('button');
  button.innerHTML = title;
  testContainer.appendChild(button);

  var regionContainer = document.createElement('div');
  regionContainer.className = 'regionContainer';
  regionContainer.innerHTML = regionInnerHTML;
  testContainer.appendChild(regionContainer);

  section.appendChild(testContainer);

  button.addEventListener('click', function() {
    clickHandler(regionContainer.firstElementChild);
  }, false);
}

// Adds a test to potentially multiple sections of the page.
function addTests(attrMatch, title, regionInnerHTML, clickHandler) {
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (attr.indexOf(attrMatch) == -1)
      continue;
    var newHTML = regionInnerHTML.replace(/ARIA-ATTRS/g, attr);
    addTest(sections[i], title, newHTML, clickHandler);
  }
}

var sections = [];
for (var i = 0; i < attrs.length; i++) {
  var section = document.createElement('section');
  document.body.appendChild(section);
  sections.push(section);

  var attr = attrs[i];
  var heading = document.createElement('h2');
  heading.innerHTML = attr;
  section.appendChild(heading);
}

addTests(
    'alert',
    'add new alert to page',
    '<div></div>',
    function(region) {
      region.innerHTML = '<div role="alert">Alert ' + (++live_region_counter) + '.</div>';
    });

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
    'change unrelated attribute in a live region, should not speak',
    '<div id="foo15" ARIA-ATTRS>Live region failure' +
    '</div>',
    function(region) {
      document.getElementById('foo15').className = 'cats-are-liquid';
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
    '<div id="offscreen" style="position: absolute; left: 99999px;">' +
    'Live region succeeded ' + (++live_region_counter) +
    '</div>',
    function(region) {
      region.appendChild(document.getElementById('offscreen').firstChild);
    });

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
