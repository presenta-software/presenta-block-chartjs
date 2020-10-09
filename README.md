# PRESENTA Chart.js Block

This block displays a [Chart.js](https://www.chartjs.org/) component within a [PRESENTA Lib](https://github.com/presenta-software/presenta-lib) document.

## Installation


Please read the installation istructions for official plugins [here](https://lib.presenta.cc/extend/#install-an-official-plugin) using this unique identifier: `block-chartjs`

To configure this block use this setting:

```js
{
    type: 'chartjs',
    chart: {...}
}
```

| Prop name | Description                                                  | Default value | Possible values |
| --------- | ------------------------------------------------------------ | ------------- | --------------- |
| type      | Define this block type **(required)**                        |               | chartjs         |
| chart     | A valid Chart.js [configuration object](https://www.chartjs.org/docs/latest/) **(required)** |               | JS object       |
|           |                                                              |               |                 |

