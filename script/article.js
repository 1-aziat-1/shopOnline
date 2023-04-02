const titleText = document.querySelector('.content__title');
const sidebarText = document.querySelectorAll('.sidebar__text>a');
const contentText = document.querySelector('.content__text>p');
const infoAuthor = document.querySelector('.info__author');


const dataPost = async () => {
  const id = new  URLSearchParams(window.location.search).get('id');
  if (id) {
    const request = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const {data} = await request.json();
    return data;
  }
};

const dataAuthor = async (id) => {
    const request = await fetch(`https://gorest.co.in/public-api/users/${id}`);
    const {data} = await request.json();
    return data;
};

const loadData = async () => {
  const {title, body, user_id: userId} = await dataPost();
  const {name} = await dataAuthor(userId);
  titleText.textContent = title;
  sidebarText[sidebarText.length-1].textContent = title;
  contentText.textContent = body;
  infoAuthor.textContent = name;
};


loadData();