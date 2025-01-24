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

## css sprite animations

[点赞动画](http://www.baidu.com)


