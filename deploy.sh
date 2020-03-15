#!/usr/bin/env bash
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m $1

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>

 git push -f git@github.com:s2265681/s2265681.github.io.git master
#  git remote add origin git@github.com:s2265681/s2265681.github.io.git
#  git push -u origin master

cd -