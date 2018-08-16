# pseudo-perseus

Pseudo-Perseus is a [Perseus](https://github.com/Khan/perseus) renderer built for the [KATC/Babelfish project](http://katc.localgrid.de) that does not intend to be a full render but rather focuses on

* Maximum practical simplicity
* Ease of use
* Most effect for least effort
* Compatibility with both clientside and serverside

Note that inputs and some other aspects are not rendered as actual inputs but as placeholders.

### Renderer library

The renderer library in `renderer.js` can be used both in the browser (you'll need to include KaTeX!) and in NodeJS

### Server

This project also provides a [koa](https://koajs.com/)-based HTTP server that allows server-side Pseudo-Perseus rendering (and results in HTML).
See `test.py`
