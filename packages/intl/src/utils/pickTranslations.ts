// maintainer note: make sure this only runs only once, there's no need to recompute on every request

type TranslationKeys = string;

type Translations<T extends string> = {
  [key in T]: string;
};

type TranslatedObject<K extends TranslationKeys> = {
  [key: string]: Translations<K> | TranslatedObject<K>;
};

type IsTranslations<T, K extends TranslationKeys> = K extends keyof T
  ? T
  : never;

type PickTranslations<T, K extends TranslationKeys> = {
  [P in keyof T]: IsTranslations<T[P], K> extends never
    ? PickTranslations<T[P], K>
    : T[P] extends Record<TranslationKeys, infer R>
      ? T[P][K]
      : never;
};

export function pickTranslations<
  K extends TranslationKeys,
  T extends TranslatedObject<K>,
>(
  obj: T,
  keys: K[],
): {
  [k in K]: PickTranslations<T, k>;
} {
  // The processNode function recursively processes each node and applies the correct type
  function processNode(node: TranslatedObject<K> | Translations<K>): any {
    if (keys.every((key) => key in node)) {
      // Node is a Translations object
      return node;
    } else {
      // Node is a NestedTranslatedObject, recurse further
      const result: any = keys.reduce(
        (acc, key) => {
          acc[key] = {};
          return acc;
        },
        {} as Record<K, any>,
      );

      for (const key in node) {
        const value = processNode(
          node[key as keyof typeof node] as TranslatedObject<K>,
        );
        for (const k of keys) {
          result[k][key] = value[k];
        }
      }
      return result;
    }
  }

  return processNode(obj);
}

// // Example usage with const assertion to maintain the structure
// const tl = {
//   translatedButton: { en: "click", es: "translated click", ro: "apasa" },
//   nested: {
//     translatedButton: { en: "click", es: "translated click", ro: "apasa" },
//     nested2: {
//       translatedButton: { en: "click", es: "translated click", ro: "apasa" },
//     },
//   },
// } as const satisfies TranslatedObject<"en" | "es" | "ro">;

// const res = pickTranslations(tl, ["en", "ro", "es"]);
// console.log(res);
// console.log(res.ro.nested.nested2.translatedButton);
