# 回退/储藏

## 回退到指定提交，保留之前的提交

```bash
git reset --soft commitId

git push -f
```


## 回退到指定提交，不保留之前的提交

```bash
git reset --hard commitId

git push -f
```
## 储藏

```bash
git stash
```

### 可以储藏新建的文件

```bash
git stash -u
```
