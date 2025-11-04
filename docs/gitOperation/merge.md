# 不同的项目合并代码

```bash
git remote add xxx git@gitlab.ggg.com:aaa/xxx.git
git fetch xxx
git merge xxx/master --allow-unrelated-histories
```
## 中止当前合并

```bash
git merge --abort
```