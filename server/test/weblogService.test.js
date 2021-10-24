const assert = require('assert');
const dedent = require('dedent-js');
const weblogService = require('../src/weblogService');

describe('weblogService', function() {
  describe('#totalPageViews', function() {
    it('returns an unsorted array of unique pages with view counts', function() {
      const testData = dedent
      `/home 316.433.849.805
      /home 543.910.244.929
      /contact 061.945.150.735
      /about 336.284.013.698
      /about 336.284.013.698`;
      
      const result = weblogService.totalPageViews(testData);
      assert.deepEqual(result.pages, [
        {
          name: '/home',
          views: 2
        },
        {
          name: '/contact',
          views: 1
        },
        {
          name: '/about',
          views: 2
        }
      ]);
    });

    it('returns pages sorted in ascending order by view count', function() {
      const testData = dedent
      `/home 316.433.849.805
      /home 543.910.244.929
      /home 543.910.244.929
      /about 336.284.013.698
      /about 336.284.013.698
      /contact 061.945.150.735`;
      
      const result = weblogService.totalPageViews(testData, 'asc');
      assert.deepEqual(result.pages, [
        {
          name: '/contact',
          views: 1
        },
        {
          name: '/about',
          views: 2
        },
        {
          name: '/home',
          views: 3
        }
      ]);
    });

    it('returns pages sorted in descending order by view count', function() {
      const testData = dedent
      `/home 316.433.849.805
      /home 543.910.244.929
      /home 543.910.244.929
      /about 336.284.013.698
      /about 336.284.013.698
      /contact 061.945.150.735`;
      
      const result = weblogService.totalPageViews(testData, 'desc');
      assert.deepEqual(result.pages, [
        {
          name: '/home',
          views: 3
        },
        {
          name: '/about',
          views: 2
        },
        {
          name: '/contact',
          views: 1
        },
      ]);
    });

    it('Throws an error when an invalid sort order params are provided', function() {
      assert.throws(() => {
        weblogService.totalPageViews('', '1234456789');
      }, {
        name: 'Error',
        message: 'Invalid sort order detected. Please specify either `asc`, `desc`, or undefined sort order.'
      });

      assert.throws(() => {
        weblogService.totalPageViews('', 'ASC'); // not 'asc'
      }, {
        name: 'Error',
        message: 'Invalid sort order detected. Please specify either `asc`, `desc`, or undefined sort order.'
      });

      assert.throws(() => {
        weblogService.totalPageViews('', 'DESC'); // not 'desc'
      }, {
        name: 'Error',
        message: 'Invalid sort order detected. Please specify either `asc`, `desc`, or undefined sort order.'
      });
    });

  });

  describe('#totalUniquePageViews', function() {
    it('returns a list of unique pages', function() {
      assert(false);
    });

    it('returns unique view counts for pages', function() {
      assert(false);
    });

    it('returns pages sorted in ascending order by unique view count', function() {
      assert(false);
    });

    it('returns pages sorted in descending order by unique view count', function() {
      assert(false);
    });
  });
});
