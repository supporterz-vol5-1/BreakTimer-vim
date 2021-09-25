[![deno-test](https://github.com/supporterz-vol5-1/BreakTimer-vim/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/supporterz-vol5-1/BreakTimer-vim/actions/workflows/ci.yml)
<!-- # This is a Vaporware yet -->
# BreakTimer-vim

## Installation

### Dependency
- deno
- denops.vim

### Install

Use your favorite plugin manager

- dein.vim
    ```vim
    call dein#add("vim-denops/denops.vim")
    call dein#add("hackathon-vol5-1/BreakTimer-vim")
    ```

## Usage

- register user
    ```vim
    :BreakTimerFetchToken
    ```
    After run the command. show token in vim console, run `:messages`.
    The token is show only once, **Dont forget to memorize the token!**

- register start/stop writing
    By default, start/stop writing is automatically registered.
    If you want to disable automatically registering, use `g:break_timer_disable_auto_register = 1`.
    And run below commands for register manually.

    - register start writing by manual
        ```vim
        :BreakTimerStartWriting
        ```
        Need `g:break_timer_username` or `BREAK_TIMER_USERNAME` in environment variable, and `g:break_timer_token` or `BREAK_TIMER_TOKEN` in environment variable. 
        Run command then, register the start time.

    - register stop writing by manual
        ```vim
        :BreakTimerStopWriting
        ```
        Need `g:break_timer_username` or `BREAK_TIMER_USERNAME` in environment variable, and `g:break_timer_token` or `BREAK_TIMER_TOKEN` in environment variable. 
        Run command then, register the stop time.

