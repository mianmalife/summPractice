# border

...

## 实现三角形，梯形

border可以模拟实现三角形，梯形

**三角形**

```css
/* 下三角 等边三角形 通过改变border-color不同方向的透明度即可 */
.triangle-t {
  width: 0px;
  height: 0px;
  border-width: 20px;
  border-style: solid;
  border-color: orange transparent transparent transparent;
}

/* 等腰三角形 */
.triangle-dy {
  width: 0px;
  height: 0px;
  border-width: 30px 10px;
  border-style: solid;
  border-color: orange transparent transparent;
}
```

**梯形**

```css
.triangle-tx {
  margin: 50px;
  width: 15px;
  height: 15px;
  border-width: 20px;
  border-style: solid;
  border-color: orange transparent transparent;
}
```

## Custom Containers

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
