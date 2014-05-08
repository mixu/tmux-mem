# tmux-mem

Display memory usage in your tmux status bar or in the terminal.

## Installation

Install Node, then use npm:

    sudo npm install -g tmux-mem

## Usage

    Usage: tmux-mem

    Options:

      --ascii         Display ASCII percentage bar ([======   ] instead of [▆])
      --width <int>   The width of the ASCII bar, default: 10.
      --format <str>  Use a custom formatting string.
      --help          Show help.
      --version       Show version.

    Custom formatting:

      The default formatting string is ':currentBytes / :totalBytes [:spark] :percent'.

      You can use these tokens in the custom formatting string:

      - `:bar`: the ASCII progress bar
      - `:spark`: the utf-8 spark line graphic
      - `:current`: the number of bytes (raw)
      - `:currentBytes`: the number of bytes (with b/kb/mb/gb/tb postfix)
      - `:total`: the number of bytes (raw)
      - `:totalBytes`: the number of bytes (with b/kb/mb/gb/tb postfix)
      - `:percent`: the percentage of memory used

## Integrating with tmux

Make sure you have enabled utf-8 in the status line, either via `set -g status-utf8 on` in `~/.tmux.conf` or by running tmux with the `-u` flag: `tmux -u`.

Add the following line to your ~/.tmux.conf file:

    set -g status-right "#(/usr/local/bin/tmux-mem)"

reload the tmux config by running tmux source-file ~/.tmux.conf.

