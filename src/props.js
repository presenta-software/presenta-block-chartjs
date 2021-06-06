const props = ['padding']

const upper = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const doProps = (child, config) => {
  let blockProps = ''
  for (var k in config) {
    if (props.indexOf(k) >= 0) {
      blockProps += '--chartjs' + upper(k) + ':' + config[k] + ';'
    }
  }
  child.style = blockProps
}

export default doProps
