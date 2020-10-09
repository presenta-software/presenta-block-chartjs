import css from './style.css'
import Chart from 'chart.js'

const block = function (el, config, rootElement, projectConfig) {
  const child = document.createElement('div')
  child.classList.add(css.chartjs)

  child.innerHTML = `<canvas class="${css.cnv}"></canvas>`

  const canvas = child.querySelector('canvas')

  const cchart = config.chart
  let instancedChart = null
  if (cchart) {
    if (!cchart.options) cchart.options = {}
    cchart.options.responsive = true
    cchart.options.maintainAspectRatio = false
    instancedChart = new Chart(canvas, cchart)
  }

  this.beforeDestroy = () => {
  }

  this.stepForward = (step) => {
  }

  this.destroy = () => {
    if (instancedChart) instancedChart.destroy()
  }

  el.appendChild(child)
}

export default block

block.install = Presenta => {
  Presenta.addBlock('chartjs', block)
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
