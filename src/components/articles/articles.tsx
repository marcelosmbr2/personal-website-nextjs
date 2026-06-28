import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { performRequest } from "@/lib/datocms";

interface Post {
	id: string;
	name: string;
	description: string;
	category: string;
	tags: string;
	externalLink?: string;
	image: { url: string };
	_createdAt: string;
	_updatedAt: string;
}

const QUERY = `
  query {
    allPosts(first: 4, filter: {
      isPublished: { eq: true }
    }) {
      category
      description
      id
      name
      tags
      externalLink
      image {
        url
      }
      _createdAt
      _updatedAt
    }
  }
`;

export async function Articles() {
	const {
		data: { allPosts },
	} = await performRequest({ query: QUERY });

	const philosophy = allPosts.filter(
		(project: Post) => project.category === "Filosofia",
	);
	const tech = allPosts.filter(
		(project: Post) => project.category === "Tecnologia",
	);

	function formatDate(dateString: string): string {
		return format(new Date(dateString), "dd MMMM yyyy", { locale: ptBR });
	}

	function formatLink(postId: string, externalLink?: string) {
		if (externalLink) return externalLink;
		return "/articles/" + postId;
	}

	return (
		<div className="space-y-6">
			{tech.map((post: Post) => (
				<article className="group">
					<Link
						href={formatLink(post.id, post.externalLink)}
						target={post.externalLink ? "_blank" : "_self"}
						className="block"
					>
						<div className="flex gap-4">
							<div className="shrink-0">
								<Image
									className="w-40 h-40 object-cover rounded-lg bg-gray-100 dark:bg-neutral-800"
									src={post.image.url}
									alt="OKRs Guide"
									width={160}
									height={160}
								/>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-2">
									<time className="text-xs text-gray-500 dark:text-neutral-500">
										{formatDate(post._createdAt)}
									</time>
								</div>
								<h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
									{post.name}
								</h3>
								<p className="mt-1 text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
									{post.description}
								</p>
							</div>
						</div>
					</Link>
				</article>
			))}
		</div>
	);
}
