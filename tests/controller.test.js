const axios = require('axios');
const { getReview } = require('../controllers/index.js');

jest.mock('axios');

describe('Controller', () => {
  describe('get review', () => {
    test('should get the prodId and return the review', async () => {
      const product = 1;
      const review = {
        data: {
          prodId: 1,
          otherFields: '',
        },
      };
      axios.get.mockResolvedValue(review);
      const result = await getReview(product);
      expect(result).not.toBeNull();
      expect(result).toMatchObject({
        prodId: 1,
        otherFields: '',
      });
    });
    test('should return an error if no matching prodId', async () => {
      axios.get.mockResolvedValue({ data: {} });
      const result = await getReview(1);
      expect(result).toEqual(expect.any(Error));
    });
  });
});
