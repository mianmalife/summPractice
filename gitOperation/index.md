# 远程仓库地址设置与推送


## 设置远程仓库URL

```bash
git remote set-url origin git@github.com:xxx/yyy.git
```

## 查看远程仓库URL

```bash
git remote -v
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
````


## 存在一个远程仓库


```bash
git remote add origin git@github.com:xxx/yyy.git
git branch -M main
git push -u origin main
```

