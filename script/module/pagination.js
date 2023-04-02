const arrowPagination = document.querySelectorAll('.pagination__arrow');

const createLi = (page, liActive) => {
  const li = document.createElement('li');
  li.className = `pagination__item ${liActive}`;
  const a = document.createElement('a');
  a.textContent = page;
  if (page === 1) {
    a.href= `/blog.html`;
  } else {
    a.href= `/blog.html?page=${page}`;
  }
  li.append(a);
  return li;
};


export const pagination = ({pages}, listPagination, page) => {
  if (page === 0) {
    page = 1;
  }

  let pageLength = page - 1;
  let counter = page + 1;

  let liActive = '';

  if (page === 1) {
    pageLength = page;
    counter =  pageLength + 2;
    arrowPagination[0].classList.remove('is-active');
  }

  if (page === pages) {
    pageLength = page - 2;
    counter =  page;
    arrowPagination[1].classList.remove('is-active');
  }

  for (pageLength;  pageLength <= counter; pageLength++) {
    console.log(pageLength);
    if (page === pageLength) {
      liActive = 'is-active';
    } else {
      liActive = '';
    }
    listPagination.append(createLi(pageLength, liActive));
  }
};
