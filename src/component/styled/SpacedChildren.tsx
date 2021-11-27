import styled from 'styled-components'

interface Props {
    spacing?: number;
}

export default styled.div`
    > * {
        margin-right: ${(props: Props) => props.spacing || '0.5em'}
    }
`;