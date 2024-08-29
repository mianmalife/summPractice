# css3渐变

...

## 线性渐变

模拟边框`border`:

````css
.borderCls {
  width: 320px;
  height: 320px;
  background:
  linear-gradient(to top, orange, orange), 
  linear-gradient(to right, orange, orange),
  linear-gradient(to bottom, orange, orange),
  linear-gradient(to left, orange, orange);
  background-size: 100% 2px, 2px 100%;
  background-position: top left, top right, bottom right, bottom left;
  background-repeat: no-repeat;
}
````

```html
<div class="borderCls"></div>
```

模拟虚线`border-style: dashed`

```css
.dashed {
  width: 320px;
  height: 2px;
  background: linear-gradient(to right, orange 5px, transparent 2.5px, transparent);
  background-size: 7.5px 100%;
}
```

```html
<div class="dashed"></div>
```

## 其他

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
