export type EditorialProps = {
  editorialId: string,
  editorial: {
    id: string,
    kind: string,
    subtitle: string,
    title: string,
    postId: string,
  },
  isLoggedIn: boolean,
  isPostLoved: boolean,
  postPath?: string,
  size?: string,
  dpi: string,
  sources: any,
}

