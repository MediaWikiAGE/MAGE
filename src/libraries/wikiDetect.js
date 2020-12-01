import { get } from "got";
import http from "http";
import https from "https";

/**
 * Custom function to get the wiki scriptpath (must pass url object)
 * To be used when discovering new wikis
 */
export function getWikiInfo(scriptPath) {
  if (!(scriptPath instanceof URL))
    console.log("Warning: URL object not passed.");
  return new Promise((resolve, reject) => {
    (scriptPath.protocol === "https:" ? https : http)
      .request(
        {
          method: "GET",
          port: scriptPath.protocol === "https:" ? 443 : 80,
          hostname: scriptPath.hostname,
          path: scriptPath.pathname,
        },
        (response, err) => {
          const request = this;
          let body = "";

          //Abort when match chunk
          response.on("data", (chunk) => {
            body += chunk;
            const match = body.match(/(?:src|href)="(.+)(?:load|api)\.php/);
            if (match) request.abort();
          });

          response.on("end", () => {
            //Parse Script Path
            const match = body.match(/(?:src|href)="(.+)(?:load|api)\.php/);
            if (!match)
              throw new Error("URL is (probably) not a MediaWiki url.");
            resolve(match[1]);
          });
        }
      )
      .on("error", reject)
      .end();
  }).then((path) => {
    scriptPath.pathname = path;
    //Get clean server and scriptpath values from api.php
    return get(
      `${scriptPath.href}api.php?action=query&meta=siteinfo&type=login&format=json`,
      { responseType: "json" }
    );
  });
}
