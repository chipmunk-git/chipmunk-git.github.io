import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;

/** Central public-content query for routes, lists, feeds, and future search. */
export async function getPublishedContent() {
  const [allProjects, allPosts] = await Promise.all([
    getCollection('projects'),
    getCollection('blog'),
  ]);
  const projectById = new Map(allProjects.map((project) => [project.id, project]));

  for (const post of allPosts) {
    const reference = post.data.project;
    if (!reference) continue;

    const project = projectById.get(reference.id);
    if (!project) {
      throw new Error(`${post.id}: project 참조 "${reference.id}"를 찾을 수 없습니다.`);
    }
    if (!post.data.draft && project.data.draft) {
      throw new Error(`${post.id}: 공개 글에서 draft 프로젝트를 연결할 수 없습니다.`);
    }
  }

  const projects = allProjects
    .filter((project) => !project.data.draft)
    .sort((a, b) => (
      Number(b.data.featured) - Number(a.data.featured)
      || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0)
      || a.id.localeCompare(b.id)
    ));

  const posts = allPosts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));

  return { projects, posts };
}

export function postsForProject(posts: Post[], projectId: string): Post[] {
  return posts.filter((post) => post.data.project?.id === projectId);
}

export function projectForPost(projects: Project[], post: Post): Project | undefined {
  return projects.find((project) => project.id === post.data.project?.id);
}
