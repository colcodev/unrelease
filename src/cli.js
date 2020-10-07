import { Octokit } from '@octokit/rest';
import MarkdownIt from 'markdown-it';
import fs from 'fs';

export async function cli(args) {
  console.log('args', args);

  const unreleasedMd = await fs.promises.readFile('UNRELEASED.md', 'utf8');
  console.log('cli -> unreleasedMd', unreleasedMd);

  const md = new MarkdownIt();
  const result = md.parse(unreleasedMd);
  console.log('cli -> result', result);

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
