import css from './style.css'
import Chart from 'chart.js'

const block = function (el, config) {
  const child = document.createElement('div')
  child.classList.add(css.chartjs)

  child.innerHTML = `<canvas class="${css.cnv}"></canvas>`

  let def = config.config
  let instancedChart = null

  const createChart = () => {
    if (!def.options) def.options = {}
    def.options.responsive = true
    def.options.maintainAspectRatio = false
    instancedChart = new Chart(canvas, def)
  }
  const canvas = child.querySelector('canvas')

  if (def) {
    createChart()
  } else {
    if (config._cache) {
      def = JSON.parse(config._cache)
      createChart()
    } else {
      // fallback to direct loading
      fetch(config.url)
        .then(resp => resp.text())
        .then(data => {
          config._cache = data
          def = JSON.parse(config._cache)
          createChart()
        })
    }
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
  if (Presenta.io.addCache) Presenta.io.addCache({ type: 'chartjs', field: 'url' })
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
