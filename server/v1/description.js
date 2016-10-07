module.exports = {
  summary: 'This is v1 of the API. Use this JSON object to help you navigate',
  routes: {
    articles: {
      summary: 'API route to fetch, update, and delete articles. Use the article ID as a parameter for specific articles (ie /v1/articles/5)',
      GET: 'Retrives the article that matches the corresponding ID. Fetches all availble articles if not specified',
      PUT: 'Edits an article based on the properites in the body being passed in.',
      DELETE: 'Deletes the article that corresponds to the ID.',
    },
  },
};
