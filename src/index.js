import css from './style.css'
import Chart from 'chart.js/auto'
import props from './props'
import Papa from 'papaparse'

const block = function (el, config) {
  const previewMode = config._mode === 'preview'

  const child = document.createElement('div')
  child.classList.add(css.chartjs)

  child.innerHTML = `<canvas class="${css.cnv}"></canvas>`

  const colorBack = getComputedStyle(el).getPropertyValue('--colorBack')
  const fontText = getComputedStyle(el).getPropertyValue('--fontText')

  Chart.defaults.backgroundColor = colorBack
  Chart.defaults.borderColor = colorBack
  Chart.defaults.font.family = fontText

  props(child, config)

  el.appendChild(child)

  var def = config.config
  let instancedChart = null
  const csv = config.csv

  const createChart = () => {
    if (!def.options) def.options = {}
    const opt = def.options
    opt.maintainAspectRatio = false
    if (previewMode) opt.animation = false
    instancedChart = new Chart(canvas, def)
  }
  const canvas = child.querySelector('canvas')

  // I can set the whole chart.js config object
  if (def) createChart()

  // or providing only the data as csv
  if (csv) {
    const data = Papa.parse(csv, { header: true, dynamicTyping: true })
    const firstKey = data.meta.fields[0]
    const labels = data.meta.fields.filter(d => d !== firstKey)
    // const colors = ['red', 'blue', 'orange']

    const arr = data.data.map((d, i) => {
      const dt = Object.entries(d).map(c => (c[1]))
      return {
        label: d[firstKey],
        // backgroundColor: colors[i],
        // borderColor: colors[i],
        data: dt
      }
    })

    def = {
      type: 'bar',
      data: {
        labels,
        datasets: arr
      }
    }
    createChart()
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
