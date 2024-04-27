// type Namespace = Record<string, string>;
// export type Translations = Record<string, Namespace | string>;

import { AbstractIntlMessages } from "use-intl";

export type RequestMessages<
  L extends string,
  M extends AbstractIntlMessages,
> = (locale: L) => Promise<M>;
