import Router from "next/router";

export let prevUrl: string | undefined = undefined;
let currentUrl: string | undefined = undefined;

export const traceNavigation = () => {
  Router.events.on("beforeHistoryChange", url => {
    prevUrl = currentUrl;
    currentUrl = url;
    console.log(`prevUrl: ${prevUrl}, currentUrl: ${currentUrl}`);
  });
  Router.events.on("hashChangeStart", url => {
    prevUrl = currentUrl;
    currentUrl = url;
    console.log(`prevUrl: ${prevUrl}, currentUrl: ${currentUrl}`);
  });
};
