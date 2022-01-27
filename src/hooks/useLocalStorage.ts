import { useState } from "react";
import * as E from "fp-ts/Either";
import { pipe, flow } from "fp-ts/function";

function getKeyValue<T>(key: string) {
  return pipe(
    E.tryCatch(
      () => window.localStorage.getItem(key),
      () => new Error("Failed to get localStorage item")
    ),
    E.chain(
      flow(
        E.fromNullable(new Error("Empty localStorage value")),
        E.chain((value) =>
          E.tryCatch(
            () => JSON.parse(value) as unknown as T,
            () => new Error("Failed to parse localStorage item")
          )
        )
      )
    )
  );
}

type InitialValue<T> = T | (() => T);

export default function useLocalStorage<T>(
  key: string,
  initialValue: InitialValue<T>
) {
  const [storedValue, setStoredValue] = useState<T>(
    pipe(
      getKeyValue<T>(key),
      E.getOrElse(() =>
        initialValue instanceof Function ? initialValue() : initialValue
      )
    )
  );

  const setValue = (value: T | ((prevValue: T) => T)) => {
    return pipe(
      E.tryCatch(
        () => {
          const valueToStore =
            value instanceof Function ? value(storedValue) : value;

          setStoredValue(valueToStore);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        },
        () => new Error("Failed to save item")
      )
    );
  };

  return [storedValue, setValue] as const;
}
