# Sticky Sentinel Element

Custom element implementation of the technique described in this
Google Developers article:
https://developers.google.com/web/updates/2017/09/sticky-headers

Documentation is still a work in progress.

## Usage

There's a no-config option for simple use cases:

```html
<sticky-sentinel></sticky-sentinel>
<div class="sticky-element"></div>
```

Style the sticky element based on the `stuck` state of the sentinel:

```css
sticky-sentinel[stuck] ~ .sticky-element {
  /* Add your stuck styles here. */
}
```

You can also reference the target element explicitly and set a class on it
directly when it becomes stuck:

```html
<sticky-sentinel target="sticky_element" stuck-class="stuck"></sticky-sentinel>
<div id="sticky_element"></div>
```

```css
.sticky-element.stuck {
  /* Add your stuck styles here. */
}
```

**Important:** The sentinel must be placed such that its top edge lines up with
the top edge of the sticky element. The easiest way to do this is to place the
sticky element directly after the sentinel as a sibling.
