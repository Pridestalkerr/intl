"use client";

import React, { ComponentProps } from "react";
import { IntlProvider } from "use-intl/_IntlProvider";

type Props = Omit<ComponentProps<typeof IntlProvider>, "locale"> & {
  locale?: string; //TODO: template this
};

export default function IntlClientProviderImpl(props: Props) {
  if (!props.locale) {
    throw new Error(
      "Failed to determine locale in IntlClientProvider. Did you forget to pass it in?",
    );
  }

  return <IntlProvider locale={props.locale} {...props} />;
}
