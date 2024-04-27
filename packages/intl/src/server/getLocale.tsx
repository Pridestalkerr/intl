import { AbstractIntlMessages } from "use-intl/core";
import { getConfigImpl } from "./getConfig";

export function getLocaleImpl<L extends string, M extends AbstractIntlMessages>(
  getConfig: ReturnType<typeof getConfigImpl<L, M>>,
) {
  return async () => {
    const config = await getConfig();
    return config.locale;
  };
}
