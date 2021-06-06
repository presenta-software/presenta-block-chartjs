import css from './style.css'
import Chart from 'chart.js/auto'

const props = ['padding']

const block = function (el, config) {
  const child = document.createElement('div')
  child.classList.add(css.chartjs)

  child.innerHTML = `<canvas class="${css.cnv}"></canvas>`

  const upper = (s) => s.charAt(0).toUpperCase() + s.slice(1)

  let blockProps = ''
  for (var k in config) {
    if (props.indexOf(k) >= 0) {
      blockProps += '--chartjs' + upper(k) + ':' + config[k] + ';'
    }
  }
  child.style = blockProps

  el.appendChild(child)

  let def = config.config
  let instancedChart = null

  const createChart = () => {
    if (!def.options) def.options = {}
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

  this.destroy = () => {
    if (instancedChart) instancedChart.destroy()
  }
}

export default block

block.install = Presenta => {
  Presenta.addBlock('chartjs', block)
  if (Presenta.io.addCache) Presenta.io.addCache({ type: 'chartjs', field: 'url' })
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
