import { AbstractIntlMessages } from "use-intl/core";
import { getConfigImpl } from "./getConfig";

export function getMessagesImpl<
  L extends string,
  M extends AbstractIntlMessages,
>(getConfig: ReturnType<typeof getConfigImpl<L, M>>) {
  return async (opts?: { locale: L }) => {
    const locale = opts?.locale ? { locale: opts?.locale } : undefined;
    const config = await getConfig(locale);
    if (!config.messages) {
      throw new Error("No messages found. Have you configured them correctly?");
    }
    return config.messages;
  };
}
