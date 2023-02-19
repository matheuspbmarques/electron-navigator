import React, {
    PropsWithChildren,
    Children,
    useState,
    ReactElement
} from 'react';

export type NavigateProps = (screen: string, params: object) => void;

type StacksProps = {
    initialScreen?: string
};
const Stacks = ({ children, initialScreen }: PropsWithChildren<StacksProps>): any => {
    const [screen, setScreen] = useState(initialScreen);
    const [params, setParams] = useState<object | undefined>();

    const navigate = (screen?: string, params?: object) => {
        setScreen(screen);
        setParams(params);
    };

    if(Children.count(children) <= 1){
        return React.cloneElement(children as any, { navigate: navigate, params: params })
    }else if(!screen){
        return React.cloneElement(Children.toArray(children)[0] as any, { navigate: navigate, params: params })
    };

    return Children.map(children as ReactElement, (child:ReactElement) => {
        if(child.props.nameScreen == screen){
            return React.cloneElement(child, { navigate: navigate, params: params });
        };
    });
};

type StackProps = {
    nameScreen: string,
    screen: ReactElement,
    navigate?: undefined,
    params?: undefined
};
const Stack = ({ nameScreen, screen, navigate, params }: StackProps ): JSX.Element => {
    return React.cloneElement(screen, { navigate: navigate, params: params });
};

export { Stacks, Stack };