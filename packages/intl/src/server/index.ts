import { cache } from "react";
import { getConfigImpl } from "./getConfig";
import { AbstractIntlMessages, initializeConfig } from "use-intl";
import { getMessagesImpl } from "./getMessages";
import { getTranslationsImpl } from "./getTranslations";
import { getMessageFormatCacheImpl } from "./getMessageFormatCache";
import IntlClientProvider from "./IntlClientProvider";

type MakeConfigProps<T extends AbstractIntlMessages, L extends string> = {
  locale: () => Promise<L>;
  now: () => Promise<Date>;
  timeZone: () => Promise<string>;
  /** @remarks make sure this is as fast as possible, ideally the entire object should be cached and it should return the required translation by indexing the locale */
  requestMessages: (locale: L) => Promise<T>;
};
export const makeConfig = async <
  T extends AbstractIntlMessages,
  L extends string,
>(
  props: MakeConfigProps<T, L>,
) => {
  const getLocale = cache(props.locale);
  const getNow = cache(props.now);
  const getTimeZone = cache(props.timeZone);
  const requestMessages = cache(props.requestMessages);

  // i believe most of these caches arent necessary!

  const getConfig = cache(
    getConfigImpl({
      getNow,
      getTimeZone,
      getLocale,
      requestMessages,
    }),
  );
  const getMessagesFormatCache = cache(getMessageFormatCacheImpl);

  const getMessages = cache(getMessagesImpl<L, T>(getConfig));
  const getTranslations = cache(
    getTranslationsImpl<T, L>(getConfig, getMessagesFormatCache),
  );
  const IntlClientProvider_ = cache(IntlClientProvider(getConfig));

  const getTZ = cache(async () => {
    const config = await getConfig();
    return config.timeZone;
  });

  const getLoc = cache(async () => {
    const config = await getConfig();
    return config.locale;
  });

  return {
    getMessages,
    getTranslations,
    getLocale: getLoc,
    getTimeZone: getTZ,
    getNow,
    IntlClientProvider: IntlClientProvider_,
  };
};
