/**
 * This is a simple CSS parser.
 *
 * @warning This will NOT work with media queries. Use advanced parsers if you need those.
 *
 * @note Public methods of this parser are the only ones that PolyCalc needs (reimplement them if you use a different CSS parser).
 *
 * @author Maciej Nux Jaros
 * @license MIT
 *
 * @requires jQuery
 * @provides simpleCssParser
 * 
 * @param {jQuery} $ The jQuery object.
 */
(function($) {

window.simpleCssParser = new SimpleCssParser();

function SimpleCssParser() {
	var cssCache = {};
	
	var stylesheetElements = [];

	/**
	 * Init parser with stylesheet list.
	 *
	 * @param {Array} stylesheets Stylesheet elements array (don't have to be jQuery).
	 * @returns {_L16.SimpleCssParser} Self.
	 */
	this.init = function(stylesheets) {
		stylesheetElements = stylesheets;
		return this;
	};

	function parsePurifiedCss (cssText, onRule) {
		cssText.replace(/(\S.*)\{([\s\S]+?)\}/g, function (a, selector, propertiesText){
			onRule(selector, propertiesText);
		});
	}

	/**
	 * Parse properties text from single rule.
	 *
	 * @param {String} propertiesText
	 * @param {Array} propertiesFilter Names of properties to be returned (the rest is ignored) e.g. ['width'].
	 * @returns {Array} Array with {property:'', value:'', priority:''}; both are trimmed.
	 */
	this.parseProperties = function(propertiesText, propertiesFilter) {
		var properties = [];
		(propertiesText+";").replace(/(\S.*):\s*([\s\S]+?)(?:\s*!(important))?;/g, function (a, name, value, priority){
			value = value.replace(/\s+$/, '');
			if (!$.inArray(value, propertiesFilter)) {
				return;
			}
			properties.push({
				property:name.replace(/\s+$/, ''),
				value:value,
				priority:(typeof(priority)=='undefined' ? '' : priority)
			});
		});
		return properties;
	};

	/**
	 * CSS rules traversing (asynchronous or immediate).
	 *
	 * @param {Function} onRule Function that recives rules:
	 *	function(selector, propertiesText) {
	 *		...do whatever...
	 *	};
	 */
	this.traverseRules = function(onRule) {
		for (var i=0; i < stylesheetElements.length; i++) {
			var href = stylesheetElements[i].getAttribute('href');
			if (href in cssCache) {
				parsePurifiedCss(cssCache[href], onRule);
				continue;
			}

			$.get(href, function(cssText) {
				cssText = cssText
						.replace(/\/\*[\s\S]+?\*\//g, '')	// comments del
						.replace(/[\r\n]+/g, '\n')	// unify lines
						.replace(/[\t ]+/g, ' ')	// unify space
						.replace(/\s+\{/g, '{')		// unify/trim rules
						.replace(/\}\s*/g, '}\n')	// unify/trim rules
				;

				cssCache[href] = cssText;
				parsePurifiedCss(cssText, onRule);
			});
		}
	};
}
})(jQuery);