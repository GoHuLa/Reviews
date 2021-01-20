/* eslint-disable react/jsx-filename-extension */
/**
 * @test-environment jsdom
 */
import 'jsdom-global/register';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Products from '../../src/components/Products';
import Reviews from '../../src/components/Reviews';
import Review from '../../src/components/Review';

const Controller = require('../../controllers');

describe('<Products />', () => {
  let controllerSpy;
  beforeEach(() => {
    controllerSpy = jest.spyOn(Controller, 'getAll');
    controllerSpy.mockResolvedValue([{ prodId: '1' }, { prodId: '2' }]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('creates buttons for each prodId returned in getAll', async () => {
    const { findAllByRole } = render(<Products change={jest.fn()} />);
    await waitFor(() => expect(controllerSpy).toHaveBeenCalled());
    const buttons = await findAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
  test('clicking a button calls the passed in function with the argument as the button\'s prodId', async () => {
    const mockClick = jest.fn();
    const { findByText } = render(<Products change={mockClick} />);
    const btnOne = await findByText('1');
    const btnTwo = await findByText('2');
    userEvent.click(btnOne);
    userEvent.click(btnTwo);
    expect(mockClick.mock.calls).toEqual([['1'], ['2']]);
  });
});

describe('<Review />', () => {
  let mockReview;
  beforeAll(() => {
    mockReview = {
      author: {
        name: 'Jon',
      },
      rating: 5,
      purchased: false,
      body: 'Great product!',
      photo: 'sampleWebpage.com/100.jpg',
    };
  });

  test('creates a review from the author name, rating, purchased, and body', () => {
    const { queryByRole, getByText } = render(<Review review={mockReview} />);
    expect(queryByRole('heading')).toBeTruthy();
    expect(getByText('Jon')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('Great product!')).toBeTruthy();
    expect(queryByRole('img')).toBeTruthy();
  });
});

describe('<Reviews />', () => {
  let controllerSpy;
  let mockReview;
  beforeEach(() => {
    controllerSpy = jest.spyOn(Controller, 'getReview');
    mockReview = {
      author: {
        name: 'Jon',
      },
      rating: 5,
      purchased: false,
      body: 'Great product!',
      photo: 'sampleWebpage.com/100.jpg',
    };
    controllerSpy.mockResolvedValue([
      { ...mockReview, _id: 1, prodId: '1' },
      { ...mockReview, _id: 2, prodId: '1' }]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('calls Contoller.getReview on initialization', async () => {
    render(<Reviews prodId="1" />);
    await waitFor(() => expect(controllerSpy).toHaveBeenCalled());
  });
  test('renders a review for each product returned by Controller.getReview', async () => {
    const { findAllByText } = render(<Reviews prodId="1" />);
    const reviews = await findAllByText('Jon');
    expect(reviews).toHaveLength(2);
  });
});
