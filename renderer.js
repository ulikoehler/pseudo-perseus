/**
 * NOTE: In the browser, you'll need to load the showdown library & KaTeX.
 */
if(typeof(require) === 'function') {
    var showdown = require("showdown");
    var katex = require("katex");
}

/**
 * Pseudo-Perseus renderer.
 */
class PseudoPerseusRenderer {
    constructor() {
        this.converter = new showdown.Converter({tables: true});
    }

    render(str) {
        const origString = str;
        // Remove formulas from the string and replace by §formula§
        let formulae = [];
        const rawFormulae = [];
        let match = null;
        const formulaRegex = /\$((\\\\\$|[^\$])+)\$/g;
        while (match = formulaRegex.exec(str)) {
          rawFormulae.push(match[0]);
          formulae.push(match[1]);
        }
        const errors = [];
        const origFormulae = formulae;
        formulae = formulae.map(
          s => s.replace(/\\begin\{align\}/g, '\\begin{aligned}')
                .replace(/\\end\{align\}/g, '\\end{aligned}')
                .replace(/\\n(?!(abla|ormalsize|eq|warrow|earrow))/g, '\n')
                .replace(/\\\\/g, '\\')
                .replace(/([^\\])\\(?=\n)/g, '$1\\\\')
        );
        for (const formula of rawFormulae) {
          str = str.replace(formula, '§formula§');
        }
        str = str.replace(/\\n/g, '\n');
        let html = this.converter.makeHtml(str);
        // Replace back
        for (const formula of formulae) {
          try {
            html = html.replace('§formula§', katex.renderToString(formula));
          } catch (ex) {
            const infoObj = {
              formulaWithError: formula,
              str: str,
              html: html,
              formulae: formulae,
              origFormulae: origFormulae,
              rawFormulae: rawFormulae,
              exception: ex.message,
              orig_string: origString,
              userAgent: typeof(navigator) === 'undefined' ? 'server' : (function(){return navigator.userAgent;})()
            };
            errors.push(infoObj);
            // console.warn('Rendering failed', infoObj),
            html = html.replace('§formula§', '<span style="color: red; font-weight: bold;">&lt;Failed to render&gt;</span>');
          }
        }
        // Replace inputs
        const inputRegex = /\[\[☃\s+([a-z-]+)\s*\d*\]\]/gu;
        while (match = inputRegex.exec(html)) {
          html = html.replace(match[0], `<span style="color: gray; font-weight: bold;">[ Input of type ${match[1]} ]</span>`);
        }
        return {html: html, errors: []};
    }
}

if(typeof(module) !== 'undefined') {
    module.exports = {
        PseudoPerseusRenderer: PseudoPerseusRenderer
    }
}