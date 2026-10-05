const forceLightTheme = () => {
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.mode = "light";
  try {
    localStorage.setItem("mode", "light");
    localStorage.setItem("theme", "light");
  } catch {
    // 禁用本地存储时，保留 data 属性也能强制使用亮色主题。
  }
};

const isEnglishPage = () =>
  window.location.pathname.replaceAll("\\", "/").includes("/en/");

const currentLanguage = () => (isEnglishPage() ? "en" : "zh");

// Resolve navigation from the script location, including on nested note pages.
const siteRoot = new URL('../', document.querySelector('script[src*="force-light.js"]').src);
const languageUrl = (path) => new URL(`${isEnglishPage() ? "en/" : ""}${path}`, siteRoot).href;
const tagUrl = (label) => `${languageUrl("tags.html")}?tag=${encodeURIComponent(label)}`;

const tagColorClass = (label) => {
  const hash = [...label].reduce(
    (total, char) => total + (char.codePointAt(0) || 0),
    0
  );
  return `tag-color-${(hash % 6) + 1}`;
};

const createTagLink = (label, className = "tag-cloud-item") => {
  const link = document.createElement("a");
  link.className = `${className} ${tagColorClass(label)}`.trim();
  link.href = tagUrl(label);
  link.textContent = label;
  link.dataset.tag = label;
  return link;
};

const translationMap = {
  "柔性机器人": "Soft Robotics",
  "力感知": "Force Sensing",
  "机器学习": "Machine Learning",
  "科研主页": "Research Website",
  "柔性机械手": "Soft Gripper",
  "力反演": "Force Inference",
  "视觉感知": "Visual Sensing",
  "逆问题": "Inverse Problems",
  "实验平台": "Experimental Platform",
  "视频演示": "Video Demo",
  "算法动画": "Algorithm Animation",
  "代码": "Code",
  "数学": "Mathematics",
  "工具链": "Toolchain",
  "研究随笔": "Research Journal",
  "学习复盘": "Learning Review",
  "工具记录": "Tool Notes",
  "教育背景": "Education",
  "研究经历": "Research",
  "技能": "Skills",
  "论文": "Publications",
  "个人简介": "Profile",
  "研究兴趣": "Research Interests",
  "机器人": "Robotics",
  "工作流": "Workflow"
};

const reverseTranslationMap = Object.fromEntries(
  Object.entries(translationMap).map(([zh, en]) => [en, zh])
);

const translatedSearch = () => {
  const params = new URLSearchParams(window.location.search);
  const selected = params.get("tag");
  if (!selected) return window.location.search;

  const translated = isEnglishPage()
    ? reverseTranslationMap[selected]
    : translationMap[selected];
  if (translated) params.set("tag", translated);
  const query = params.toString();
  return query ? `?${query}` : "";
};

const linkInlineTags = () => {
  document.querySelectorAll(".tag, .page-tag, .content-tag").forEach((tag) => {
    if (tag.closest("a")) return;
    const label = tag.textContent.trim();
    if (!label) return;
    const link = createTagLink(label, tag.className);
    tag.replaceWith(link);
  });
};

