import { Octokit } from '@octokit/rest';

export function cli(args) {
  console.log('args', args);

  const octokit = new Octokit();

  const owner = 'reactjs';
  const repo = 'reactjs.org';

  octokit.pulls
    .list({
      owner,
      repo,
      state: 'open',
    })
    .then(({ data }) => {
      console.log('data.length', data.length);
      return octokit.pulls.get({
        owner,
        repo,
        pull_number: 3181,
      });
    })
    .then(({ data }) => {
      const { number, title, user } = data;
      const str = `- [${number}] ${title} @${user.login}`;
      console.log(str);
    });
}
