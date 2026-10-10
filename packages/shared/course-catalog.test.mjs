import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const sharedDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(sharedDir, '../..');
const catalog = JSON.parse(readFileSync(resolve(sharedDir, 'course-catalog.json'), 'utf8'));

test('published course catalog is a non-empty list with unique IDs', () => {
  assert.ok(Array.isArray(catalog) && catalog.length > 0, 'catalog must contain courses');
  const ids = catalog.map((course) => course.id);
  assert.equal(new Set(ids).size, ids.length, 'course IDs must be unique');
});

test('every course has usable bilingual public copy and an existing local image', () => {
  for (const course of catalog) {
    assert.match(course.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(course.title.trim(), `${course.id} needs a title`);
    assert.ok(course.category.trim(), `${course.id} needs a category`);
    assert.ok(course.summary.en.trim(), `${course.id} needs an English summary`);
    assert.ok(course.summary.bn.trim(), `${course.id} needs a Bengali summary`);
    assert.ok(course.image.startsWith('/assets/'), `${course.id} image must use a local public asset`);

    const imagePath = resolve(projectRoot, `.${course.image}`);
    assert.ok(imagePath.startsWith(`${projectRoot}${sep}`), `${course.id} image must stay inside the project`);
    assert.ok(existsSync(imagePath), `${course.id} image does not exist: ${course.image}`);
  }
});

test('unverified commercial details remain unpublished and detail links resolve locally', () => {
  for (const course of catalog) {
    assert.equal(course.fee, null, `${course.id} fee must stay unverified until confirmed`);
    assert.equal(course.duration, null, `${course.id} duration must stay unverified until confirmed`);

    if (course.detailPath !== null) {
      assert.ok(course.detailPath.startsWith('/') && !course.detailPath.startsWith('//'));
      const detailPath = resolve(projectRoot, `.${course.detailPath}`);
      assert.ok(detailPath.startsWith(`${projectRoot}${sep}`), `${course.id} detail path must stay inside the project`);
      assert.ok(existsSync(detailPath), `${course.id} detail page does not exist: ${course.detailPath}`);
    }
  }
});
