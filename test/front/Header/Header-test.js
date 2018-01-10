import React from 'react';
import Header from '../../../assets/components/Header/Header';
import renderer from 'react-test-renderer';


test('Normal', () => {

    const component = renderer.create(
        <Header />
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});