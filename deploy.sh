# 自动部署脚本  

# 构建
npm run build
# 导航到构建输出目录
cd public

git init
git add -A
git commit -m 'deploy'

#链接仓库
git remote add origin https://github.com/SXZXD/zhangxudong.github.io.git
# 推到你仓库的 master 分支
git push -f origin master