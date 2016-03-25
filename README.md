foundation-select
=================

jQuery plugin for custom `<select>` inputs in Zurb [Foundation](http://foundation.zurb.com/) 5 using Foundation [Dropdowns plugin](http://foundation.zurb.com/docs/components/dropdown.html) for compatibility.

View examples [here](http://roymckenzie.github.io/foundation-select/).

## How to

* Include `foundation-select.js` in your footer
* Include `foundation-select.css` in your `<head>`
* Call `$('select').foundationSelect()` before `$(document).foundation()`

Make sure you have a unique ID on your `<select>`s.

## Features

* Set `data-prompt="Your custom prompt..."` on your `<select>` for a custom prompt. Default is "Choose...". Can also be empty, which will not create a diabled option.
* Set `data-selected-text="{selected} / {total}"` on your `<select>` for a custom selection text when more than 2 elements are selected.
Default is "{selected} of {total} selected"
* Support for multiple option `<select>`s. Just add `multiple` parameter to your `<select>`

## Help

Fork it and make it better :)