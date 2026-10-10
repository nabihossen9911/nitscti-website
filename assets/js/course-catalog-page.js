const grid = document.querySelector('#course-grid');
const search = document.querySelector('#course-search');
const status = document.querySelector('#catalog-status');
let initialHashHandled = false;

function createCourseCard(course) {
  const article = document.createElement('article');
  article.className = 'catalog-card';
  article.id = course.id;

  const image = document.createElement('img');
  image.src = course.image;
  image.alt = `${course.title} course`;
  image.loading = 'lazy';
  image.decoding = 'async';

  const content = document.createElement('div');
  content.className = 'catalog-card-content';

  const category = document.createElement('span');
  category.className = 'course-category';
  category.textContent = course.category;

  const title = document.createElement('h2');
  title.textContent = course.title;

  const summary = document.createElement('p');
  summary.textContent = course.summary.en;

  const action = document.createElement('a');
  action.className = 'course-action';
  action.href = course.detailPath ?? 'tel:+8801567818036';
  action.textContent = course.detailPath ? 'Course information' : 'Call to ask about this course';

  content.append(category, title, summary, action);
  article.append(image, content);
  return article;
}

async function loadCatalog() {
  if (!grid || !search || !status) return;

  try {
    const response = await fetch('/packages/shared/course-catalog.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const courses = await response.json();

    const render = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const filtered = courses.filter((course) =>
        `${course.title} ${course.category} ${course.summary.en} ${course.summary.bn}`
          .toLocaleLowerCase()
          .includes(query),
      );
      grid.replaceChildren(...filtered.map(createCourseCard));
      if (!initialHashHandled && location.hash) {
        initialHashHandled = true;
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'center' });
      }
      status.textContent = filtered.length
        ? `${filtered.length} course${filtered.length === 1 ? '' : 's'} listed. Contact NITSCTI to confirm fees and availability.`
        : 'No courses match that search.';
    };

    search.addEventListener('input', render);
    render();
  } catch {
    status.textContent = 'The course list could not be loaded. Please call NITSCTI for current course information.';
  }
}

loadCatalog();
