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

var sections = [];

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

function build() {
  for (var i = 0; i < attrs.length; i++) {
    var section = document.createElement('section');
    document.body.appendChild(section);
    sections.push(section);

    var attr = attrs[i];
    var heading = document.createElement('h2');
    heading.innerHTML = attr;
    section.appendChild(heading);
  }
}
