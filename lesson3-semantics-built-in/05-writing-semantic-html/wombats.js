function wombats() {
  document.body.classList.add('wombats');
}

function addMutationObserver() {
  var main = document.querySelector('main');
  var div = main.querySelector('div.button');

  var divRemoved = false;
  var buttonAdded = false;

  function observe(records, self) {
    for (var record of records) {
      if (record.type != 'childList')
        continue;
      for (var i = 0; i < record.removedNodes.length; i++) {
        if (record.removedNodes[i] === div) {
          divRemoved = true;
        }
      }
      for (var i = 0; i < record.addedNodes.length; i++) {
        var addedNode = record.addedNodes[i];
        if (addedNode.tagName === "BUTTON" &&
            addedNode.parentElement === main &&
            addedNode.className === "button" &&
            addedNode.getAttribute('onClick') === "wombats()") {
          buttonAdded = true;
        }
      }
      if (divRemoved && buttonAdded) {
        document.querySelector('.secret').textContent = 'The secret word is: "MARSUPIAL"'
        document.querySelector('header').classList.add('success');
      }
    }
  }
  var observer = new MutationObserver(observe);
  observer.observe(main, { childList: true, subtree: true });
}
