(function () {
  var hostname = window.location.hostname;
  var isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  window.klaroConfig = {
    testing: false,
    elementID: "klaro",
    styling: {
      theme: ["light", "bottom", "left"]
    },
    storageMethod: "cookie",
    storageName: "klaro",
    htmlTexts: true,
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: true,
    hideLearnMore: false,
    noticeAsModal: false,
    translations: {
      de: {
        privacyPolicyUrl: "/privacy",
        consentNotice: {
          description: "🍪 Wir verwenden Cookies, um die Website zu verbessern. Details findest du in der Datenschutzerklarung.",
          learnMore: "Auswahlen"
        },
        ok: "Alles klar",
        consentModal: {
          title: "Cookie Einstellungen",
          description: "Hier kannst du einsehen und anpassen, welche Informationen wir sammeln."
        },
        purposes: {
          analytics: {
            title: "Besucher Statistiken"
          }
        }
      },
      en: {
        privacyPolicyUrl: "/privacy",
        consentNotice: {
          title: "Cookie Settings",
          description: "🍪 We use cookies to improve the website. Details are available in our privacy policy.",
          learnMore: "Select"
        },
        ok: "Accept all",
        consentModal: {
          title: "Consent Settings",
          description: "Here you can review and manage which information we collect."
        },
        purposes: {
          analytics: {
            title: "Analytics"
          }
        }
      }
    },
    services: [
      {
        name: "Google Analytics",
        default: false,
        translations: {
          de: {
            title: "Google Analytics",
            description: "Google Analytics ist ein Webanalyse Dienst der Google LLC."
          },
          en: {
            title: "Google Analytics",
            description: "Google Analytics is a web analytics service provided by Google LLC."
          }
        },
        purposes: ["analytics"]
      }
    ]
  };

  if (!isLocalHost) {
    window.klaroConfig.cookieDomain = ".florianheiwig.de";
  }

  window.dataLayer = window.dataLayer || [];
  window.klaroReady = false;

  window.openKlaroSettings = function () {
    function openModal() {
      if (window.klaro && typeof window.klaro.show === "function") {
        window.klaro.show(window.klaroConfig, true);
        return true;
      }
      return false;
    }

    if (openModal()) {
      return;
    }

    var attempts = 0;
    var interval = window.setInterval(function () {
      attempts += 1;
      if (openModal() || attempts >= 30) {
        window.clearInterval(interval);
      }
    }, 100);
  };

  document.addEventListener("click", function (event) {
    if (!(event.target instanceof Element) || !event.target.closest(".cm-btn")) {
      return;
    }

    window.setTimeout(function () {
      window.dataLayer.push({ event: "consentChoice" });
    }, 500);

    window.setTimeout(function () {
      window.dataLayer.push({ event: "consentUpdated" });
    }, 1000);
  });

  var script = document.createElement("script");
  script.src = "https://cdn.kiprotect.com/klaro/v0.7.18/klaro.js";
  script.onload = function () {
    if (window.klaro && typeof window.klaro.setup === "function") {
      window.klaro.setup(window.klaroConfig);
      window.klaroReady = true;
    }
  };
  script.onerror = function () {
    console.error("Failed to load Klaro script from CDN.");
  };
  document.head.appendChild(script);
})();
