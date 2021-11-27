import React from "react"

export const withProps = (defaultProps: {}) => (Component: React.FunctionComponent<{}>) => (
    (props: React.PropsWithChildren<{}>) => <Component {...defaultProps} {...props} />
)