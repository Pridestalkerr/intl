import {
  getLocale,
  getTranslations,
  getTimeZone,
  IntlClientProvider,
  getNow,
  getMessages,
} from "@/intl.config";
import { Counter } from "./counter";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: "en" });
  const tz = await getTimeZone();
  const now = await getNow();
  const messages = await getMessages({ locale: "en" });

  return (
    <div className="border p-10 flex flex-col gap-2">
      <div>
        <h1 className="text-lg">Page</h1>
        <p className="text-sm">
          Async server component. Rendered as static HTML on the server, no
          hydration.
        </p>
      </div>
      <p className="underline">
        Effective locale: <span className="text-md font-bold">{locale}</span>
      </p>
      <p className="underline">
        Timezone: <span className="text-md font-bold">{tz}</span>
      </p>
      <p className="underline">
        Now: <span className="text-md font-bold">{now.toISOString()}</span>
      </p>
      <p className="text-md text-blue-300">
        {t("helloMessage")}{" "}
        <span className="text-sm font-bold">(override locale with "en")</span>
      </p>
      <div className="p-10">
        <IntlClientProvider>
          <Counter />
        </IntlClientProvider>
      </div>
      <div></div>
      <div className="px-10 gap-2 flex flex-col">
        <h1>
          The following uses a different provider, with override on locale and
          messages.
        </h1>
        <IntlClientProvider locale={"en"} messages={messages}>
          <Counter />
        </IntlClientProvider>
      </div>
    </div>
  );
}
