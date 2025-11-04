# 远程仓库地址设置与推送


## 设置远程仓库URL

```bash
git remote set-url origin git@github.com:xxx/yyy.git
```

## 查看远程仓库URL

```bash
git remote -v
```

## 删除远程仓库URL

```bash
git remote rm xxx
```

## 存在一个文件夹

```bash
cd 文件夹
git init
git add .
git commit -m 'xxx'
git branch -M main
git remote add origin git@github.com:xxx/yyy.git
git push -u origin main
```


## 存在一个远程仓库


```bash

// 连提交记录一起推送到另一个项目
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.winnerdt.com:yyy.git
git push -u origin --all
git push -u origin --tags

git remote add origin git@github.com:xxx/yyy.git
git branch -M main
git push -u origin main
```

## 合并远程分支到本地分支


```bash
git pull 远程分支地址 分支名

git push origin xxx
```

## 修改提交信息

```bash
git commit --amend
git push --force

git commit --amend --author="新用户名<新邮箱>" --no-edit
git push --force
```

