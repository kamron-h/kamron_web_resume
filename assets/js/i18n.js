(function () {
  const SUPPORTED_LANGS = ["en", "fr"];
  const STORAGE_KEY = "site_lang";
  const DICT_BASE_PATH = "assets/i18n";

  const originalContent = new WeakMap();
  const originalAttrs = new WeakMap();
  const dictionaries = {};
  const entityDecoder = document.createElement("textarea");

  let currentLang = "en";

  function normalizeLang(value) {
    if (!value || typeof value !== "string") return null;
    const short = value.trim().toLowerCase().split("-")[0];
    return SUPPORTED_LANGS.includes(short) ? short : null;
  }

  function detectLanguage() {
    const queryLang = normalizeLang(new URLSearchParams(window.location.search).get("lang"));
    if (queryLang) return queryLang;

    try {
      const stored = normalizeLang(window.localStorage.getItem(STORAGE_KEY));
      if (stored) return stored;
    } catch (error) {
      // Ignore localStorage access errors and continue fallback chain.
    }

    const browser = normalizeLang(window.navigator.language || "");
    return browser === "fr" ? "fr" : "en";
  }

  function rememberLanguage(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Ignore localStorage access errors; translation still works for the session.
    }
  }

  async function loadDictionary(lang) {
    if (dictionaries[lang]) return dictionaries[lang];
    const response = await fetch(`${DICT_BASE_PATH}/${lang}.json`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load ${lang} dictionary (${response.status})`);
    }
    const parsed = await response.json();
    dictionaries[lang] = parsed && typeof parsed === "object" ? parsed : {};
    return dictionaries[lang];
  }

  function getValueByKey(dictionary, key) {
    if (!dictionary || !key) return undefined;
    return key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dictionary);
  }

  function parseI18nAttrMap(value) {
    return String(value || "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const separator = entry.indexOf(":");
        if (separator < 1) return null;
        return {
          attrName: entry.slice(0, separator).trim(),
          key: entry.slice(separator + 1).trim(),
        };
      })
      .filter((item) => item && item.attrName && item.key);
  }

  function getTranslation(key, activeDict, enDict) {
    const selected = getValueByKey(activeDict, key);
    if (selected !== undefined && selected !== null) return String(selected);

    const english = getValueByKey(enDict, key);
    if (english !== undefined && english !== null) return String(english);

    return null;
  }

  function normalizeTranslatedText(value) {
    if (!value) return "";
    // Defensive cleanup so accidental inline markup in dictionaries never renders as visible tags.
    const withoutTags = value.replace(/<[^>]*>/g, "");
    entityDecoder.innerHTML = withoutTags;
    return entityDecoder.value;
  }

  function updateLanguageSwitcherState() {
    document.querySelectorAll("[data-lang-switch]").forEach((element) => {
      const lang = normalizeLang(element.getAttribute("data-lang-switch"));
      const isActive = lang === currentLang;
      element.classList.toggle("active", isActive);
      element.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyTranslations(activeDict, enDict) {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (!originalContent.has(element)) {
        originalContent.set(element, {
          text: element.textContent,
          html: element.innerHTML,
        });
      }

      const translated = getTranslation(key, activeDict, enDict);
      if (translated !== null) {
        element.textContent = normalizeTranslatedText(translated);
      } else {
        element.innerHTML = originalContent.get(element).html;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const mappings = parseI18nAttrMap(element.getAttribute("data-i18n-attr"));
      if (!originalAttrs.has(element)) originalAttrs.set(element, {});
      const originalMap = originalAttrs.get(element);

      mappings.forEach(({ attrName, key }) => {
        if (!(attrName in originalMap)) {
          originalMap[attrName] = element.getAttribute(attrName);
        }

        const translated = getTranslation(key, activeDict, enDict);
        const fallback = originalMap[attrName];
        if (translated !== null) {
          element.setAttribute(attrName, translated);
        } else if (fallback === null || fallback === undefined) {
          element.removeAttribute(attrName);
        } else {
          element.setAttribute(attrName, fallback);
        }
      });
    });

    updateLanguageSwitcherState();
  }

  async function setLanguage(nextLang) {
    const normalized = normalizeLang(nextLang) || "en";
    currentLang = normalized;
    rememberLanguage(currentLang);

    const [activeDict, enDict] = await Promise.all([
      loadDictionary(currentLang),
      currentLang === "en" ? Promise.resolve(dictionaries.en || {}) : loadDictionary("en"),
    ]);

    applyTranslations(activeDict, enDict);
    return currentLang;
  }

  function getLanguage() {
    return currentLang;
  }

  window.setLanguage = setLanguage;
  window.getLanguage = getLanguage;

  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
      const switcher = event.target.closest("[data-lang-switch]");
      if (!switcher) return;
      event.preventDefault();
      const nextLang = normalizeLang(switcher.getAttribute("data-lang-switch")) || "en";
      setLanguage(nextLang).catch(function (error) {
        console.error("[i18n]", error);
      });
    });

    setLanguage(detectLanguage()).catch(function (error) {
      console.error("[i18n]", error);
    });
  });
})();
