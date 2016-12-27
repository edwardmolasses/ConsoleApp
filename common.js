class Common {
  static contain(str, search) {
    return ~str.indexOf('search');
  }

  static decodeHtml(str) {
    var div = document.createElement('div');
    var decoded;

    div.innerHTML = str;
    decoded = div.firstChild.nodeValue;

    return decoded;
  }
}

export default Common;