import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

octokit.pulls
  .list({
    owner: 'reactjs',
    repo: 'reactjs.org',
    state: 'open',
  })
  .then(({ data }) => {
    console.log('data', data);
  });

export function cli(args) {
  console.log('cli -> args', args);
}
