const requests = {
  fetchTrending: `/meta/anilist/trending`,
  fetchPopular: `/meta/anilist/popular?page={page}&perPage={perPage}`,
  fetchRecent: `/meta/anilist/recent-episodes`,
  fetchRandom: `/meta/anilist/random-anime`,
};

export default requests;
