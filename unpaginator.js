var currentPageURI = document.location.href.replace(document.location.origin,'');

var currentPagePathName = document.location.pathname;

var collectAllATags = function() {

  var allHrefs = {};

  var allATags = document.getElementsByTagName("a");

  for (var i=0, max=allATags.length; i < max; i++) {
    var element = allATags[i];
    if (element && element.hasOwnProperty('href')) {
      allHrefs[element.href] = 1;
    }
  }

  return allHrefs;

};

var getPathMatchResults = function(href) {
    var results = /page=(\d*)/.exec(href);
    if (results && results.length > 1 && results[1]) {
      return results;
    } else {
      results = /page\/(\d*)/.exec(href);
      if (results && results.length > 1 && results[1]) {
        return results;
      } else {
        return false;
      }
    }
    return false;
};

var filterPaginatedATags = function(hrefs) {

  var paginatedHrefs = {};

  for (var href in hrefs) {
    if (href.indexOf(currentPagePathName) !== -1 || href.indexOf(currentPagePathName.split('/page/')[0]) !== -1) {
      var results = getPathMatchResults(href);
      if (results) {
        if (paginatedHrefs[results[1]]) {
          continue;
        }
        paginatedHrefs[results[1]] = href;
      }
    }
  }

  if (!paginatedHrefs.hasOwnProperty(1)) {
    paginatedHrefs[1] = document.location.href.split('?')[0];
  }

  return paginatedHrefs;

};

var findCurrentPageNumber = function() {

  var results = getPathMatchResults(currentPageURI);
  if (results && parseInt(results[1])) {
    return parseInt(results[1]);
  } else {
    return 1;
  }

};

// var addPageToDom = function(href, callback) {
//   window.scrollTo(0, 0);
//   document.documentElement.innerHTML = 'Loading... Please wait.';
//   createRequest(href, function(data) {
//     document.documentElement.innerHTML = data;
//     window.scrollTo(0, 0);
//     callback();
//   });
// };

// var createXHR = function () {
//     var xhr;
//     if (window.ActiveXObject) {
//         try {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         catch(e) {
//             xhr = null;
//         }
//     } else {
//         xhr = new XMLHttpRequest();
//     }

//     return xhr;
// };

// var createRequest = function(url, callback) {

//   var xhr = createXHR();

//   xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//           callback(xhr.responseText);
//       }
//   }

//   xhr.open('GET', url, true)
//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   xhr.send();
// };

var filtedAndPaginatedLinks = filterPaginatedATags(collectAllATags());

var currentPageNumber = findCurrentPageNumber();

var nextPageNumber = (filtedAndPaginatedLinks.hasOwnProperty(currentPageNumber+1)) ? currentPageNumber+1 : false;

// console.log('currentPageURI :  %s', currentPageURI);

// console.log('currentPageNumber  %s', currentPageNumber);

// console.log('nextPageNumber  %s', nextPageNumber);

// console.log(filtedAndPaginatedLinks);

var clearWindowOnScroll = function() {
  window.onscroll = function() { };
};

var setupWindowOnScroll = function() {

  clearWindowOnScroll();

  window.onscroll = function(ev) {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrolledToBottom = (scrollTop + window.innerHeight) >= document.body.scrollHeight;
    if (scrolledToBottom) {
      clearWindowOnScroll();
      if (nextPageNumber && filtedAndPaginatedLinks[nextPageNumber]) {
        document.location.href = filtedAndPaginatedLinks[nextPageNumber];
        // addPageToDom(filtedAndPaginatedLinks[nextPageNumber], function() {
        //   history.pushState({'page':nextPageNumber}, "page " + nextPageNumber, filtedAndPaginatedLinks[nextPageNumber]);
        //   nextPageNumber++;
        //   setTimeout(setupWindowOnScroll, 4);
        // }); 
      }
    }
  };

};

// window.onpopstate = function(event) {
//   if (event.state.hasOwnProperty('page')) {
//     nextPageNumber = parseInt(event.state.page);
//     clearWindowOnScroll();
//     addPageToDom(filtedAndPaginatedLinks[nextPageNumber], function() {
//       nextPageNumber++;
//       setupWindowOnScroll();
//     }); 
//   }
// };

setupWindowOnScroll();
