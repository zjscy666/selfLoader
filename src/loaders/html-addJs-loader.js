const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    js: {
      type: 'string',
    },
  },
  required: [ 'js' ],
};


module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  validateOptions(schema, options, 'Loader options');

  let { js } = options;
  // console.log('js=>' + js)
  
  js = loaderUtils.stringifyRequest(this, js);
  // js = fs.readFileSync(js)

  const jsStr = `<script src=${js}></script>`;

  const _source = source.replace('{{__scirpt__}}', jsStr)
  return _source;
}