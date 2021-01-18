/* eslint-disable react/jsx-filename-extension */
/**
 * @test-environment jsdom
 */
import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import App from '../../src/components/App';
import Products from '../../src/components/Products';
import Reviews from '../../src/components/Reviews';
import Review from '../../src/components/Review';

const Adapter = require('enzyme-adapter-react-16');
const Controller = require('../../controllers/index.js');

enzyme.configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('../../controllers/index.js');
const setStateMock = jest.fn();
useStateMock.mockImplementation((init) => [init, setStateMock]);

afterEach(() => {
  jest.clearAllMocks();
});

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test('has a <NewReview /> component', () => {
    expect(wrapper.find('NewReview')).toHaveLength(1);
  });
  test('has a "prodId" key on state', () => {
    expect(useStateMock).toHaveBeenCalled();
    expect(useStateMock).toHaveBeenCalledWith('0');
  });
  test('has a <Reviews /> component that receives a prodId', () => {
    expect(wrapper.find('Reviews')).toHaveLength(1);
  });
});

describe('<Products />', () => {
  let wrap;
  beforeEach(() => {
    const myMock = jest.fn();
    Controller.getAll.mockResolvedValue([{ prodId: '1' }, { prodId: '2' }, { prodId: '3' }]);
    wrap = mount(<Products change={myMock.mockName} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('initializes with an empty array, then calls getAll from the controller', () => {
    expect(useStateMock).toHaveBeenCalledWith([]);
    expect(setStateMock).toHaveBeenCalledWith([{ prodId: '1' }, { prodId: '2' }, { prodId: '3' }]);
  });
  test('fills in with products', () => {
    // Controller.getAll.mockResolvedValue([{ prodId: '1' }, { prodId: '2' }, { prodId: '3' }]);
    console.log(wrap.debug());
    expect(wrap.find('button')).toHaveLength(3);
  });
  test('clicking on a product triggers a change with the product ID', () => {
    const button = wrap.find('button').at(0);
    button.invoke('onClick');
    expect(setStateMock).toHaveBeenCalledWith(button.text());
  });
});

describe('<Reviews />', () => {
  let wrapper;
  let twoFakes;
  beforeEach(() => {
    twoFakes = [{ body: '1' }, { body: '2' }];
    Controller.getReview.mockResolvedValue(twoFakes);
    wrapper = mount(<Reviews prodId="1" />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('has a "prodId" prop', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.props()).toHaveProperty('prodId');
    expect(wrapper.props().prodId).toEqual('1');
  });
  test('has a "reviews" state that initializes to an empty array', () => {
    expect(useStateMock).toHaveBeenCalledWith([]);
  });
  test('sets "reviews" to reviews from DB on mount', async () => {
    expect(Controller.getReview).toHaveBeenCalled();
    expect(useStateMock).toHaveBeenNthCalledWith(1, []);
    // await act(async () => {
    //   await flushPromises();
    // });
    expect(setStateMock).toHaveBeenNthCalledWith(1, twoFakes);
  });
});

describe('individual <Review />', () => {
  test('destructures the review into the body, author, rating, purchase status, and any photos', () => {
    const review = {
      author: {
        name: 'Jon',
        photoId: '',
      },
      rating: 5,
      purchased: false,
      body: 'Great product',
      photo: 'something.jpg',
      prodId: '1',
    };
    const wrap = shallow(<Review review={review} />);
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('div')).toHaveLength(5);
    expect(wrap.find('.body').text()).toEqual('Great product');
  });
});
