const React = require('react');
const { Children, useState } = require('react');

const Stacks = ({ children, initialScreen }) => {
    const [screen, setScreen] = useState(initialScreen);
    const [params, setParams] = useState();

    const navigate = (screen, params) => {
        setScreen(screen);
        setParams(params);
    };

    if(Children.count(children) <= 1){
        return React.cloneElement(children, { navigate: navigate, params: params })
    }else if(!screen){
        return React.cloneElement(Children.toArray(children)[0], { navigate: navigate, params: params })
    };

    return Children.map(children, (child) => {
        if(child.props.nameScreen == screen){
            return React.cloneElement(child, { navigate: navigate, params: params });
        };
    });
};

const Stack = ({ nameScreen, screen, navigate, params }) => {
    return React.cloneElement(screen, { navigate: navigate, params: params });
};

module.exposts = { Stacks, Stack };