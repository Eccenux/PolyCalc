PolyCalc
========

A Javascript-based CSS3 calc() polyfill.

Originally developed by [Chris Kay](https://github.com/CJKay/PolyCalc).
Reworked to use simple (and lite) CSS parser. So currently only jQuery is required.

Usage
-----

In JavaScript run (after page is ready or changed):
```js
polyCalc.run();
```

Example CSS:
```css
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
```html
<link rel="stylesheet" data-PolyCalc="1" href="example.css">

<!-- 
	...
-->

<div class="inline-controls">
	<div class="text">
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

License
-------

Whole code can be used under the terms of [BSD 2-clause](http://opensource.org/licenses/BSD-2-Clause) license. SimpleCssParser can also be used under the terms of [MIT](http://opensource.org/licenses/MIT) (which is similar).

### BSD ###

Copyright (c) 2013-2014 Chris Kay; Maciej "Nux" Jaros.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### MIT (SimpleCssParser) ###

The MIT License (MIT)

Copyright (c) 2014 Maciej "Nux" Jaros.

Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
