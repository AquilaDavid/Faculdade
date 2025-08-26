fetch("http://localhost:3000/posts")
  .then((text) => text.json())
  .then((posts) => {
    for (let post of posts) {
      console.log(`titulo da aplicação é ${post.title}`);
    }
  })
  .catch((err) => console.log(err.message));