const addLanguageSwitch = () => {
  const toolbar =
    document.querySelector(".bd-header-article .article-header-buttons") ||
    document.querySelector(".bd-header-article .header-article-items__end") ||
    document.querySelector(".bd-header-article");
  if (!toolbar || toolbar.querySelector(".language-switch")) return;

  const pagePath = window.location.pathname.slice(siteRoot.pathname.length) || "index.html";
  const pageName = pagePath.startsWith("notes/") ? "notes.html" : pagePath.replace(/^en\//, "");
  const switchLink = document.createElement("a");
  switchLink.className = "language-switch";
  switchLink.textContent = isEnglishPage() ? "CH" : "EN";
  switchLink.title = isEnglishPage()
    ? "切换到中文版"
    : "Switch to the English version";
  switchLink.setAttribute("aria-label", switchLink.title);
  switchLink.href = new URL(
    `${isEnglishPage() ? "" : "en/"}${pageName}${translatedSearch()}${pagePath.startsWith("notes/") ? "" : window.location.hash}`,
    siteRoot
  ).href;
  toolbar.appendChild(switchLink);
};

const addSidebarAuthorName = () => {
  const logo = document.querySelector(".bd-sidebar-primary .navbar-brand");
  if (!logo) return;
  logo.href = languageUrl("index.html");

  const logoItem = logo.closest(".sidebar-primary-item") || logo;
  const existing = document.querySelector(".sidebar-author-name");
  const name = isEnglishPage() ? "Qiong Wu" : "吴琼";

  if (existing) {
    existing.textContent = name;
    existing.href = languageUrl("index.html");
  } else {
    const authorName = document.createElement("a");
    authorName.className = "sidebar-author-name";
    authorName.href = languageUrl("index.html");
    authorName.setAttribute(
      "aria-label",
      isEnglishPage() ? "Go to homepage" : "返回主页"
    );
    authorName.textContent = name;
    logoItem.insertAdjacentElement("afterend", authorName);
  }

  const existingWelcome = document.querySelector(".sidebar-welcome");
  const welcome = existingWelcome || document.createElement("div");
  welcome.className = "sidebar-welcome";
  if (isEnglishPage()) {
    welcome.replaceChildren(
      document.createTextNode("PhD Mechanical Engineering"),
      document.createElement("br"),
      document.createTextNode("Harbin Institute of Technology")
    );
  } else {
    welcome.replaceChildren(
      document.createTextNode("博士 机械工程"),
      document.createElement("br"),
      document.createTextNode("哈尔滨工业大学")
    );
  }

  if (!existingWelcome) {
    document
      .querySelector(".sidebar-author-name")
      ?.insertAdjacentElement("afterend", welcome);
  }
};

const filterNavigationByLanguage = () => {
  const english = isEnglishPage();
  document.documentElement.lang = english ? "en" : "zh-CN";
  document.title = english ? "Qiong Wu" : "吴琼";

  document
    .querySelectorAll(".bd-sidebar-primary li.toctree-l1")
    .forEach((item) => {
      const href =
        item
          .querySelector(":scope > a.reference.internal")
          ?.getAttribute("href") || "";
      const lang = hrefLanguage(href);
      item.hidden = lang ? lang !== currentLanguage() : false;
      if (english && item.textContent.trim() === "Home") item.hidden = true;
    });

  document.querySelectorAll(".bd-sidebar-primary p.caption").forEach((caption) => {
    const list = caption.nextElementSibling;
    if (!list?.matches("ul")) return;
    const items = [...list.children].filter((item) => item.matches("li"));
    caption.hidden = items.length > 0 && items.every((item) => item.hidden);
  });
};

const replaceDirectText = (element, text) => {
  if (!element) return;
  const textNode = [...element.childNodes].find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
  );
  if (textNode) {
    textNode.textContent = ` ${text}`;
  } else {
    element.append(` ${text}`);
  }
};

const translateEnglishInterface = () => {
  if (!isEnglishPage()) return;

  document.querySelectorAll(".search-button__default-text").forEach((element) => {
    element.textContent = "Search";
  });

  document.querySelectorAll(".search-button__button").forEach((button) => {
    button.title = "Search";
    button.setAttribute("aria-label", "Search");
  });

  const fullscreen = document.querySelector(".btn-fullscreen-button");
  if (fullscreen) fullscreen.title = "Fullscreen";

  document.querySelectorAll(".onthispage").forEach((element) => {
    replaceDirectText(element, "Contents");
  });

  document.querySelectorAll("#jb-print-toc h2").forEach((heading) => {
    heading.textContent = "Contents";
  });

  document.querySelectorAll(".left-prev").forEach((link) => {
    link.title = "Previous page";
    const subtitle = link.querySelector(".prev-next-subtitle");
    if (subtitle) subtitle.textContent = "Previous page";
    if ((link.getAttribute("href") || "").startsWith("../")) link.hidden = true;
  });

  document.querySelectorAll(".right-next").forEach((link) => {
    link.title = "Next page";
    const subtitle = link.querySelector(".prev-next-subtitle");
    if (subtitle) subtitle.textContent = "Next page";
    if ((link.getAttribute("href") || "").startsWith("../")) link.hidden = true;
  });

  const author = document.querySelector(".component-author");
  if (author) author.textContent = "Author: Qiong Wu";

  const backToTop = document.getElementById("pst-back-to-top");
  if (backToTop) {
    replaceDirectText(backToTop, "Back to top");
    backToTop.title = "Back to top";
  }
};

