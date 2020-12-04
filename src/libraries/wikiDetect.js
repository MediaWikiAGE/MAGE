import { get, stream } from "got";

/**
 * Custom function to get the wiki scriptpath (must pass url object)
 * To be used when discovering new wikis
 */

export function getWikiInfo(scriptPath) {
  if (!(scriptPath instanceof URL))
    console.log("Warning: URL object not passed.");

  return new Promise((resolve, reject) => {
    console.log(`Starting Auto Check: ${scriptPath}`);
    let body = "";
    let match = null;
    const request = stream.get(scriptPath);
    request.on("data", chunk => {
      body += chunk;
      match = body.match(/(?:src|href)="(.+)(?:load|api)\.php/);
      console.log("Stream Length: ", body.length);
      if (match) {
        request.destroy();
        onEnd();
      }
    });
    const onEnd = () => {
      //Parse Script Path
      if (!match)
        throw new Error(`URL is (probably) not a MediaWiki url: ${scriptPath}`);
      resolve(match[1].replace(scriptPath.origin, ""));
    };
    request.on("end", onEnd);
  }).then((path) => {
    scriptPath.pathname = path;
    console.log(`Auto Check Script Path: ${scriptPath}`);
    //Get clean server and scriptpath values from api.php
    return get(
      `${scriptPath.href}api.php?action=query&meta=siteinfo&type=login&format=json`,
      { responseType: "json" }
    );
  });
}
