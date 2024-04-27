import { cache } from "react";
import { getConfigImpl } from "./server/getConfig";
import { AbstractIntlMessages, initializeConfig } from "use-intl";
import { getMessagesImpl } from "./server/getMessages";
import { getTranslationsImpl } from "./server/getTranslations";
import { getMessageFormatCacheImpl } from "./server/getMessageFormatCache";

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

  return {
    getMessages,
    getTranslations,
    getLocale,
  };
};

export { pickTranslations } from "./utils/pickTranslations";
