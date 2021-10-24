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
    // avoid empty new lines
    if (line.length === 0) {
      return;
    }
    const page = line.split(' ')[0];

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

exports.totalUniquePageViews = function(log, order) {
  if (!isValidSortOrder(order)) {
    throw new Error('Invalid sort order detected. Please specify either `asc`, `desc`, or undefined sort order.');
  }

  const pages = [];
  const ipTracker = [];
  const lines = log.split('\n');
  lines.forEach(line => {
    // avoid empty new lines
    if (line.length === 0) {
      return;
    }
    const [page, ip] = line.split(' ');

    const pageIndex = pages.findIndex(p => p.name === page);
    if (pageIndex === -1) {
      // page has not been seen yet
      pages.push({ name: page, views: 1 });
      ipTracker.push({ name: page, ips: [ip] });
    } else {
      // page has been seen
      const ipTrackedPageIndex = ipTracker.findIndex(p => p.name === page)
      const ipTrackedPage = ipTracker[ipTrackedPageIndex];
      if (ipTrackedPage.ips.indexOf(ip) === -1) {
        // ip has not been seen, unique visit.
        pages[pageIndex].views++;
        ipTrackedPage.ips.push(ip);
      }
    }
  });

  if (order !== undefined) {
    sortPagesByViewCount(pages, order);
  }

  return { pages, order };
};
