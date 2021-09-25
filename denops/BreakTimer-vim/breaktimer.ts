const baseUrl = "https://agile-tundra-65071.herokuapp.com/api/";

export async function fetchToken(userName: string) {
  const r = await fetch(baseUrl + userName, {
    method: "GET",
  });
  if (r.status != 200) {
    throw new Error(`The response status code is ${r.status}.`);
  }
  const json = r.json();
  const data = await json;
  return data;
}

export async function postAPI(url: string, body: Record<string, unknown>) {
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (r.status != 200) {
    throw new Error(`The response status code is ${r.status}.`);
  }
}

export async function start(userName: string, token: string, filetype: string) {
  await postAPI(baseUrl + "/start/" + userName, {
    token: token,
    filetype: filetype,
  });
}

export async function stop(userName: string, token: string, filetype: string) {
  await postAPI(baseUrl + "/stop/" + userName, {
    token: token,
    filetype: filetype,
  });
}
