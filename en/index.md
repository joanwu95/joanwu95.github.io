# Qiong Wu

<div class="page-tags">
  <span class="page-tag">Soft Robotics</span>
  <span class="page-tag">Force Sensing</span>
  <span class="page-tag">Machine Learning</span>
  <span class="page-tag">Research Website</span>
</div>

**Soft robotic hands · Grasp force sensing · Robotics algorithms · Data-driven modeling · Visual communication**

This is my long-term personal research website for organizing research topics, algorithm notes, project demos, experiment videos, images, code, and mathematical derivations.

<span class="tag">Soft Gripper</span>
<span class="tag">Force Sensing</span>
<span class="tag">Inverse Problems</span>
<span class="tag">Machine Learning</span>
<span class="tag">Graph Neural Networks</span>
<span class="tag">Jupyter Book</span>

## Website Structure

:::{note}
This website is more than a résumé. It is an evolving space for research and creative work, including my PhD topic, experimental platforms, algorithm notes, code examples, video demos, and project summaries.
:::

::::{grid} 1 2 2 2
:gutter: 2

:::{grid-item-card} Research
:link: research
:link-type: doc

My PhD research directions, force-sensing problems for soft robotic hands, modeling methods, experimental platforms, and publications.

<span class="content-tag">Research</span>
:::

:::{grid-item-card} Projects
:link: projects
:link-type: doc

Project demos, experiment videos, algorithm animations, result images, code snippets, and reproducibility notes.

<span class="content-tag">Demo</span>
:::

:::{grid-item-card} Notes
:link: notes
:link-type: doc

Notes on inverse problems, optimization, machine learning, deep learning, GNNs, and Kalman filtering.

<span class="content-tag">Notes</span>
:::

:::{grid-item-card} About
:link: about
:link-type: doc

Profile, research interests, technical skills, and contact information.

<span class="content-tag">Profile</span>
:::

::::

## Equations, Code, and Video

### Equation

A simplified mechanical relationship for an elastic structure is:

$$
F = kx
$$

### Code

```python
import numpy as np

x = np.linspace(0, 1, 5)
print(x)
```

### Video

After placing a video in `_static/videos/`, embed it with:

```html
<video src="../_static/videos/demo.mp4" controls></video>
```
