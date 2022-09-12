// CafeArticleCrawler by (spotky1004)[https://github.com/spotky1004]

const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

class CafeArticleCrawler {
  /**
   * @typedef Article
   * @property {string} name
   * @property {string} href
   * @property {string} title
   * @property {string} article
   */

  #cafeLink = "";
  #articleListLink = "";
  /** @type {Article[]} */
  #articles = [];
  #loading = true;

  /**
   * @param {string} articleListLink 
   */
  constructor(articleListLink) {
    this.#cafeLink = articleListLink.split("?")[0];
    this.#articleListLink = articleListLink;
    this.#articles = [];

    this.#init();
  }

  async #init() {
    await this.#initArticleList();
    this.#loading = false;
  }

  /**
   * @param {string} link 
   */
  async #getHtml(link) {
    let html = await axios.get(
      link,
      {responseType: 'arraybuffer', responseEncoding: 'binary'}
    );
    html = iconv.decode(Buffer.from(html.data), "KSC5601");
    return cheerio.load(html);
  }

  async #initArticleList() {
    const $ = await this.#getHtml(this.#articleListLink);
  
    const listEls = $("div.article-board").last().find("table > tbody > tr .article");
    const listElArr = listEls.toArray();

    const tagNameCheckRegExp = /^\[[^\]]+\]$/;
    const rawNames = listEls.text().split("\n").map(v => v.trim()).filter(v => v.length > 0);
    const names = [];
    let isTag = false;
    for (const rawName of rawNames) {
      if (tagNameCheckRegExp.test(rawName)) {
        names.push(rawName);
        isTag = true;
      } else {
      if (isTag && names.length > 0) {
        names[names.length - 1] += " " + rawName;
        isTag = false;
      } else {
        names.push(rawName);
      }
    }
  }

    for (let i = 0; i < listElArr.length; i++) {
      const itemEl = listElArr[i];
      const href = this.#cafeLink + itemEl.attribs.href;
      const article = await this.#getArticle(href);

      this.#articles.push({
        name: names[i],
        href,
        title: article.title,
        article: article.article
      });
    }
  }

  /**
   * @param {string} herf 
   */
  async #getArticle(link) {
    const $ = await this.#getHtml(link);

    const title = $("#spiButton").attr("data-title");
    
    const rawArticle = $(".se-main-container").text();
    const article = rawArticle.trim();
    
    return { title, article };
  }

  /**
   * @returns {Promise<boolean>}

   */
  async #waitLoading() {
    if (!this.#loading) {
      return true;
    }
    return await new Promise((res) => {
      let looper = setInterval(() => {
        if (this.#loading) {
          return;
        } else {
          res(true);
          clearInterval(looper);
        }
      }, 1000);
    });
  }

  async getArticleList() {
    await this.#waitLoading();
    return this.#articles.map(item => ({...item}));
  }

  /**
   * @param {number} idx 
   * @returns {Article}

   */
  async getArticle(idx) {
    await this.#waitLoading();
    const article = this.#articles[idx];
    return article ?? {
      article: "",
      href: "",
      name: "",
      title: ""
    };
  }
}

class ArticleCategorizer {
  /**
   * @typedef Article
   * @property {string} name
   * @property {string} href
   * @property {string} title
   * @property {string} article
   */
  
  /** @type {Map<string, Article[]>} */
  #categories = new Map();
  
  /**
   * @param {Article} articles 
   */
  constructor(articles) {
    for (const article of articles) {
      const category = (article.name.match(/(?<=\[)[^\]]+(?=\])/) ?? [])[0];
      if (typeof category === "undefined") continue;
      if (typeof this.#categories.get(category) === "undefined") {
        this.#categories.set(category, []);
      }
      this.#categories.get(category).push(article);
    }
  }
  
  /**
   * @param {string} link 
   * @returns {Article[]}
   */
  get(name) {
    return this.#categories.get(name) ?? [];
  }
}

