import { ReactElement, ReactNodeArray } from "react";
import {
  createTranslator,
  Formats,
  TranslationValues,
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
  RichTranslationValues,
  MarkupTranslationValues,
  AbstractIntlMessages,
} from "use-intl/core";
import { getConfigImpl } from "./getConfig";
import { getMessageFormatCacheImpl } from "./getMessageFormatCache";

export const getTranslationsImpl: GetTranslationsImpl = <
  T extends AbstractIntlMessages,
  L extends string,
>(
  getConfig: ReturnType<typeof getConfigImpl<L, T>>,
  getMessageFormatCache: typeof getMessageFormatCacheImpl,
) => {
  return async <NestedKey extends NamespaceKeys<T, NestedKeyOf<T>> = never>(
    namespaceOrOpts?: NestedKey | { locale: L; namespace?: NestedKey },
  ) => {
    let namespace: NestedKey | undefined;
    let locale: L | undefined;

    if (typeof namespaceOrOpts === "string") {
      namespace = namespaceOrOpts;
    } else if (namespaceOrOpts) {
      locale = namespaceOrOpts.locale;
      namespace = namespaceOrOpts.namespace;
    }

    const config = await getConfig(locale ? { locale } : undefined);

    return createTranslator({
      ...config,
      messageFormatCache: getMessageFormatCache(),
      namespace,
      messages: config.messages,
    });
  };
};

type GetTranslationsImpl = {
  <T extends AbstractIntlMessages, L extends string>(
    getConfig: ReturnType<typeof getConfigImpl<L, T>>,
    getMessageFormatCache: typeof getMessageFormatCacheImpl,
  ): {
    <NestedKey extends NamespaceKeys<T, NestedKeyOf<T>> = never>(
      namespace?: NestedKey,
    ): Promise<{
      // Default invocation
      <
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: [TargetKey] extends [never] ? string : TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>,
      ): string;

      // `rich`
      rich<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: [TargetKey] extends [never] ? string : TargetKey,
        values?: RichTranslationValues,
        formats?: Partial<Formats>,
      ): string | ReactElement | ReactNodeArray;

      // `markup`
      markup<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: [TargetKey] extends [never] ? string : TargetKey,
        values?: MarkupTranslationValues,
        formats?: Partial<Formats>,
      ): string;

      // `raw`
      raw<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: [TargetKey] extends [never] ? string : TargetKey,
      ): any;
    }>;
    <NestedKey extends NamespaceKeys<T, NestedKeyOf<T>> = never>(opts?: {
      locale: L;
      namespace?: NestedKey;
    }): Promise<{
      // Default invocation
      <
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>,
      ): string;

      // `rich`
      rich<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: TargetKey,
        values?: RichTranslationValues,
        formats?: Partial<Formats>,
      ): string | ReactElement | ReactNodeArray;

      // `markup`
      markup<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: TargetKey,
        values?: MarkupTranslationValues,
        formats?: Partial<Formats>,
      ): string;

      // `raw`
      raw<
        TargetKey extends MessageKeys<
          NestedValueOf<
            { "!": T },
            [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
          >,
          NestedKeyOf<
            NestedValueOf<
              { "!": T },
              [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
            >
          >
        >,
      >(
        key: TargetKey,
      ): any;
    }>;
  };
};
