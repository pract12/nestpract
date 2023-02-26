import axios, * as others from 'axios';
import * as fs from 'fs';

// API endpoint URLs
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

async function fetchAndStoreData() {
  try {
    const [posts, comments] = await Promise.all([
      fetchData(postsUrl),
      fetchData(commentsUrl),
    ]);

    const data = posts.map((post) => ({
      title: post.title,
      body: post.body,
      comments: comments
        .filter((comment) => comment.postId === post.id)
        .map((comment) => ({
          name: comment.name,
          body: comment.body,
        })),
    }));

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    console.log('Data stored successfully!');
  } catch (err) {
    console.error('Error while fetching or storing data:', err.message);
  }
}

fetchAndStoreData();
