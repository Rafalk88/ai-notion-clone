export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    github: string;
  };
};

export type User = {
  firstName: string;
  lastName: string;
  fullname: string;
  email: string;
  image: string;
};