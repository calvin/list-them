var openerTabId = location.search.substring(1);

chrome.tabs.getCurrent(function(currentTab) {
    chrome.windows.getAll({populate: true}, function (windows) {
        var out = [];
        for (var i = 0; i < windows.length; i++) {
            var win = windows[i];
            var line = ['- '];
            if (win.focused) {
                line.push('_');
            }
            line.push('Window ');
            line.push(i + 1);
            if (win.incognito) {
                line.push(' (incognito)');
            }
            if (win.focused) {
                line.push('_');
            }
            out.push(line.join(''));

            var tabs = win.tabs;
            for (var j = 0; j < tabs.length; j ++) {
                var tab = tabs[j];
                if (currentTab.id == tab.id) {
                    continue;
                }
                if (tab.active || openerTabId == tab.id) {
                    out.push('    - _[' + tab.title + '](' + tab.url +')_');
                } else {
                    out.push('    - [' + tab.title + '](' + tab.url +')');
                }
            }
        }

        out.push('\nGenerated at ' + new Date());

        document.getElementsByTagName('pre')[0].innerText = out.join('\n');
    });
});