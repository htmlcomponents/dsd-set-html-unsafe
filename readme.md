# Declarative Shadow DOM with setHTMLUnsafe()

This repo shows an example of how FOUC (Flash of Unstyled Content) can be repeatedly caused in a declarative shadow DOM that loads its CSS with a link rel element.

![Demo Image](./images/add-icon-button.gif)

## How this works

When clicked, a simple Custom Element `<add-icon-button>` adds `icon-button` elements to its container element, using `this.container.setHTMLUnsafe(iconButtonsHTML)`. 

```html
<add-icon-button>
    <template shadowrootmode="open">
    <style>
        :host {
        display: block;
        }
    </style>
    <button>Add <code>&lt;icon-button&gt;</code> element</button>
    <div id="container"></div>
    </template>
</add-icon-button>
```

Each `icon-button` has a declarative shadow DOM with a link element to a CSS stylesheet and a `<use>` element that loads an SVG symbol of a star.

```html
<icon-button>
    <template shadowrootmode="open">
        <link rel="stylesheet" href="./icon-button.css">
        <button>
            <svg>
                <use href="./icons.svg#star"></use>
            </svg>
        </button>
    </template>
</icon-button>
```

The SVG element does not have width and height attributes set on it, so when displayed without the style sheet, it will show by browser default at a size of 300px x 150px.

But in the DSD-linked icon-buttion.css stylesheet, the SVG's width and height is set to 24px x 24px:

```css
svg {
    fill: orange;
    width: 24px;
    height: 24px;
}
```

## So why is there repeated FOUC?

In theory, once the icon-button.css stylesheet is loaded it should be cached, and the SVG should be styled with a 24px x 24px size rather than the default 300px by 150px. 

But in practice, the SVG flashes briefly at 300px x 150px for a split second before the stylesheet is reloaded (this is hard to capture each time in a gif, but watch it to the end.)

Perhaps this is a bug in how the Chrome brower reloads the stylesheet instead of caching it, as shown in Network tab in the demo above, particularly in the case of using `setHTMLUnsafe()`.

Whatever the reason, this is not how I want DSD to work.