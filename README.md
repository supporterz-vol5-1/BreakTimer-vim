# This is a Vaporware yet


## Installation

### Dependency
- deno
- denops.vim

### Install by plugin manager

use your favorite plugin manager

- dein.vim
 ```vim
 call dein#add("vim-denops/denops.vim")
 call dein#add("hackathon-vol5-1/breakTimer-vim")
 ```

## Usage

- register user
    ```vim
    :BreakTimerFetchToken
    ```
    after run the command. show token in vim console, run `:messages`.
    the token is show only once, **Dont forget memorize the token!**

- register start writing by manual
    ```vim
    :BreakTimerStartWriting
    ```
    need `g:break_timer_username` or `break_timer_username` in environ variable, and `g:break_timer_token` or `break_timer_username` in environ variable. 
    run command then, register the start time.

- register stop writing by manual
    ```vim
    :BreakTimerStopWriting
    ```
    need `g:break_timer_username` or `break_timer_username` in environ variable, and `g:break_timer_token` or `break_timer_username` in environ variable. 
    run command then, register the stop time.

