if (window.location.hash && window.location.hash == '#_=_') {
    window.location.hash = '';
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL) 
}