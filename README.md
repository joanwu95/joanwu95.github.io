# Qiong Wu Jupyter Book

这是一个使用 Jupyter Book 1.x 构建的个人研究网站。

## 发布到 GitHub Pages

仓库：https://github.com/joanwu95/joanwu95.github.io

网站：https://joanwu95.github.io/

`main` 保存源码。推送到 `main` 后，`.github/workflows/deploy.yml` 自动构建
`_build/html` 并部署到 GitHub Pages。仓库 Settings → Pages → Source 设置为
`GitHub Actions`，不需要 `gh-pages` 分支。

首次安装或更新构建依赖：`python -m pip install -r requirements.txt`。

未来的 `/hand/` 和 `/invtrail/` 网站由各自独立仓库的 Pages 部署提供。

## 构建网站

在 PowerShell 中依次运行：

```powershell
conda activate jupyterbook
Set-Location "Q:\daydream\JoanWu\quarto-template"
jupyter-book clean .
jupyter-book build .
python -m http.server 8000 --directory _build\html
```

构建结果位于 `_build\html`。

## 本地预览

构建完成后运行：

```powershell
python -m http.server 8000 --directory _build\html
```

然后在浏览器打开：

```text
http://localhost:8000
```

停止预览时，在终端按：

```text
Ctrl+C
```

## 清理并重新构建

```powershell
conda activate jupyterbook
Set-Location "Q:\daydream\JoanWu\quarto-template"
jupyter-book clean .
jupyter-book build .
```

如果使用传统 CMD 或 Anaconda Prompt，切换目录才需要：

```bat
cd /d Q:\daydream\JoanWu\quarto-template
```

## 文件用途

- `_config.yml`：网站名称、语言、主题和构建设置。
- `_toc.yml`：左侧目录结构和页面顺序。
- `index.md`：首页内容。
- `research.md`、`projects.md`、`notes.md`：研究与笔记页面。
- `blog.md`、`cv.md`、`about.md`：博客、简历和个人介绍。
- `_static/custom.css`：配色、字体、字号、间距和布局。
- `pics/author/avat.jpg`：左侧菜单顶部照片。
- `pics/author/icon.png`：浏览器标签页图标。
- `_build/html`：自动生成的网站文件，不要直接编辑。
