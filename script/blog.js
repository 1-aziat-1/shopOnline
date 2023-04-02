import './module/pagination.js';
import { pagination } from './module/pagination.js';

const list = document.querySelector('.list');
const listPagination = document.querySelector('.pagination__list');
const paginationBlock = document.querySelector('.pagination');
let page = +(new  URLSearchParams(window.location.search).get('page'));

if (page === 0) {
  page = 1;
}

const loadItems = async (page = 1) => {
  const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const data = await request.json();
  return data;
};

const createPost = ({
  id,
  title
}) => {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <img class="item__img" src="./img/jpg/112233.jpg" alt="картинка карточки">
    <div class="item__container">
      <div class="item__content">
        <p class="item__content-title"><a href="article.html?id=${id}">${title}</a></p>
        <p class="item__content-date">22 июня 2021, 12:45</p>
      </div>
      <div class="item__rating">
        <p class="item__rating-watch">1.2k</p>
        <p class="item__rating-comments">0</p>
      </div>
    </div>
  `
  return li;
};

const addPost = async () => {
  const {data:posts, meta} = await loadItems(page);
  console.log(meta);
  posts.forEach(post => {
    list.append(createPost(post));
  });
  pagination(meta.pagination, listPagination, page);
};

paginationBlock.addEventListener('click', ({target}) => {
  if ( target.closest('.pagination__arrow.left.is-active')) {
    if (page = 1) {
      window.location.href = `/blog.html`;
    } else {
      window.location.href = `/blog.html?page=${page-1}`;
    }
  }
  if ( target.closest('.pagination__arrow.right.is-active')) {
    window.location.href = `/blog.html?page=${page+1}`;
  }
});


addPost();