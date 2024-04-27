import { pickTranslations } from "@acme/intl/utils";
import { namespace } from "./namespace";

// you can nest these as you please by using your own namespace convention
const intlMessages = pickTranslations(
  {
    helloMessage: {
      en: "Hello, World!",
      es: "¡Hola, Mundo!",
    },
    disclaimer: {
      en: "This is a disclaimer.",
      es: "Este es un aviso legal.",
    },
    namespace,
  } as const,
  ["en", "es"],
);

export default intlMessages;
