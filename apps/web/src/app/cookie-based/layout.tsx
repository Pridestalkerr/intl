import { getLocale, getNow, getTimeZone, getTranslations } from "@/intl.config";

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout(props: LayoutProps) {
  const locale = await getLocale();
  const t = await getTranslations();
  const tz = await getTimeZone();
  const now = await getNow();

  return (
    <div className="border p-10 flex flex-col gap-2">
      <code className="font-mono font-bold">/cookie-based</code>
      <div>
        <h1 className="text-lg">Layout</h1>
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
      <p className="text-md text-blue-300">{t("helloMessage")}</p>
      <div className="p-10">{props.children}</div>
    </div>
  );
}
