export default function (src) {
  const obj = {}

  /* convert Buffers before splitting into lines and processing */
  src.toString().split('\n').forEach((line) => {
    /* matching "KEY' and 'VAL' in 'KEY=VAL' */
    const arr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    if (!arr) return

    /* default undefined or missing values to empty string */
    let value = arr[2] ? arr[2] : ''

    /* expand newlines in quoted values */
    const len = value ? value.length : 0

    if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
      value = value.replace(/\\n/gm, '\n')
    }

    /* remove any surrounding quotes and extra spaces */
    value = value.replace(/(^['"]|['"]$)/g, '').trim()

    obj[arr[1]] = value
  })

  return obj
}
