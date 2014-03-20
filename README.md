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
.inline-controls div {
	float: left;
	box-sizing: border-box;
}
.inline-controls .text {
	width: calc(100% - 9em);
	width: -webkit-calc(100% - 9em);
}
.inline-controls .short-btn {
	width:3em;
}
.inline-controls .long-btn
{
	width:6em;
}
```

Example HTML:
```
<link rel="stylesheet" data-PolyCalc="1" href="example.css">

<!-- 
	...
-->

<div class="inline-controls">
	<div class="text>
		<input type="text" value="this will vary">
	</div>
	<div class="short-btn">
		<input type="button" value="OK">
	</div>
	<div class="long-btn">
		<input type="button" value="Cancel">
	</div>
</div>
```

Note that by default PolyCalc searches only for `width` and `height` properties. See PolyCalc source on information how to add other props to the list.
