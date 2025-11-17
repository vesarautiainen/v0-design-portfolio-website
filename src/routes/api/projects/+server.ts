import type { RequestHandler } from '@sveltejs/kit';

// Mock data - replace with database calls later
const projects = [
	{
		id: 1,
		slug: 'ecommerce-redesign',
		title: 'E-Commerce Platform Redesign',
		category: 'Web Design',
		description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
		thumbnail: '/ecommerce-website-design.png',
		featured_image: '/ecommerce-website-redesign.png',
		year: 2024,
		role: 'Lead Designer',
		client: 'TechShop Inc.',
		content: 'This project involved a complete redesign of the e-commerce platform, with focus on user experience, accessibility, and conversion optimization. We conducted extensive user research, created interactive prototypes, and tested multiple design iterations.',
		images: [
			'/website-product-page.png',
			'/checkout-page.png',
			'/user-dashboard-interface.jpg'
		]
	},
	{
		id: 2,
		slug: 'mobile-app-design',
		title: 'Fitness Tracking Mobile App',
		category: 'Mobile Design',
		description: 'Design of a comprehensive fitness tracking application with social features and personalized recommendations.',
		thumbnail: '/mobile-app-fitness-design.jpg',
		featured_image: '/fitness-app-interface.png',
		year: 2024,
		role: 'UX/UI Designer',
		client: 'FitLife Co.',
		content: 'A mobile-first design approach to create an intuitive fitness tracking app. The design prioritizes user engagement through personalized content, social sharing, and gamification elements.',
		images: [
			'/mobile-app-interface.png',
			'/fitness-tracking-app-screen.jpg',
			'/mobile-app-notification-design.jpg'
		]
	},
	{
		id: 3,
		slug: 'brand-identity',
		title: 'Tech Startup Brand Identity',
		category: 'Branding',
		description: 'Complete brand identity system including logo, color palette, typography, and brand guidelines.',
		thumbnail: '/logo-and-branding-design.jpg',
		featured_image: '/brand-identity-system.png',
		year: 2023,
		role: 'Brand Designer',
		client: 'InnovateTech Startup',
		content: 'Created a comprehensive brand identity system for a tech startup. This included logo design, color palette development, typography selection, and detailed brand guidelines.',
		images: [
			'/brand-guidelines-document.jpg',
			'/logo-variations.jpg',
			'/brand-color-system.jpg'
		]
	},
	{
		id: 4,
		slug: 'saas-dashboard',
		title: 'SaaS Analytics Dashboard',
		category: 'Web Design',
		description: 'Design of a complex analytics dashboard for data visualization and business intelligence.',
		thumbnail: '/analytics-dashboard-design.jpg',
		featured_image: '/modern-saas-dashboard.png',
		year: 2023,
		role: 'Product Designer',
		client: 'DataViz Pro',
		content: 'Designed an intuitive analytics dashboard that makes complex data accessible and actionable for business users. Focus on data visualization, usability, and performance.',
		images: [
			'/data-dashboard-charts.jpg',
			'/analytics-interface-design.jpg',
			'/reporting-dashboard.png'
		]
	}
];

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
