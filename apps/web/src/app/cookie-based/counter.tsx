"use client";
import {
  useLocale,
  useNow,
  useTimeZone,
  useTranslations,
} from "@acme/intl/client";
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const locale = useLocale();
  const t = useTranslations();
  const tz = useTimeZone();
  const now = useNow();

  return (
    <div className="border p-10 flex flex-col gap-2">
      <div>
        <h1 className="text-lg">Counter</h1>
        <p className="text-sm">
          Client component. Hydrated on the client. "use-intl" takes over here.
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
      <p className="text-md text-blue-300">{t("helloMessage")}</p>
      <p>Current count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-white rounded-full text-black font-semibold px-4 py-2"
      >
        Increment
      </button>
    </div>
  );
};
