import { watchFile } from 'fs';
import { spawn } from 'node:child_process';

runDockerProcess();
export default function runDockerProcess() {
	spawn('pnpm install', { shell: true, stdio: 'inherit' }).addListener('exit', async (e) => {
		if (e !== 0) throw Error('There was an error trying to install dependencies');

		watchFile('./package.json', () => {
			spawn('pnpm install', { shell: true, stdio: 'inherit' });
		});

		spawn('pnpm dev', { shell: true, stdio: 'inherit' });
	});
}
