import { headers } from "next/headers";
import { cache } from "react";
import {
  AbstractIntlMessages,
  initializeConfig,
  IntlConfig,
} from "use-intl/core";
import { HEADER_LOCALE_NAME } from "./constants";
import { error } from "console";
import { notFound } from "next/navigation";

function getDefaultNowImpl() {
  return new Date();
}
const getDefaultNow = cache(getDefaultNowImpl);

function getDefaultTimeZoneImpl() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
const getDefaultTimeZone = cache(getDefaultTimeZoneImpl);

function getDefaultLocaleImpl() {
  let locale;

  try {
    locale = headers().get(HEADER_LOCALE_NAME);
  } catch (err) {
    if (
      err instanceof Error &&
      (err as any).digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw new Error(
        'Fetching locale from headers/cookies opts into dynamic rendering. If the page compiled is supposed to be static, then consider passing the locale prop to the page component using getStaticParams. Otherwise, you can add ```export const dynamic = "force-dynamic";``` to the file in which the error occurred.',
        { cause: err },
      );
    } else {
      throw err;
    }
  }

  if (!locale) {
    if (process.env.NODE_ENV === "development") {
      console.error("No locale found. Redirecting to 404 page.");
    }
    notFound();
  }

  return locale;
}
const getDefaultLocale = cache(getDefaultLocaleImpl);

// async function receiveRuntimeConfigImpl<L extends string>(
//   locale: L,
//   requestMessages: (locale: L) => Promise<Translations>,
// ) {
//     return {
//         now:
//     }
// }

type GetConfigImplProps<L extends string, M extends AbstractIntlMessages> = {
  getLocale: () => Promise<L>;
  getNow: () => Promise<Date>;
  getTimeZone: () => Promise<string>;
  requestMessages: (locale: L) => Promise<M>;
};
export function getConfigImpl<L extends string, M extends AbstractIntlMessages>(
  props: GetConfigImplProps<L, M>,
) {
  return async (opts?: { locale: L }) => {
    const locale = opts?.locale ?? (await props.getLocale());
    return initializeConfig({
      locale,
      now: await props.getNow(),
      timezone: await props.getTimeZone(),
      messages: await props.requestMessages(locale),
    }) as IntlConfig<M>;
  };
}
