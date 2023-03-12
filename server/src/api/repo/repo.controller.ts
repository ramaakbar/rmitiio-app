/// <reference lib="dom" />

import { Request, Response } from "express";
import * as cheerio from "cheerio";

// credits to egoist
// src: https://github.com/egoist/gh-pinned-repos

const getHtml = async (url: string) => {
  const html = await fetch(url).then((res) => res.text());
  return cheerio.load(html);
};

function getOwner($: any, item: cheerio.Element) {
  try {
    return $(item).find(".owner").text();
  } catch (error) {
    return undefined;
  }
}

function getRepo($: any, item: cheerio.Element) {
  try {
    return $(item).find(".repo").text();
  } catch (error) {
    return undefined;
  }
}

function getDescription($: any, item: cheerio.Element) {
  try {
    return $(item).find(".pinned-item-desc").text().trim();
  } catch (error) {
    return undefined;
  }
}

async function getWebsite(repo: string) {
  return getHtml(repo)
    .then(($) => {
      try {
        const site = $(".BorderGrid-cell");
        if (!site || site.length === 0) return [];

        let href;
        site.each((index, item) => {
          if (index == 0) {
            // @ts-ignore
            href = getHREF($, item);
          }
        });
        return href;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
}

function getHREF($: any, item: cheerio.Element) {
  try {
    return $(item).find('a[href^="https"]').attr("href")?.trim();
  } catch (error) {
    return undefined;
  }
}

function getSRC($: any, item: cheerio.Element) {
  try {
    return $(item).attr("content")?.trim();
  } catch (error) {
    return undefined;
  }
}

function getImage(repo: string) {
  return getHtml(repo)
    .then(($) => {
      try {
        const site = $("meta");
        if (!site || site.length === 0) return [];

        let href;
        site.each((index, item) => {
          const attr = $(item).attr("property");
          if (attr == "og:image") {
            // @ts-ignore
            href = getSRC($, item);
          }
        });
        return href;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
}

function getStars($: any, item: cheerio.Element) {
  try {
    return $(item).find('a[href$="/stargazers"]').text().trim();
  } catch (error) {
    return 0;
  }
}

function getForks($: any, item: cheerio.Element) {
  try {
    return $(item).find('a[href$="/network/members"]').text().trim();
  } catch (error) {
    return 0;
  }
}

function getLanguage($: any, item: cheerio.Element) {
  try {
    return $(item).find('[itemprop="programmingLanguage"]').text();
  } catch (error) {
    return undefined;
  }
}

function getLanguageColor($: any, item: cheerio.Element) {
  try {
    return $(item).find(".repo-language-color").css("background-color");
  } catch (error) {
    return undefined;
  }
}

async function getPinnedRepo(username: string) {
  const $ = await getHtml(`https://github.com/${username}`);
  const pinned = $(".pinned-item-list-item.public").toArray();

  if (!pinned || pinned.length === 0) return [];

  const result: any[] = [];
  for (const [index, item] of pinned.entries()) {
    const owner = getOwner($, item);
    const repo = getRepo($, item);
    const link = "https://github.com/" + (owner || username) + "/" + repo;
    const description = getDescription($, item);
    const image = `https://opengraph.githubassets.com/1/${
      owner || username
    }/${repo}`;
    const website = await getWebsite(link);
    const language = getLanguage($, item);
    const languageColor = getLanguageColor($, item);
    const stars = getStars($, item);
    const forks = getForks($, item);

    result[index] = {
      owner: owner || username,
      repo,
      link,
      description: description || undefined,
      image: image,
      website: website || undefined,
      language: language || undefined,
      languageColor: languageColor || undefined,
      stars: +stars || 0,
      forks: +forks || 0,
    };
  }
  return result;
}

export async function handler(req: Request, res: Response) {
  const username = req.params.username;

  const result = await getPinnedRepo(username);

  return res.status(201).json(result);
}
