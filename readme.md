# tmux-mem

Display memory usage in your tmux status bar or in the terminal.

## Installation

Install Node, then use npm:

    sudo npm install -g tmux-mem

## Example

Here's how my tmux status bar looks like. This uses both [`tmux-cpu`](https://github.com/mixu/tmux-cpu) and [`tmux-mem`](https://github.com/mixu/tmux-mem)`: 

![Example](https://raw.githubusercontent.com/mixu/tmux-cpu/master/tmux.png)

And here is the line in `~/.tmux.conf` that invokes both commands and displays the result:

```
set-option -g status-right '#(/usr/local/bin/tmux-mem --format ":currentBytes [#[fg=:color]:spark#[default]] #[fg=:color]:percent#[default]") #(/usr/local/bin/tmux-cpu --format ":load [#[fg=:color]:spark#[default]] #[fg=:color]:percent#[default]") %H:%M %d-%b-%y'
```

You'll need to install both `tmux-cpu` and `tmux-mem` with `npm install -g` for this to work.

## Usage

Usage: `tmux-mem`

## Options:

    --ascii         Display ASCII percentage bar ([======   ] instead of [▆])
    --width <int>   The width of the ASCII bar, default: 10.
    --format <str>  Use a custom formatting string.
    --no-color      Disable colors.
    --no-tty        Show the raw tmux string.
    --help          Show help.
    --version       Show version.

## Custom formatting:

The default formatting string is
`:currentBytes / :totalBytes [#[fg=:color]:spark#[fg=default]] :percent`.

You can use these tokens in the custom formatting string:

- `:bar`: the ASCII progress bar
- `:spark`: the utf-8 spark line graphic
- `:current`: the number of bytes (raw)
- `:currentBytes`: the number of bytes (with b/kb/mb/gb/tb postfix)
- `:total`: the number of bytes (raw)
- `:totalBytes`: the number of bytes (with b/kb/mb/gb/tb postfix)
- `:percent`: the percentage of memory used
- `:color`: the current bar color (adaptive, based on the percentage)

## Colors in the format string:

tmux uses a custom format for specifying colors, which is different from the set of codes used in the terminal. For compatibility, tmux-mem also uses the same format: #[attributes]

where attributes are a comma-separated list of 'fg=color' and 'bg=color', for example:

    #[fg=yellow,bold]Yellow bold#[default] Gray

Attributes may a comma-delimited list of one or more of: bright (or bold), dim, underscore, blink, reverse, hidden, or italics.

Color may be one of: black, red, green, yellow, blue, magenta,
cyan, white, default, colour0 to colour255. Newer tmux versions also support RGB strings such as #ffffff. See `man tmux` for more info.

tmux-mem also converts these strings to the appropriate TTY color codes for the terminal.

## Integrating with tmux

Make sure you have enabled utf-8 in the status line, either via `set -g status-utf8 on` in `~/.tmux.conf` or by running tmux with the `-u` flag: `tmux -u`.

Add the following line to your ~/.tmux.conf file:

    set -g status-right "#(/usr/local/bin/tmux-mem) %H:%M %d-%b-%y"

reload the tmux config by running tmux source-file ~/.tmux.conf.

