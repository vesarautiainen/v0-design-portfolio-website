import type { RequestHandler } from '@sveltejs/kit';

import projects from '$lib/data/projects.json';

export const GET: RequestHandler = async ({ params }) => {
	if (params.slug) {
		// Get single project
		const project = projects.find(p => p.slug === params.slug);
		if (!project) {
			return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
		}

		// Add navigation
		const index = projects.findIndex(p => p.slug === params.slug);
		const response = {
			...project,
			prev_project: index > 0 ? { title: projects[index - 1].title, slug: projects[index - 1].slug } : null,
			next_project: index < projects.length - 1 ? { title: projects[index + 1].title, slug: projects[index + 1].slug } : null
		};

		return new Response(JSON.stringify(response));
	}

	// Get all projects
	return new Response(JSON.stringify(projects));
};
