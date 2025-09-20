export interface AdminUser {
  username: string;
  password: string;
}

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
}

export interface AmazingWorkImage {
  id: string;
  src: string;
  alt: string;
  className: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface AdminData {
  heroImages: HeroImage[];
  portfolioImages: {
    weddings: PortfolioImage[];
    homecoming: PortfolioImage[];
    casualShoots: PortfolioImage[];
    engagements: PortfolioImage[];
    cinematography: PortfolioImage[];
    thanksCards: PortfolioImage[];
  };
  amazingWorkImages: {
    fineArt: AmazingWorkImage[];
    artistic: AmazingWorkImage[];
    vintage: AmazingWorkImage[];
  };
  testimonials: Testimonial[];
}