# Technical Notes

<div class="page-tags">
  <span class="page-tag">Inverse Problems</span>
  <span class="page-tag">Machine Learning</span>
  <span class="page-tag">Mathematics</span>
  <span class="page-tag">Toolchain</span>
</div>

Notes on algorithms, machine learning, robotics, mathematical methods, and research tools.

::::{grid} 1 2 3 3
:gutter: 2

:::{grid-item-card} Inverse Problems

Force inference, parameter identification, regularization, ill-posed problems, and observability analysis.

<span class="content-tag">Inverse Problems</span>
:::

:::{grid-item-card} Machine Learning

Supervised learning, neural networks, GNNs, generalization, dataset splitting, and evaluation metrics.

<span class="content-tag">Machine Learning</span>
:::

:::{grid-item-card} Toolchain

Jupyter Book, Git, VS Code, Python, MATLAB, Manim, and Obsidian.

<span class="content-tag">Workflow</span>
:::

::::

## Code Note Example

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
eigvals = np.linalg.eigvals(A)
print(eigvals)
```

## Equation Example

Mean squared error:

$$
\mathrm{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

## Future Structure

As the collection grows, individual pages can be placed under `notes/` and added to `_toc.yml`.

