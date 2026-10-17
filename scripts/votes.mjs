// Reads each skill's 👍 count from GitHub Discussions. giscus keeps one thread per skill, titled
// "skills/<slug>", in the category set in gallery/src/templates.mjs (GISCUS). Needs a token that can read
// discussions (GITHUB_TOKEN in Actions). Without one it returns {} and the gallery keeps its curated order.
// Usage: GITHUB_TOKEN=$(gh auth token) node scripts/votes.mjs
const QUERY = `query($owner: String!, $name: String!, $category: ID!, $after: String) {
  repository(owner: $owner, name: $name) {
    discussions(first: 100, after: $after, categoryId: $category) {
      pageInfo { hasNextPage endCursor }
      nodes { title reactions(content: THUMBS_UP) { totalCount } }
    }
  }
}`;

export async function fetchVotes({ repo, categoryId }, token = process.env.GITHUB_TOKEN) {
  if (!token) return {};
  const [owner, name] = repo.split('/');
  const votes = {};
  for (let after = null, more = true; more;) {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'tastefolio-build' },
      body: JSON.stringify({ query: QUERY, variables: { owner, name, category: categoryId, after } }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || `GitHub API answered ${res.status}`);
    const page = json.data.repository.discussions;
    for (const d of page.nodes) {
      const slug = d.title.match(/^skills\/([a-z0-9-]+)$/)?.[1];
      if (slug) votes[slug] = (votes[slug] || 0) + d.reactions.totalCount;
    }
    ({ hasNextPage: more, endCursor: after } = page.pageInfo);
  }
  return votes;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { GISCUS } = await import('../gallery/src/templates.mjs');
  if (!process.env.GITHUB_TOKEN) console.warn('! GITHUB_TOKEN is not set, so no votes can be read');
  console.log(JSON.stringify(await fetchVotes(GISCUS), null, 2));
}
