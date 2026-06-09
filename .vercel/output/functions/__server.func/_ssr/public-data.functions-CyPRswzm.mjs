import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-CWsG1l_s.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getPublicProducts_createServerFn_handler = createServerRpc({
  id: "9a6541631cbabffa401ef96c2dda0cd1d325a204b0a29f86a9be21d9a76d4887",
  name: "getPublicProducts",
  filename: "src/lib/public-data.functions.ts"
}, (opts) => getPublicProducts.__executeServer(opts));
const getPublicProducts = createServerFn({
  method: "GET"
}).handler(getPublicProducts_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("products").select("*").eq("is_active", true).order("sort_order");
  if (error) throw error;
  return data ?? [];
});
const getPublicSettings_createServerFn_handler = createServerRpc({
  id: "17c8262e497437c3378d9208dce103ef6b21a61febdd07e7803cdbe64886443a",
  name: "getPublicSettings",
  filename: "src/lib/public-data.functions.ts"
}, (opts) => getPublicSettings.__executeServer(opts));
const getPublicSettings = createServerFn({
  method: "GET"
}).handler(getPublicSettings_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Configurações da loja não encontradas.");
  return data;
});
const getPublicReviews_createServerFn_handler = createServerRpc({
  id: "e749c72c7ebed0efeb0eb76434ba1a41103739076c003811248ff176710598bc",
  name: "getPublicReviews",
  filename: "src/lib/public-data.functions.ts"
}, (opts) => getPublicReviews.__executeServer(opts));
const getPublicReviews = createServerFn({
  method: "GET"
}).handler(getPublicReviews_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("reviews").select("*").eq("is_active", true).order("sort_order");
  if (error) throw error;
  return data ?? [];
});
export {
  getPublicProducts_createServerFn_handler,
  getPublicReviews_createServerFn_handler,
  getPublicSettings_createServerFn_handler
};
