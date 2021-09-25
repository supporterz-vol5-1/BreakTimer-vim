import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v2.0.0/helper/mod.ts";
import * as vars from "https://deno.land/x/denops_std@v2.0.0/variable/mod.ts";
import { fetchToken, start, stop } from "./breaktimer.ts";

async function getUserName(denops: Denops): Promise<string> {
  const userName = await vars.g.get(
    denops,
    "break_timer_username",
    Deno.env.get("break_timer_username"),
  );
  if (userName == null) {
    throw new Error(
      "You must set break_timer_username as vim global variable or env variable.",
    );
  }
  return userName;
}
async function getToken(denops: Denops): Promise<string> {
  const token = await vars.g.get(
    denops,
    "break_timer_token",
    Deno.env.get("break_timer_token"),
  );
  if (token == null) {
    throw new Error(
      "You must set break_timer_token as vim global variable or env variable.",
    );
  }
  return token;
}

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async getToken(args: unknown): Promise<void> {
      try {
        const userName = await getUserName(denops);
        const token = await fetchToken(userName);
        console.log(`Your token is &{token}, memorize this.`);
      } catch (error) {
        console.error(`[BreakTimer] ${error}`);
        return await Promise.resolve();
      }
    },
    async startWriting(args: unknown): Promise<void> {
      try {
        const userName = await getUserName(denops);
        const token = await getToken(denops);
        const filetype = await denops.eval("&filetype") as string;
        await start(userName, token, filetype);
      } catch (error) {
        console.error(`[BreakTimer] ${error}`);
        return await Promise.resolve();
      }
    },
    async stopWriting(args: unknown): Promise<void> {
      try {
        const userName = await getUserName(denops);
        const token = await getToken(denops);
        const filetype = await denops.eval("&filetype") as string;
        await stop(userName, token, filetype);
      } catch (error) {
        console.error(`[BreakTimer] ${error}`);
        return await Promise.resolve();
      }
    },
  };
  await execute(
    denops,
    `
    command! BreakTimerFetchToken call denops#notify("${denops.name}", "getToken", [])
    command! BreakTimerStartWriting call denops#notify("${denops.name}", "startWriting", [])
    command! BreakTimerStopWriting call denops#notify("${denops.name}", "stopWriting", [])
    `,
  );
  await execute(
    denops,
    `augroup break_timer
       autocmd!
       autocmd BufWinEnter,WinEnter,BufEnter * BreakTimerStartWriting
       autocmd BufWritePost * BreakTimerStopWriting
       if exists("##QuitPre")
         autocmd QuitPre * BreakTimerStopWriting
       endif
    augroup END
    `,
  );
}
