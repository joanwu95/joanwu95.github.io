# 机器人柔性机械手接触力感知与Sim-to-Real迁移方法研究
<div class="page-tags">
  <span class="page-tag">柔性机械手</span>
  <span class="page-tag">机器学习</span>
  <span class="page-tag">非接触式力感知</span>
  <span class="page-tag">逆问题求解</span>
  <span class="page-tag">机器学习与深度学习</span>
  <span class="page-tag">Sim-to-real gap</span>
  <span class="page-tag">AI for science</span>
  <span class="page-tag">运动学与静力学建模</span>
</div>

:::{admonition} 核心问题
:class: note
- 柔性机械手传感器布置困难
- 采集数据成本高
- 仿真模型与真实实验之间存在Sim-to-Real gap
- 逆问题求解存在容易奇异的问题
:::

## 基于模型的力感知方法
<div class="page-tags">
  <span class="page-tag">局部标架共旋模型</span>
  <span class="page-tag">有限元</span>
  <span class="page-tag">MLP</span>
  <span class="page-tag">最小二乘法</span>
  <span class="page-tag">贪心算法</span>
</div>

![实验结果](../_static/images/10.png)


但是由于材料的非线性，随着受力增大，变形增大，材料非线性行为越发明显，仿真模型与真实实验之间的偏差增大。

## 多保真度变形域对齐的力感知方法

考虑利用少量真实数据校正仿真中的偏差，生成伪高保真数据，训练模型，进行力感知。

<div class="page-tags">
  <span class="page-tag">有限元</span>
  <span class="page-tag">MLP</span>
  <span class="page-tag">GNN</span>
  <span class="page-tag">Sim-to-Real gap</span>
  <span class="page-tag">域对齐</span>
</div>

![实验结果](../_static/images/11.png)


## 部分观测失效下的力感知及其不确定性量化
<div class="page-tags">
  <span class="page-tag">GAT</span>
  <span class="page-tag">卡尔曼</span>
</div>

![实验结果](../_static/images/c5-fig1.png)

[返回上一级](../projects.md)