const hideCrossLanguagePagination = () => {
  if (isEnglishPage()) return;
  document.querySelectorAll(".prev-next-area a").forEach((link) => {
    if (hrefLanguage(link.getAttribute("href") || "") === "en") link.hidden = true;
  });
};

const normalizeHref = (href) => {
  if (!href) return "";
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return "";
  return `${url.pathname}${url.search}`.replace(/\/+/g, "/");
};

const pageLanguageFromPath = (path) =>
  path && path.replaceAll("\\", "/").includes("/en/") ? "en" : "zh";

const hrefLanguage = (href) => {
  const normalized = normalizeHref(href);
  return normalized ? pageLanguageFromPath(normalized) : null;
};

const currentPagePath = () => {
  const path = window.location.pathname.replace(/\/+/g, "/");
  return path.endsWith("/") ? `${path}index.html` : path;
};

const navPagePaths = () => {
  const paths = new Set([currentPagePath()]);

  document
    .querySelectorAll(".bd-sidebar-primary a.reference.internal[href]")
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (hrefLanguage(href) !== currentLanguage()) return;
      const normalized = normalizeHref(href);
      if (normalized) paths.add(normalized);
    });

  return [...paths];
};

const pageDataCache = new Map();

const parsePageDocument = (html, url) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const article = doc.querySelector(".bd-article") || doc.body;
  const title =
    article.querySelector("h1")?.textContent.trim() ||
    doc.querySelector("title")?.textContent.trim() ||
    url;

  const summary =
    [...article.querySelectorAll("p")]
      .map((node) => node.textContent.replace(/\s+/g, " ").trim())
      .find(Boolean) || "";

  const tags = [
    ...new Set(
      [...article.querySelectorAll(".page-tag, .content-tag, .tag-cloud-item")]
        .map((node) => node.textContent.trim())
        .filter(Boolean)
    )
  ];

  return {
    lang: pageLanguageFromPath(url),
    title,
    summary,
    tags,
    url: new URL(url, window.location.origin).pathname.replace(/\/+/g, "/")
  };
};

const fetchPageEntry = async (path) => {
  if (pageDataCache.has(path)) return pageDataCache.get(path);

  const promise = fetch(path)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      return response.text();
    })
    .then((html) => parsePageDocument(html, path))
    .catch(() => null);

  pageDataCache.set(path, promise);
  return promise;
};

let currentEntriesPromise;

const currentEntries = async () => {
  if (!currentEntriesPromise) {
    currentEntriesPromise = Promise.all(navPagePaths().map(fetchPageEntry)).then(
      (entries) =>
        entries.filter(
          (entry) =>
            entry &&
            entry.lang === currentLanguage() &&
            Array.isArray(entry.tags) &&
            entry.tags.length > 0
        )
    );
  }
  return currentEntriesPromise;
};

const allTagLabels = async () => {
  const entries = await currentEntries();
  return [...new Set(entries.flatMap((entry) => entry.tags || []))].sort((a, b) =>
    a.localeCompare(b, isEnglishPage() ? "en" : "zh-CN")
  );
};

const ensureSecondarySidebar = () => {
  const content = document.querySelector(".bd-main .bd-content");
  if (!content) return null;

  const existing =
    content.querySelector(".bd-sidebar-secondary .sidebar-secondary__inner") ||
    document.querySelector(".bd-sidebar-secondary .sidebar-secondary__inner");
  if (existing) return existing;

  const sidebar = document.createElement("div");
  sidebar.id = "pst-secondary-sidebar";
  sidebar.className = "bd-sidebar-secondary bd-toc";

  const inner = document.createElement("div");
  inner.className = "sidebar-secondary-items sidebar-secondary__inner";
  sidebar.appendChild(inner);

  content.appendChild(sidebar);
  return inner;
};

