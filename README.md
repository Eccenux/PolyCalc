PolyCalc
========

A Javascript-based CSS3 calc() polyfill.

Originally developed by [Chris Kay](https://github.com/CJKay/PolyCalc).
Reworked to use simple (and lite) CSS parser. So currently only jQuery is required.

Usage
-----

In JavaScript run (after page is ready or changed):
```
polyCalc.run();
```

Example CSS:
```
.inline-controles {
	float: left;
	box-sizing: border-box;
}
.inline-controles.text {
	width: calc(100% - 9em);
	width: -webkit-calc(100% - 9em);
}
.inline-controles.short-button {
	width:3em !important;
}
.inline-controles.long-btn
{
	width:6em;
}
```

Note that by default PolyCalc searches only for `width` and `height` properties. See PolyCalc source on information how to add other props to the list.

