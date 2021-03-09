import { ReactNode } from 'react';
import { Observable } from 'rxjs';

import useObservedValue from './hooks/useObservedValue';

interface Props<T> {
    observable$: Observable<T>;
    children: (value: T|undefined) => ReactNode;
}

const Subscribe = <T,>({ observable$, children }: Props<T>) => {
    const value = useObservedValue<T>(observable$);
    // Fragment usage here is a fix for "'ReactNode' is not a valid JSX element",
    // currently don't hnow to fix this type issue
    return <>{children(value)}</>;
}

export default Subscribe;
