# 学习笔记

[算法学习查找表](../quarto-template/notes/suanfaindex.md)
<!--
<div class="page-tags">
  <span class="page-tag">逆问题</span>
  <span class="page-tag">机器学习</span>
  <span class="page-tag">数学</span>
  <span class="page-tag">工具链</span>
</div>

这里用于整理算法、机器学习、机器人、数学方法和工具链相关笔记。

::::{grid} 1 2 3 3
:gutter: 2

:::{grid-item-card} 逆问题

力反演、参数识别、正则化、病态问题和可观测性分析。


:::

:::{grid-item-card} 机器学习

监督学习、神经网络、GNN、模型泛化、数据集划分和评估指标。

## 笔记列表

- [笔记 1：逆问题](notes/note-1.md)
- [笔记 2：GNN](notes/gnn.md)


:::

:::{grid-item-card} 工具链

Jupyter Book、Git、VS Code、Python、MATLAB、Manim 和 Obsidian。


:::

::::

## 代码笔记示例

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
eigvals = np.linalg.eigvals(A)
print(eigvals)
```

## 公式笔记示例

均方误差：

$$
\mathrm{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

## 后续结构

笔记增多后，可以在 `notes/` 下建立独立页面，并把它们加入 `_toc.yml`：

```text
notes/
├── inverse-problem.md
├── gnn.md
├── kalman-filter.md
├── pca.md
└── jupyter-book-workflow.md
```
-->