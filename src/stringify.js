/**
 * Stringifies an object into a variable string block.
 * Takes into account deep objects and arrays.
 * e.g. { hi: 'hey' } ==> hi=hey
 * @param {object} obj - The object to convert to string
 * @return {string} The stringified object
 */
export default function (obj = {}) {
  let stringified = ''

  const recurse = (o, p = '') => {
    Object.keys(o).forEach((key) => {
      if (typeof o[key] === 'object') {
        p += `${key}.`
        return recurse(o[key], p)
      }

      stringified += `${p}${key}=${o[key]}\n`
    })
  }

  recurse(obj)
  return stringified.trim()
}
