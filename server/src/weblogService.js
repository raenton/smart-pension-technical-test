const SORT_ORDERS = ['asc', 'desc'];

function isValidSortOrder(order) {
  if (order === undefined) {
    return true;
  } else {
    return SORT_ORDERS.indexOf(order) === -1
      ? false
      : true;
  }
}

function sortPagesByViewCount(pages, order = 'desc') {
  pages.sort((a, b) => {
    if (a.views < b.views) {
      if (order === 'asc') {
        return -1;
      } else if (order === 'desc') {
        return 1;
      }
    } else if (a.views > b.views) {
      if (order === 'asc') {
        return 1;
      } else if (order === 'desc') {
        return -1;
      }
    }
    return 0;
  });
};

exports.totalPageViews = function(log, order) {
  if (!isValidSortOrder(order)) {
    throw new Error('Invalid sort order detected. Please specify either `asc`, `desc`, or undefined sort order.');
  }

  const pages = [];
  const lines = log.split('\n');

  lines.forEach(line => {
    const parts = line.split(' ');
    const page = parts[0];

    const pageIndex = pages.findIndex(p => p.name === page);
    if (pageIndex === -1) {
      pages.push({ name: page, views: 1 });
    } else {
      pages[pageIndex].views++;
    }
  });

  if (order !== undefined) {
    sortPagesByViewCount(pages, order);
  }

  return { pages, order };
};

exports.totalUniquePageViews = function(log, order = 'desc') {
  
};