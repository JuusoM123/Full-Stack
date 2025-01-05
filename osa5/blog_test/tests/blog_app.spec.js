const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });

    await page.goto('');
  });

  test('Login form is shown', async ({ page }) => {
    const usernameInput = await page.getByTestId('username');
    const passwordInput = await page.getByTestId('password');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen');
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
      });
  
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong');
  
        const errorDiv = await page.locator('.error');
        await expect(errorDiv).toContainText('wrong credentials');
      });
    });
  
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen');
      });
  
      test('a new blog can be created', async ({ page }) => {
        await page.getByText('create new blog').click();
        await page.getByPlaceholder('title').fill('Test Blog');
        await page.getByPlaceholder('author').fill('Author Name');
        await page.getByPlaceholder('url').fill('http://example.com');
        await page.getByText('save').click();
  
        const blog = await page.getByText('Test Blog Author Name');
        await expect(blog).toBeVisible();
      });
  
      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'Blog to Like', 'Author', 'http://like.com');
  
        await page.getByText('view').click();
        const likeButton = page.getByText('like');
        await likeButton.click();
  
        const likes = await page.locator('.likes').first();
        await expect(likes).toContainText('1');
      });
  
      test('a blog can be deleted by its creator', async ({ page }) => {
        await createBlog(page, 'Blog to Delete', 'Author', 'http://delete.com');
  
        await page.getByText('view').click();
        const deleteButton = page.getByText('remove');
        await page.on('dialog', (dialog) => dialog.accept());
        await deleteButton.click();
  
        const blog = page.getByText('Blog to Delete');
        await expect(blog).not.toBeVisible();
      });
  
      test('only the creator sees the delete button', async ({ page, request }) => {
        await createBlog(page, 'Creator Blog', 'Author', 'http://creator.com');
  
        await request.post('/api/users', {
          data: {
            name: 'Another User',
            username: 'another',
            password: 'password',
          },
        });
        await loginWith(page, 'another', 'password');
        await page.goto('');
  
        await page.getByText('view').click();
        const deleteButton = page.getByText('remove');
        await expect(deleteButton).not.toBeVisible();
      });
  
      test('blogs are ordered by likes', async ({ page }) => {
        await createBlog(page, 'Blog 1', 'Author', 'http://1.com', 2);
        await createBlog(page, 'Blog 2', 'Author', 'http://2.com', 5);
        await createBlog(page, 'Blog 3', 'Author', 'http://3.com', 1);
  
        const blogs = await page.locator('.blog');
        const firstBlog = await blogs.nth(0).textContent();
        const secondBlog = await blogs.nth(1).textContent();
        const thirdBlog = await blogs.nth(2).textContent();
  
        expect(firstBlog).toContain('Blog 2');
        expect(secondBlog).toContain('Blog 1');
        expect(thirdBlog).toContain('Blog 3');
      });
    });
  });
  