const keepSecondarySidebarFixed = () => {
  const sidebar = document.querySelector(".bd-sidebar-secondary");
  const content = document.querySelector(".bd-main .bd-content");
  if (!sidebar || !content) return;

  let frame = 0;
  const updatePosition = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (!window.matchMedia("(min-width: 1200px)").matches) {
        sidebar.classList.remove("is-viewport-fixed");
        sidebar.style.removeProperty("--wq-secondary-left");
        sidebar.style.removeProperty("--wq-secondary-width");
        return;
      }

      sidebar.classList.remove("is-viewport-fixed");
      const rect = sidebar.getBoundingClientRect();
      sidebar.style.setProperty("--wq-secondary-left", `${rect.left}px`);
      sidebar.style.setProperty("--wq-secondary-width", `${rect.width}px`);
      sidebar.classList.add("is-viewport-fixed");
    });
  };

  updatePosition();
  window.addEventListener("resize", updatePosition, { passive: true });
  document.addEventListener("transitionend", updatePosition);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(updatePosition);
    observer.observe(content);
    observer.observe(sidebar);
  }
};

const renderSidebarTagCloud = async () => {
  const sidebar = ensureSecondarySidebar();
  if (!sidebar || sidebar.querySelector(".sidebar-tag-cloud")) return;

  const labels = await allTagLabels();

  const cloud = document.createElement("section");
  cloud.className = "sidebar-tag-cloud";

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = languageUrl("tags.html");
  headingLink.textContent = isEnglishPage() ? "Tags" : "标签";
  heading.appendChild(headingLink);
  cloud.appendChild(heading);

  const items = document.createElement("div");
  items.className = "sidebar-tag-cloud__items";
  labels.forEach((label) => items.appendChild(createTagLink(label)));
  cloud.appendChild(items);
  sidebar.appendChild(cloud);
};

const renderTagIndex = async () => {
  const cloud = document.getElementById("tag-index-cloud");
  if (!cloud) return;
  const labels = await allTagLabels();
  labels.forEach((label) =>
    cloud.appendChild(createTagLink(label, "tag-cloud-item"))
  );
};

const renderTagResults = async () => {
  const results = document.getElementById("tag-results");
  if (!results) return;

  const selected = new URLSearchParams(window.location.search).get("tag");
  if (!selected) return;

  const entries = await currentEntries();
  const matches = entries.filter((entry) => (entry.tags || []).includes(selected));
  results.replaceChildren();

  const heading = document.createElement("h3");
  heading.className = "tag-results-title";
  heading.textContent = isEnglishPage()
    ? `Results tagged "${selected}" (${matches.length})`
    : `标签“${selected}”的相关结果（${matches.length}）`;
  results.appendChild(heading);

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = isEnglishPage()
      ? "No related content was found."
      : "暂时没有找到关联内容。";
    results.appendChild(empty);
    return;
  }

  matches.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "tag-result-card";

    const title = document.createElement("h4");
    const link = document.createElement("a");
    link.href = entry.url;
    link.textContent = entry.title;
    title.appendChild(link);

    const summary = document.createElement("p");
    summary.textContent = entry.summary;

    const tags = document.createElement("div");
    tags.className = "tag-result-card__tags";
    entry.tags.forEach((label) =>
      tags.appendChild(createTagLink(label, "tag-cloud-item"))
    );

    card.append(title, summary, tags);
    results.appendChild(card);
  });

  document
    .querySelectorAll(`[data-tag="${CSS.escape(selected)}"]`)
    .forEach((tag) => tag.classList.add("selected"));
};

forceLightTheme();
document.addEventListener("DOMContentLoaded", async () => {
  forceLightTheme();
  filterNavigationByLanguage();
  addSidebarAuthorName();
  translateEnglishInterface();
  hideCrossLanguagePagination();
  addLanguageSwitch();
  linkInlineTags();
  await renderSidebarTagCloud();
  await renderTagIndex();
  await renderTagResults();
  keepSecondarySidebarFixed();
});
