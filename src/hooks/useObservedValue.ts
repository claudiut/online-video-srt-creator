import { useEffect, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";

const useObservedValue = <T>(observable$: Observable<T>): T|undefined => {
  const initialValue = observable$ instanceof BehaviorSubject
    ? observable$.getValue()
    : undefined;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable$.subscribe(setValue);
    return () => {
      subscription.unsubscribe()
    };
  }, [observable$])

  return value;
};

export default useObservedValue;
