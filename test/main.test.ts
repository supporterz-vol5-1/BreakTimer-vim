import {
  assertEquals,
  assertObjectMatch,
  assertThrowsAsync,
} from "./dev_deps.ts";

import { fetchToken, postAPI } from "../denops/BreakTimer-vim/main.ts";

const expectObject = {
  "this_is": "test",
};

const MOCK_200 = async (): Promise<Response> => {
  return await new Response(
    '{"this_is": "test"}',
    {
      status: 200,
      statusText: "test",
      headers: { "content-type": "application/json" },
    },
  );
};

const MOCK_404 = async (): Promise<Response> => {
  return await new Response(
    '{"this_is": "test"}',
    { status: 404, statusText: "test", headers: { "title": "test" } },
  );
};

Deno.test({
  name: "On fetchToken, if status is 200, return body as object.",
  fn: async () => {
    window.fetch = MOCK_200;
    const actual = await fetchToken("test");
    // if a in b and b in a then a === b;
    assertObjectMatch(actual, expectObject);
    assertObjectMatch(expectObject, actual);
  },
});

Deno.test({
  name: "On fetchToken, if status is not 200, throw error.",
  fn: () => {
    window.fetch = MOCK_404;
    assertThrowsAsync(
      () => fetchToken("test"),
      Error,
    );
  },
});

Deno.test({
  name: "On postAPI, if status is 200, return None(undefined).",
  fn: async () => {
    window.fetch = MOCK_200;
    const actual = await postAPI("https://example.com", expectObject); // url is ignore
    assertEquals(
      actual,
      undefined,
    );
  },
});

Deno.test({
  name: "On postAPI, if status is not 200, throw error.",
  fn: async () => {
    window.fetch = MOCK_404;
    assertThrowsAsync(
      () => postAPI("https://example.con", expectObject),
      Error,
    );
  },
});
