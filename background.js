
  var windowId = false;
  var uid = 100005317655125;
  var tabs = {}

  var pages = {
    mobileNewsfeed: { 
      url : 'http://m.facebook.com/home.php?__user=' + uid,
      script : 'scripts/mobile/newsfeed.js'
    },
    mobileTimeline: {
      url: 'http://m.facebook.com/profile.php?id=' + uid,
      script: 'scripts/mobile/timeline.js'
    },
    desktopNewsfeed: {
      url: 'http://www.facebook.com/',
      script:'scripts/desktop/newsfeed.js',
    },
    desktopTimeline: {
      url: 'http://www.facebook.com/profile.php?id=' + uid,
      script: 'scripts/desktop/timeline.js'
    }
  }


  chrome.browserAction.onClicked.addListener(function(tab) {
    if (windowId){
      chrome.windows.remove(windowId);
      chrome.windows.create({url: "options.html"}, function(w){
        windowId = w.id 
      });
    }else {
      chrome.windows.create({url: "options.html"}, function(w){
        windowId = w.id 
      });  
    }
    // chrome.tabs.executeScript(null, {file: "scripts/jquery.js"});
    // chrome.tabs.executeScript(null, {file: "scripts/visualizer.js"});
  });


  chrome.windows.onRemoved.addListener(function(wId) {
    if (windowId == wId){
      windowId = false;
    }
  });
  
  chrome.tabs.onRemoved.addListener(function(wId) {

  });

  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

      if (request.ogdata == true) {
        loadWindows(request);
      }
  });


  var loadWindows = function(data){
    Object.keys(pages).forEach(function(key) {
      chrome.tabs.create({url:  pages[key].url}, function(w){
        tabs[key] = w.id 
        chrome.tabs.executeScript(w.id, {code: 'var cheese = 1; var mydata = ' + JSON.stringify(data)}, function(){
          chrome.tabs.executeScript(w.id, {file: pages[key].script})
        })
        
      });
    });

  };
  


