import { ComponentProps } from "react";
import IntlClientProviderImpl from "./_IntlClientProvider";
import { getConfigImpl } from "./getConfig";
import { AbstractIntlMessages } from "use-intl";

export default function IntlClientProvider<
  L extends string,
  M extends AbstractIntlMessages,
>(getConfig: ReturnType<typeof getConfigImpl<L, M>>) {
  return async ({
    locale,
    now,
    timeZone,
    messages,
    ...rest
  }: ComponentProps<typeof IntlClientProviderImpl>) => {
    const config = await getConfig();
    return (
      <IntlClientProviderImpl
        locale={locale ?? config.locale}
        now={now ?? config.now}
        timeZone={timeZone ?? config.timeZone}
        messages={messages ?? config.messages}
        {...rest}
      />
    );
  };
}
