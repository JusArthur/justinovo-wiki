<h1 id="intro">量化金融初探</h1>
<p>在 WorldQuant BRAIN 平台上，Alpha 指的是能够产生预测信号的数学表达式。开发一个有效的 Alpha 需要对金融数据的直觉和严谨的测试。</p>

<h2 id="operators">常用算子解析</h2>
<p>在编写表达式时，<code>ts_rank</code> 和 <code>ts_delta</code> 是最常用的时间序列算子。理解这些算子如何处理截面数据（Cross-sectional）是成功的关键。</p>

<div class="code-block-wrapper bg-[#fafafa] dark:bg-black/30 p-4 font-mono text-sm">
  <span class="text-brand"># 一个简单的均值回归 Alpha 示例</span><br/>
  -ts_rank(ts_delta(close, 5), 200)
</div>

<h1 id="optimization">回测优化策略</h1>
<p>高周转率（Turnover）往往会侵蚀收益。通过引入低通滤波器或拉长时间窗口，可以显著改善 Alpha 的夏普比率（Sharpe Ratio）。</p>