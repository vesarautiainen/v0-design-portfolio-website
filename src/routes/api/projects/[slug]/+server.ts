
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import projects from '$lib/data/projects.json';

export const GET: RequestHandler = async ({ params }) => {
	const project = projects.find(p => p.slug === params.slug);

	if (!project) {
		return json({ error: 'Project not found' }, { status: 404 });
	}

	const index = projects.findIndex(p => p.slug === params.slug);

	return json({
		...project,
		prev_project: index > 0 ? { title: projects[index - 1].title, slug: projects[index - 1].slug } : null,
		next_project: index < projects.length - 1 ? { title: projects[index + 1].title, slug: projects[index + 1].slug } : null
	});
};
