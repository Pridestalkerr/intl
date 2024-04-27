import { makeConfig } from "@acme/intl/server";
import { cookies } from "next/headers";
import { Locale, defaultLocale } from "./locales";
import messages from "./messages";

const {
  getLocale,
  getMessages,
  getTranslations,
  getTimeZone,
  getNow,
  IntlClientProvider,
} = await makeConfig({
  locale: async () =>
    (cookies().get("PREFERS_LANG")?.value as Locale) || defaultLocale,
  now: async () => new Date(),
  timeZone: async () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  requestMessages: async (locale) => messages[locale],
});

export {
  getLocale,
  getMessages,
  getTranslations,
  getTimeZone,
  getNow,
  IntlClientProvider,
};
