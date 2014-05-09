var os = require('os'),
    bytes = require('bytes'),
    spark = require('textspark'),
    colors = require('tmux-colors');

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

module.exports = function(fmt, width, tty, enableColor) {
  var free = os.freemem(),
      total = os.totalmem(),
      used = total - free,
      percent = (used / total) * 100,
      color,
      colorsList = [ 'red', 'yellow', 'green' ];

  [ 75, 50, 25 ].some(function(threshold, i) {
    color = colorsList[i];
    return percent > threshold;
  });

  console.log(
    colors(bar({
      format: fmt,
      current: used,
      currentBytes: bytes(used),
      total: total,
      totalBytes: bytes(total),
      spark: spark([0, percent, 100])[1],
      color: color,
      percent: percent.toFixed(0) + '%',
      width: width || 10
    }), { tty: tty || process.stdout.isTTY,
          color: enableColor })
  );

};
