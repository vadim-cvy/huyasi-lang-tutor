type BareButtonLink = {
  type: 'plainLink';
  url: string;
};

type RouterButtonLink = {
  type: 'routerLink';
  url: string;
  /**
   * Indicates whether button should be treated as active, which affects styling,
   * when the current route matches the link URL (Uniform Resource Locator).
   */
  isRouterLinkActiveSync?: boolean;
};

export type ButtonLink = BareButtonLink | RouterButtonLink;
