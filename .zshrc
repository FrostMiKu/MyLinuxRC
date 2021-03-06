export DEFAULT_USER="frostmiku"
export TERM="xterm-256color"
export ZSH=/home/frostmiku/.oh-my-zsh

ZSH_THEME="powerlevel9k/powerlevel9k"
POWERLEVEL9K_MODE="awesome-fontconfig"


POWERLEVEL9K_FOLDER_ICON=""
POWERLEVEL9K_HOME_SUB_ICON=" "
POWERLEVEL9K_DIR_PATH_SEPARATOR="  "

POWERLEVEL9K_COMMAND_EXECUTION_TIME_THRESHOLD=0

POWERLEVEL9K_DIR_OMIT_FIRST_CHARACTER=true

POWERLEVEL9K_BACKGROUND_JOBS_FOREGROUND='black'
POWERLEVEL9K_BACKGROUND_JOBS_BACKGROUND='178'
POWERLEVEL9K_NVM_BACKGROUND="238"
POWERLEVEL9K_NVM_FOREGROUND="green"
POWERLEVEL9K_CONTEXT_DEFAULT_FOREGROUND="blue"
POWERLEVEL9K_DIR_WRITABLE_FORBIDDEN_FOREGROUND="015"

POWERLEVEL9K_TIME_BACKGROUND='255'
#POWERLEVEL9K_COMMAND_TIME_FOREGROUND='gray'
POWERLEVEL9K_COMMAND_EXECUTION_TIME_BACKGROUND='245'
POWERLEVEL9K_COMMAND_EXECUTION_TIME_FOREGROUND='black'

POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true

POWERLEVEL9K_TIME_FORMAT="%D{%H:%M}"
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir newline host dir_writable vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status background_jobs command_execution_time time)
POWERLEVEL9K_SHOW_CHANGESET=true

HYPHEN_INSENSITIVE="true"
COMPLETION_WAITING_DOTS="false"
# /!\ do not use with zsh-autosuggestions

plugins=(tig gitfast colorize command-not-found cp dirhistory autojump sudo zsh-syntax-highlighting zsh-autosuggestions)
# /!\ zsh-syntax-highlighting and then zsh-autosuggestions must be at the end

#source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source $ZSH/oh-my-zsh.sh

ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets pattern cursor)
ZSH_HIGHLIGHT_STYLES[cursor]='bold'

ZSH_HIGHLIGHT_STYLES[alias]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[suffix-alias]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[builtin]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[function]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[command]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[precommand]='fg=green,bold'
ZSH_HIGHLIGHT_STYLES[hashed-command]='fg=green,bold'


rule () {
	print -Pn '%F{blue}'
	local columns=$(tput cols)
	for ((i=1; i<=columns; i++)); do
	   printf "\u2588"
	done
	print -P '%f'
}

# Ctrl-l clear
function _my_clear() {
	echo
	rule
	zle clear-screen
}
zle -N _my_clear
bindkey '^l' _my_clear


# Ctrl-O opens zsh at the current location, and on exit, cd into ranger's last location.
ranger-cd() {
	tempfile=$(mktemp)
	ranger --choosedir="$tempfile" "${@:-$(pwd)}" < $TTY
	test -f "$tempfile" &&
	if [ "$(cat -- "$tempfile")" != "$(echo -n `pwd`)" ]; then
	cd -- "$(cat "$tempfile")"
	fi
	rm -f -- "$tempfile"
	# hacky way of transferring over previous command and updating the screen
	VISUAL=true zle edit-command-line
}
zle -N ranger-cd
bindkey '^o' ranger-cd

alias fq="proxychains4"
alias zhuangb="screenfetch|lolcat"
alias py="python"

QMCU="$HOME/Projects/quickmcu"
alias qmcuenv='export PATH="$QMCU/toolchain/esp32-toolchain/xtensa-esp32-elf/bin:$PATH";export IDF_PATH="$QMCU/toolchain/esp-idf/esp-idf-v3.2.2"'
alias qmcuc='cd $QMCU/platform/esp32;make -j6 app-flash;cd $OLDPWD;notify-send 编译完成'
