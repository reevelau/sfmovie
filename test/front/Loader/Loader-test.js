import React from 'react';
import Loader from '../../../assets/components/Loader/Loader';
import renderer from 'react-test-renderer';


test('Normal', () => {

    const component = renderer.create(
        <Loader loadingMessage="We need few seconds to be well prepared." />
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});