/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  name: string;
  description: string;
  badge?: string;
}

export interface ServiceCategory {
  title: string;
  color: string;
  borderColor: string;
  textColor: string;
  iconName: string;
  items: ServiceItem[];
}

export interface PricingPlan {
  name: string;
  price: string;
  pricingPeriod: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface ClientReview {
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
  stars: number;
  comment: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export type PageName = 
  | 'home' 
  | 'about' 
  | 'portfolio' 
  | 'case-studies' 
  | 'blog' 
  | 'web-development' 
  | 'web-design' 
  | 'wordpress' 
  | 'ui-ux' 
  | 'contact';
