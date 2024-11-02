'use strict';

const STUDENTS_PER_PAGE = 9;

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const initApp = () => {
  let currentPage = 1;
  let filteredStudents = [...data];

  function renderStudents(page) {
    const studentList = document.querySelector('.student-list');
    studentList.innerHTML = '';

    const startIndex = (page - 1) * STUDENTS_PER_PAGE;
    const endIndex = startIndex + STUDENTS_PER_PAGE;

    const studentItemsHTML = filteredStudents
      .slice(startIndex, endIndex)
      .map(generateStudentHTML)
      .join('');

    studentList.insertAdjacentHTML('beforeend', studentItemsHTML);
  }

  function generateStudentHTML(student) {
    return `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${
          student.picture.large
        }" alt="Profile picture of ${student.name.first} ${student.name.last}">
        <h2>${student.name.first} ${student.name.last}</h2>
        <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
        <time class="date" datetime="${formatDate(student.registered.date)}">
          Joined ${formatDate(student.registered.date)}
        </time>
      </div>
    </li>`;
  }

  function renderPagination() {
    const pagination = document.querySelector('.pagination .link-list');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = `<li><button type="button" aria-label="Page ${i}">${i}</button></li>`;
      pagination.insertAdjacentHTML('beforeend', pageItem);
    }

    pagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        currentPage = parseInt(e.target.textContent);
        renderStudents(currentPage);
        updateActivePage();
      }
    });
  }

  // Function to update active page button
  function updateActivePage() {
    const buttons = document.querySelectorAll('.pagination button');

    buttons.forEach((button) => {
      button.classList.remove('active');
      if (parseInt(button.innerText) === currentPage) {
        button.classList.add('active');
      }
    });
  }

  function renderSearchBar() {
    const searchForm = `
      <label for="search" class="student-search">
        <input id="search" type="search" placeholder="Search by name...">
        <button type="button" aria-label="Search"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`;

    document
      .querySelector('.header')
      .insertAdjacentHTML('beforeend', searchForm);
  }

  // Initial render
  renderSearchBar();
  renderStudents(currentPage);
  renderPagination();
  updateActivePage();
};

document.addEventListener('DOMContentLoaded', initApp);
