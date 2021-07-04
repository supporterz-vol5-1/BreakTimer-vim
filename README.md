# This is a Vaporware yet


## Installation

### Dependency
- deno

### Install by plugin manager

use your favorite plugin manager

- dein.vim
 ```vim
 call dein#add("vim-denops/denops.vim")
 call dein#add("hackathon-vol5-1/Hackathon-vol5-1-vim")
 ```

## Usage

- register user
    ```vim
    :HackathonFiveFetchToken
    ```
    after run the command. show token in vim console, run `:messages`.
    the token is show only once, **Dont forget memorize the token!**

- register start writing by manual
    ```vim
    :HackathonFiveStartWriting
    ```
    need `g:hackathon5_1_username` or `hachathon5_1_username` in environ variable, and `g:hackathon5_1_token` or `hackathon5_1_username` in environ variable. 
    run command then, register the start time.

- register stop writing by manual
    ```vim
    :HackathonFiveStopWriting
    ```
    need `g:hackathon5_1_username` or `hachathon5_1_username` in environ variable, and `g:hackathon5_1_token` or `hackathon5_1_username` in environ variable. 
    run command then, register the stop time.

