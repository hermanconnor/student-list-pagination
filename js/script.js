'use strict';

const STUDENTS_PER_PAGE = 9;

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
        <time class="date" datetime="${new Date(
          student.registered.date,
        ).toISOString()}">
          Joined ${new Date(student.registered.date).toLocaleDateString()}
        </time>
      </div>
    </li>`;
  }

  // Initial render
  renderStudents(currentPage);
};

document.addEventListener('DOMContentLoaded', initApp);
