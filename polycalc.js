/**
 * This is a simple polyfill for CSS calc().
 *
 * Evaluates calc() expressions in CSS properties.
 * CSS is only parsed for stylesheets with "PolyCalc" data attribute.
 *
 * Usage (run once a page is ready or after it's changed):
 * polyCalc.run();
 *
 * @note To change supported style properties add them in PolyCalc creation below.
 *
 * @author Maciej Nux Jaros
 * @author (original) Chris Kay: https://github.com/CJKay/PolyCalc
 *
 * @requires jQuery, simpleCssParser
 * @provides polyCalc
 * @param {jQuery} $ The jQuery object.
 * @param {_L16.SimpleCssParser} cssParser The SimpleCssParser object (or equivalent).
 */
(function($, cssParser) {
	window.polyCalc = new PolyCalc(['width', 'height']);
	
	/**
	 * @param {Array} propsToEvaluate Array list of names of CSS properties to check and evaluate when needed.
	 * @returns {_L11.PolyCalc}
	 */
	function PolyCalc(propsToEvaluate)
	{
		/**
		 * Is poly needed.
		 *
		 * Rough guessing based on http://caniuse.com/calc
		 *
		 * @warning Evil cheats involved ;-).
		 *
		 * @type Boolean
		 */
		this.isNeeded = true;

		// IE 10+
		// Fox 16+
		// Chrome 19+, 26+
		// Safari 6+, 6.1+
		// Opera 15+
		// iOS Safari 6+, 7+
		// Android 4.4+
		// Blackberry Browser 10.0+, -
		// Opera Mobile 16+
		// OK all versions: Chrome for Android, Firefox for Android, IE Mobile
		// Why requestAnimationFrame? because support is similar :-)
		if ('requestAnimationFrame' in window && window.requestAnimationFrame.toString().indexOf('[native code]') >= 0) {
			this.isNeeded = false;
		}

		/**
		 * Run poly.
		 *
		 * @note Must be run both when a page is ready and after it's changed.
		 */
		this.run = function() {
			if (!this.isNeeded) {
				return;
			}

			var calcFuzzyCheck = /calc\(/;	// fuzzy=liberal

			cssParser
				.init($('[data-PolyCalc=1]'))
				.traverseRules(function(selector, propertiesText) {

					// skip if not matched
					if (propertiesText.search(calcFuzzyCheck) < 0) {
						return;
					}
					var properties = cssParser.parseProperties(propertiesText, propsToEvaluate);
					if (!properties.length) {
						return;
					}
					$(selector).each(function() {
						var currentElement = $(this);
						for (var i=0; i<properties.length; i++) {
							var newValue = parseExpression(properties[i].property, properties[i].value, currentElement) + "px";
							if (properties[i].priority.length) {
								newValue += "!" + properties[i].priority;
							}
							$(this).css(properties[i].property, newValue);
						};
					});
				})
			;
		};

		var calcMatcher = /^\s*calc\((.+)\)\s*$/;

		/**
		 * Parses CSS expression (value) and runs calculations...
		 *
		 * @param {String} propertyName Name of a CSS property.
		 * @param {String} expression Value of the property.
		 * @param {jQuery} element Element for which expression must be evaluated.
		 * @returns {unresolved}
		 */
		var parseExpression = function(propertyName, expression, element) {
			var newExpression = "";
			if (expression.search(calcMatcher) < 0) {
				return;
			}
			expression = expression.match(calcMatcher)[1];

			var value = -1;
			for(var i = 0; i < expression.length; ++i) {
				var substr = expression.substring(i);

				var regex = substr.match(/^[\d.]+/);
				if(regex !== null) {
					value = parseFloat(regex[0], 10);

					i += regex[0].length - 1;

					continue;
				}

				regex = substr.match(/^([A-Za-z]+|%)/);
				if(regex !== null) {
					value = convertUnit(regex[1], "px", value, propertyName, element);
					if(value !== -1)
						newExpression += value;

					i += regex[1].length - 1;
					value = -1;

					continue;
				}

				var char = expression.charAt(i);

				if(char == '+' || char == '-' || char == '*' || char == '/' || char == '(' || char == ')') {
					newExpression += char;
					value = -1;
				}
			}

			return eval(newExpression);
		};

		/**
		 * Convert unit.
		 *
		 * @param {String} from Unit name (shortcut)
		 * @param {String} to Unit name (shortcut); only px supported
		 * @param {Number} value
		 * @param {String} propertyName Name of a CSS property.
		 * @param {jQuery} element Element for which expression must be evaluated.
		 * @returns {Number}
		 */
		var convertUnit = function(from, to, value, propertyName, element) {
			switch(to) {
				case "px": {
					switch(from) {
						case "px":
							return value;
						case "%":
							value *= 0.01;
							value *= parseInt(element.parent().css(propertyName), 10);
							return value;
						case "em":
							value *= parseInt(element.parent().css("font-size"), 10);
							return value;
						case "rem":
							value *= parseInt($("body").css("font-size"), 10);
							return value;
						case "in":
							value *= 96;
							return value;
						case "pt":
							value *= 4/3;
							return value;
						case "pc":
							value *= 16;
							return value;
						case "mm":
							value *= 9.6;
							value /= 2.54;
							return value;
						case "cm":
							value *= 96;
							value /= 2.54;
							return value;
					}

					break;
				}
			}

			return -1;
		};
	}

})(jQuery, simpleCssParser);


/**
// Testing/notes area :-)
$(function(){
	simpleCssParser
		.init($('[data-PolyCalc=1]'))
		.traverseRules(function(selector, propertiesText) {
			console.log(selector, propertiesText);
			console.log(simpleCssParser.parseProperties(propertiesText));
		})
	;
});
/**/
/*
	Some/most browsers (e.g. Opera) skips invalid properties :-/.

	.selectorText - selector only
	.style.cssText - properties
	.cssText - both
	.style.getPropertyValue('width') - value of the property

$('[data-PolyCalc=1]').each(function(){
	console.log(this);
	console.log(this.sheet);
	$.each(this.sheet.cssRules, function(index){
		console.log(index +": "+ this.cssText);
		console.log(this.style.getPropertyValue('width'));
	});
});
*/