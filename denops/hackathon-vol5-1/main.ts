import { Denops } from "https://deno.land/x/denops_std@v1.0.0-alpha.3/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v1.0.0-alpha.3/helper/mod.ts";
import * as vars from "https://deno.land/x/denops_std@v1.0.0-alpha.3/variable/mod.ts";

const baseUrl = "https://agile-tundra-65071.herokuapp.com/api/";

async function fetchToken(userName: string) {
  const r = await fetch(baseUrl + userName, {
    method: "GET",
  });
  if (r.status !== 200) {
    console.error(`[hachathon5_1] The response status code is ${r.status}.`);
    throw new Error(`[hachathon5_1] The response status code is ${r.status}.`);
  }
  const json = r.json();
  const data = await json;
  return data;
}

async function postAPI(url: string, body: Record<string, unknown>) {
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (r.status !== 200) {
    console.error(`[hachathon5_1] The response status code is ${r.status}.`);
    throw new Error(`[hachathon5_1] The response status code is ${r.status}.`);
  }
}

async function start(userName: string, token: string, filetype: string) {
  await postAPI(baseUrl + "/start/" + userName, {
    token: token,
    filetype: filetype,
  });
}

async function stop(userName: string, token: string, filetype: string) {
  await postAPI(baseUrl + "/stop/" + userName, {
    token: token,
    filetype: filetype,
  });
}

async function getUserName(denops: Denops): Promise<string> {
  const userName = await vars.g.get(
    denops,
    "hackathon5_1_username",
    Deno.env.get("hackathon5_1_username"),
  );
  if (userName == null) {
    console.error(
      "You must set hackathon5_1_username as vim global variable or env variable.",
    );
    throw new Error(
      "You must set hackathon5_1_username as vim global variable or env variable.",
    );
  }
  return userName;
}
async function getToken(denops: Denops): Promise<string> {
  const token = await vars.g.get(
    denops,
    "hackathon5_1_token",
    Deno.env.get("hackathon5_1_token"),
  );
  if (token == null) {
    console.error(
      "You must set hackathon5_1_token as vim global variable or env variable.",
    );
    throw new Error(
      "You must set hackathon5_1_token as vim global variable or env variable.",
    );
  }
  return token;
}

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async getToken(args: unknown): Promise<void> {
      const userName = await getUserName(denops);
      const token = await fetchToken(userName);
      console.log(`Your token is &{token}, memorize this.`);
    },
    async startWriting(args: unknown): Promise<void> {
      const userName = await getUserName(denops);
      const token = await getToken(denops);
      const filetype = await denops.eval("&filetype") as string;
      await start(userName, token, filetype);
    },
    async stopWriting(args: unknown): Promise<void> {
      const userName = await getUserName(denops);
      const token = await getToken(denops);
      const filetype = await denops.eval("&filetype") as string;
      await stop(userName, token, filetype);
    },
  };
  await execute(
    denops,
    `
    command! HackathonFiveFetchToken call denops#notify("${denops.name}", "getToken", [])
    command! HackathonFiveStartWriting call denops#notify("${denops.name}", "startWriting", [])
    command! HackathonFiveStopWriting call denops#notify("${denops.name}", "stopWriting", [])
    `,
  );
  await execute(
    denops,
    `augroup hackathon5_1
       autocmd!
       autocmd BufWinEnter,WinEnter,BufEnter * HackathonFiveStartWriting
       autocmd BufWritePost * HackathonFiveStopWriting
       if exists("##QuitPre")
         autocmd QuitPre * HackathonFiveStopWriting
       endif
    augroup END
    `,
  );
}
