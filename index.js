var os = require('os'),
    bytes = require('bytes'),
    spark = require('textspark'),
    chalk = require('chalk');


function bar(opts) {
  var ratio = opts.current / opts.total,
      width = opts.width || 10,
      complete = Array(Math.round(width * ratio)).join('='),
      incomplete = Array(width - complete.length).join(' '),
      result = opts.format;

  result = result.replace(':bar', complete + incomplete);

  Object.keys(opts).sort(function(a, b) {
      // sort so that we match the longest strings first
      return b.length - a.length;
    }).forEach(function(key) {
      if (key != 'bar' && key != 'format') {
        result = result.replace(':' + key, opts[key]);
      }
    });
  return result;
}

module.exports = function(fmt, width) {
  if (!fmt) {
    fmt = ':currentBytes / :totalBytes [:spark] :percent';
  }

  var free = os.freemem(),
      total = os.totalmem(),
      used = total - free,
      percent = (used / total) * 100,
      color,
      colors = [ 'red', 'yellow', 'green' ];

  [ 75, 50, 25 ].some(function(threshold, i) {
    color = colors[i];
    return percent > threshold;
  })

  console.log(
      bar({
      format: fmt,
      current: used,
      currentBytes: bytes(used),
      total: total,
      totalBytes: bytes(total),
      spark: chalk[color]( spark([0, percent, 100])[1]),
      percent: percent.toFixed(0) + '%',
      width: width || 10
    }));

};