const cafeArticles = new CafeArticleCrawler("https://cafe.naver.com/ArticleList.nhn?search.clubid=30779929&search.menuid=4&search.boardtype=L");
const frame = document.getElementById('announce_article_displayer');
cafeArticles.getArticleList().then(async list => {
  if (!list) return;
  for (let i = 0; i < Math.min(list.length, 5); i++) {
  const { name, href } = list[i];
  const announce_title = document.getElementById('announce_title_' + (i + 1));
  announce_title.innerText = name
  const announce = document.getElementById('announce_' + (i + 1));
  const announce_blank = document.getElementById('announce_blank')
  const a_article = document.getElementById('announce_article')
  const a_title = document.getElementById('announce_article_text')
  announce.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
    frame.src = href;
    a_title.innerText = name
}
}})

const cafeArticles1 = new CafeArticleCrawler("https://cafe.naver.com/ArticleList.nhn?search.clubid=30779929&search.menuid=5&search.boardtype=L");
const frame1 = document.getElementById('fetch_article_displayer');
cafeArticles1.getArticleList().then(async list => {
  if (!list) return;
  for (let i = 0; i < Math.min(list.length, 5); i++) {
  const { name, href } = list[i];
  const fetch_title = document.getElementById('fetch_title_' + (i + 1));
  fetch_title.innerText = name
  const fetch = document.getElementById('fetch_' + (i + 1));
  const fetch_blank = document.getElementById('fetch_blank')
  const f_article = document.getElementById('fetch_article')
  const f_title = document.getElementById('fetch_article_text')
  fetch.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
    frame1.src = href;
    f_title.innerText = name
}
}})

const cafeArticles2 = new CafeArticleCrawler("https://cafe.naver.com/ArticleList.nhn?search.clubid=30779929&search.menuid=28&search.boardtype=L");
const frame2 = document.getElementById('maintain_article_displayer');
cafeArticles2.getArticleList().then(async list => {
  if (!list) return;
  for (let i = 0; i < Math.min(list.length, 5); i++) {
  const { name, href } = list[i];
  console.log(list[i]);
  const maintain_title = document.getElementById('maintain_title_' + (i + 1));
  maintain_title.innerText = name
  const maintain = document.getElementById('maintain_' + (i + 1));
  const maintain_blank = document.getElementById('maintain_blank')
  const m_article = document.getElementById('maintain_article')
  const m_title = document.getElementById('maintain_article_text')
  maintain.onclick = () => {
    maintain_blank.style.display = 'none'
    m_article.style.display = ''
    frame2.src = href;
    m_title.innerText = name
}
}})

const cafeArticles3 = new CafeArticleCrawler("https://cafe.naver.com/ArticleList.nhn?search.clubid=30779929&search.menuid=26&search.boardtype=L"); //링크 수정 필수
const eventListEl = document.getElementById("event_list");
const eventsEl = document.getElementById("events");

const pastEventEl = document.getElementById("past_event");
const currentEventEl = document.getElementById("current_event");
const furtureEventEl = document.getElementById("future_event");

const frame3 = document.getElementById('event_article_displayer');
function openEventList(categoryName) {
  console.log(categoryName);
  eventListEl.style.display = "none";
  eventsEl.style.display = "";
  cafeArticles3.getArticleList().then(async rawList => {
  const categories = new ArticleCategorizer(rawList);
  const list = categories.get(categoryName);
  for (let i = 0; i < 5; i++) {
    const event = document.getElementById('event_' + (i + 1));
    const newNode = event.cloneNode(true);
    event.parentNode.insertBefore(newNode, event);
    event.parentNode.removeChild(event);
    const newTitle = document.getElementById('event_title_' + (i + 1));
    newTitle.innerText = "이벤트가 없습니다";
  }

  if (!list) return;
  const event_blank = document.getElementById('events')
  const e_article = document.getElementById('event_article')
  const e_title = document.getElementById('event_article_text')
  for (let i = 0; i < Math.min(list.length, 5); i++) {
    const event = document.getElementById('event_' + (i + 1));
    const event_title = document.getElementById('event_title_' + (i + 1));
    const { name, href } = list[i];
    console.log(list[i]);
    event_title.innerText = name
    event.onclick = () => {
      event_blank.style.display = 'none'
      e_article.style.display = ''
      frame3.src = href;
      e_title.innerText = name
    }
  }})
}

pastEventEl.onclick = () => openEventList("종료");
currentEventEl.onclick = () => openEventList("진행중");
furtureEventEl.onclick = () => openEventList("예정");
