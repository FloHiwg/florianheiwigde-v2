// Blog Data
const categories = [
  {
    id: "product",
    name: "Product",
    description: "Thoughts on product management, strategy, and building things people love.",
    subcategories: [
      { id: "strategy", name: "Strategy", parentId: "product" },
      { id: "lean-startup", name: "Lean Startup", parentId: "product" },
      { id: "user-research", name: "User Research", parentId: "product" },
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Technical deep-dives, architecture decisions, and code craftsmanship.",
    subcategories: [
      { id: "frontend", name: "Frontend", parentId: "engineering" },
      { id: "backend", name: "Backend", parentId: "engineering" },
      { id: "architecture", name: "Architecture", parentId: "engineering" },
    ],
  },
  {
    id: "startup",
    name: "Startup",
    description: "Lessons learned from founding and growing startups.",
    subcategories: [
      { id: "lessons", name: "Lessons Learned", parentId: "startup" },
      { id: "fundraising", name: "Fundraising", parentId: "startup" },
    ],
  },
  {
    id: "thoughts",
    name: "Thoughts",
    description: "Personal reflections and musings on tech and life.",
  },
];

const blogPosts = [
  {
    id: "1",
    slug: "rapid-prototyping-lean-startup",
    title: "Rapid Prototyping in the Age of Lean Startup",
    excerpt: "How to validate ideas quickly without building the full product. A practical guide to MVPs that actually work.",
    content: `## Introduction

In the fast-paced world of startups, time is your most valuable resource. The ability to validate ideas quickly can mean the difference between success and running out of runway.

## Why Rapid Prototyping Matters

The traditional approach of building a complete product before getting user feedback is not only slow but often leads to building the wrong thing. Rapid prototyping flips this on its head.

### The Cost of Building Wrong

Every feature you build that users don't need is:
- Time wasted on development
- Resources diverted from valuable work
- Technical debt accumulated

### The Lean Alternative

Instead of perfection, aim for learning. Build the smallest possible version that tests your core assumption.

## Practical Steps

Here's my proven approach to rapid prototyping:

### 1. Define Your Hypothesis

Before writing any code, clearly state what you're trying to learn. Use the format: "We believe [hypothesis]. We will know we're right when [measurable outcome]."

### 2. Identify the Core Assumption

What is the riskiest assumption in your idea? That's what you need to test first.

### 3. Build the Minimum

Build only what's necessary to test that assumption. Nothing more.

## Conclusion

Rapid prototyping isn't about being sloppy or cutting corners. It's about being strategic with your limited resources and maximizing learning per unit of time invested.`,
    date: "2024-01-15",
    readTime: "5 min",
    categoryId: "product",
    subcategoryId: "lean-startup",
    tags: ["MVP", "Prototyping", "Lean"],
    headings: [
      { id: "introduction", title: "Introduction", level: 2 },
      { id: "why-rapid-prototyping-matters", title: "Why Rapid Prototyping Matters", level: 2 },
      { id: "the-cost-of-building-wrong", title: "The Cost of Building Wrong", level: 3 },
      { id: "the-lean-alternative", title: "The Lean Alternative", level: 3 },
      { id: "practical-steps", title: "Practical Steps", level: 2 },
      { id: "1-define-your-hypothesis", title: "1. Define Your Hypothesis", level: 3 },
      { id: "2-identify-the-core-assumption", title: "2. Identify the Core Assumption", level: 3 },
      { id: "3-build-the-minimum", title: "3. Build the Minimum", level: 3 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
  {
    id: "2",
    slug: "typescript-best-practices-2024",
    title: "TypeScript Best Practices for 2024",
    excerpt: "Modern TypeScript patterns that will make your codebase more maintainable and your team more productive.",
    content: `## Introduction

TypeScript has evolved significantly over the years. Here are the patterns and practices I've found most valuable in 2024.

## Type Safety Fundamentals

Getting the basics right is crucial for a healthy TypeScript codebase.

### Strict Mode is Non-Negotiable

Always enable strict mode in your tsconfig. Yes, it's more work initially, but it catches bugs before they reach production.

### Prefer Interfaces for Objects

Use interfaces for object shapes and types for unions and primitives.

## Advanced Patterns

Once you've mastered the basics, these patterns will take your code to the next level.

### Discriminated Unions

One of TypeScript's most powerful features for handling different states.

### Template Literal Types

Create precise string types that catch typos at compile time.

## Conclusion

TypeScript is a journey, not a destination. Keep learning, keep refining your patterns.`,
    date: "2024-01-08",
    readTime: "7 min",
    categoryId: "engineering",
    subcategoryId: "frontend",
    tags: ["TypeScript", "Best Practices", "Code Quality"],
    headings: [
      { id: "introduction", title: "Introduction", level: 2 },
      { id: "type-safety-fundamentals", title: "Type Safety Fundamentals", level: 2 },
      { id: "strict-mode-is-non-negotiable", title: "Strict Mode is Non-Negotiable", level: 3 },
      { id: "prefer-interfaces-for-objects", title: "Prefer Interfaces for Objects", level: 3 },
      { id: "advanced-patterns", title: "Advanced Patterns", level: 2 },
      { id: "discriminated-unions", title: "Discriminated Unions", level: 3 },
      { id: "template-literal-types", title: "Template Literal Types", level: 3 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
  {
    id: "3",
    slug: "lessons-from-three-startups",
    title: "What I Learned from Founding Three Startups",
    excerpt: "The hard-won lessons from building companies from scratch. Spoiler: it's mostly about people.",
    content: `## Introduction

After co-founding three startups, I've accumulated a collection of lessons that I wish someone had told me earlier.

## Lesson 1: Ideas Are Cheap

Everyone has ideas. What matters is execution. The same idea in different hands leads to completely different outcomes.

### Execution Beats Innovation

A mediocre idea with great execution will outperform a brilliant idea with poor execution every time.

## Lesson 2: Hire Slowly, Fire Quickly

Your early hires define your culture. Take your time to find the right people.

### The Cost of a Bad Hire

A wrong hire doesn't just cost salary. They affect team morale, productivity, and culture.

## Lesson 3: Cash is King

No matter how good your metrics look, running out of cash means game over.

### Runway Management

Always know your runway. Plan for things taking longer than expected.

## Conclusion

Starting a company is a marathon, not a sprint. Pace yourself and keep learning.`,
    date: "2023-12-20",
    readTime: "6 min",
    categoryId: "startup",
    subcategoryId: "lessons",
    tags: ["Entrepreneurship", "Lessons", "Startups"],
    headings: [
      { id: "introduction", title: "Introduction", level: 2 },
      { id: "lesson-1-ideas-are-cheap", title: "Lesson 1: Ideas Are Cheap", level: 2 },
      { id: "execution-beats-innovation", title: "Execution Beats Innovation", level: 3 },
      { id: "lesson-2-hire-slowly-fire-quickly", title: "Lesson 2: Hire Slowly, Fire Quickly", level: 2 },
      { id: "the-cost-of-a-bad-hire", title: "The Cost of a Bad Hire", level: 3 },
      { id: "lesson-3-cash-is-king", title: "Lesson 3: Cash is King", level: 2 },
      { id: "runway-management", title: "Runway Management", level: 3 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
  {
    id: "4",
    slug: "the-art-of-saying-no",
    title: "The Art of Saying No",
    excerpt: "Why the best product managers are often those who say no the most.",
    content: `## Introduction

As a product manager, your job isn't to build features. It's to solve problems. And sometimes, the best solution is to not build anything at all.

## The Feature Trap

Every feature comes with hidden costs that aren't immediately obvious.

### Maintenance Burden

Every feature you add needs to be maintained forever. Documentation, bug fixes, compatibility...

### Complexity Tax

More features mean more complexity for users and developers alike.

## How to Say No

Saying no doesn't mean being negative. It means being strategic.

### Frame It as Prioritization

You're not saying "no forever." You're saying "not now" because you're focused on higher-impact work.

## Conclusion

The power of no is the power of focus. Use it wisely.`,
    date: "2023-12-10",
    readTime: "4 min",
    categoryId: "product",
    subcategoryId: "strategy",
    tags: ["Product Management", "Strategy", "Prioritization"],
    headings: [
      { id: "introduction", title: "Introduction", level: 2 },
      { id: "the-feature-trap", title: "The Feature Trap", level: 2 },
      { id: "maintenance-burden", title: "Maintenance Burden", level: 3 },
      { id: "complexity-tax", title: "Complexity Tax", level: 3 },
      { id: "how-to-say-no", title: "How to Say No", level: 2 },
      { id: "frame-it-as-prioritization", title: "Frame It as Prioritization", level: 3 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
];

// Helper functions
function getCategoryById(id) {
  return categories.find(cat => cat.id === id);
}

function getSubcategoryById(categoryId, subcategoryId) {
  const category = getCategoryById(categoryId);
  return category?.subcategories?.find(sub => sub.id === subcategoryId);
}

function getPostsByCategory(categoryId) {
  return blogPosts.filter(post => post.categoryId === categoryId);
}

function getPostsBySubcategory(categoryId, subcategoryId) {
  return blogPosts.filter(
    post => post.categoryId === categoryId && post.subcategoryId === subcategoryId
  );
}

function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// SVG Icons
const icons = {
  terminal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v20"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  folder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
};

// State
let currentPage = 'home';
let currentCategory = null;
let currentSubcategory = null;
let currentPost = null;
let isDark = false;
let isMenuOpen = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme();
  updateThemeToggle();
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme();
  updateThemeToggle();
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark);
}

function updateThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    toggle.innerHTML = isDark ? icons.sun : icons.moon;
  });
}

// Navigation
function initNavigation() {
  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      document.querySelector('.nav-mobile').classList.toggle('open', isMenuOpen);
      menuToggle.innerHTML = isMenuOpen ? icons.x : icons.menu;
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      document.querySelector('.nav-mobile').classList.remove('open');
      document.querySelector('.menu-toggle').innerHTML = icons.menu;
    });
  });
}

// Routing
function handleRoute() {
  const hash = window.location.hash || '#home';
  const parts = hash.slice(1).split('/');

  currentPage = parts[0] || 'home';
  currentCategory = null;
  currentSubcategory = null;
  currentPost = null;

  if (currentPage === 'blog' && parts[1] === 'category') {
    currentCategory = parts[2] || null;
    currentSubcategory = parts[3] || null;
  } else if (currentPage === 'blog' && parts[1] === 'post') {
    currentPost = parts[2] || null;
  }

  renderPage();
  updateNavLinks();
  window.scrollTo(0, 0);
}

function updateNavLinks() {
  const pageMap = {
    'home': '#home',
    'resume': '#resume',
    'services': '#services',
    'blog': '#blog',
  };

  // Desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const isActive = href === pageMap[currentPage] ||
                    (currentPage === 'blog' && href === '#blog');
    link.classList.toggle('active', isActive);
  });

  // Mobile nav
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    const isActive = href === pageMap[currentPage] ||
                    (currentPage === 'blog' && href === '#blog');
    link.classList.toggle('active', isActive);
    link.textContent = isActive ? `> ${link.textContent.replace('> ', '')}` : link.textContent.replace('> ', '');
  });
}

// Render Pages
function renderPage() {
  const main = document.querySelector('main');

  switch (currentPage) {
    case 'home':
      main.innerHTML = renderHomePage();
      break;
    case 'resume':
      main.innerHTML = renderResumePage();
      break;
    case 'services':
      main.innerHTML = renderServicesPage();
      break;
    case 'blog':
      if (currentPost) {
        main.innerHTML = renderBlogPostPage();
        initBlogPostObserver();
      } else {
        main.innerHTML = renderBlogPage();
      }
      break;
    default:
      main.innerHTML = renderNotFoundPage();
  }
}

function renderHomePage() {
  return `
    <div class="container page-section">
      <section class="hero fade-in">
        <div class="hero-code">
          <code class="page-code-comment">// welcome.tsx</code>
        </div>

        <h1 class="hero-title">
          <span style="color: var(--muted-foreground)">const</span>
          <span style="color: var(--primary)"> developer</span>
          <span style="color: var(--muted-foreground)"> =</span>
          <span> {</span>
        </h1>

        <div class="hero-object">
          <p><span class="key">name</span>: <span class="value">"Florian Heiwig"</span>,</p>
          <p><span class="key">role</span>: <span class="value">"Product & Code"</span>,</p>
          <p><span class="key">location</span>: <span class="value">"Berlin, DE"</span>,</p>
          <p><span class="key">status</span>: <span class="status">"building"</span><span class="hero-cursor">_</span></p>
        </div>

        <h1 class="hero-title">}</h1>

        <p class="hero-desc">
          Product professional, software developer, and entrepreneur.
          Bridging the gap between technical development and business strategy.
        </p>
      </section>

      <section class="nav-cards">
        <div class="divider"></div>

        <div class="cards-grid stagger-children">
          <a href="#resume" class="nav-card">
            <div class="nav-card-icon">${icons.briefcase}</div>
            <h2 class="nav-card-title">
              Resume
              <span class="nav-card-arrow">${icons.arrowRight}</span>
            </h2>
            <p class="nav-card-desc">Professional experience and background</p>
          </a>

          <a href="#services" class="nav-card">
            <div class="nav-card-icon">${icons.code}</div>
            <h2 class="nav-card-title">
              Services
              <span class="nav-card-arrow">${icons.arrowRight}</span>
            </h2>
            <p class="nav-card-desc">How I can help your business grow</p>
          </a>

          <a href="#blog" class="nav-card">
            <div class="nav-card-icon">${icons.fileText}</div>
            <h2 class="nav-card-title">
              Blog
              <span class="nav-card-arrow">${icons.arrowRight}</span>
            </h2>
            <p class="nav-card-desc">Thoughts on product and development</p>
          </a>
        </div>

        <div class="divider"></div>

        <div class="stats">
          <div class="stat">
            <div class="stat-value">10+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat">
            <div class="stat-value">3</div>
            <div class="stat-label">Startups Founded</div>
          </div>
          <div class="stat">
            <div class="stat-value">&infin;</div>
            <div class="stat-label">Coffee Consumed</div>
          </div>
        </div>
      </section>

      <section class="ascii-art">
        <pre>
    ╔══════════════════════════════════════╗
    ║  "I am the one who builds products   ║
    ║   and drives them to success!"       ║
    ╚══════════════════════════════════════╝
        </pre>
      </section>
    </div>
  `;
}

function renderResumePage() {
  const experiences = [
    { period: "03/2021 – Present", title: "Co-Founder", company: "FINE Legal", location: "Berlin", description: "Building legal tech solutions to streamline legal processes.", current: true },
    { period: "04/2020 – 04/2021", title: "Product Manager", company: "Volkswagen Digital:Lab", location: "Berlin", description: "Driving digital product development for one of the world's largest automotive companies." },
    { period: "01/2020 – 01/2021", title: "Co-Founder", company: "Wohnflächenberechnung24", location: "Berlin", description: "Real estate tech startup focused on property measurement services." },
    { period: "03/2019 – 09/2020", title: "Product Manager", company: "NIST", location: "Berlin", description: "Product strategy and development for innovative tech solutions." },
    { period: "06/2018 – 09/2018", title: "Tech Evangelist", company: "Hubert Burda Media Bootcamp", location: "Munich", description: "Evangelizing technology and innovation within the media industry." },
    { period: "03/2014 – 03/2017", title: "Software Developer", company: "Layer2", location: "Hamburg", description: "Full-stack development and technical architecture." },
  ];

  const skills = [
    { category: "Languages", items: ["TypeScript", "Python", "JavaScript", "SQL"] },
    { category: "Frameworks", items: ["React", "Node.js", "Next.js", "Django"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
    { category: "Methods", items: ["Agile", "Lean Startup", "Design Thinking", "OKRs"] },
  ];

  return `
    <div class="container page-section">
      <section class="page-header fade-in">
        <code class="page-code-comment">// resume.json</code>
        <h1 class="page-title">Florian Heiwig</h1>
        <p class="page-subtitle">Product Professional • Software Developer • Entrepreneur</p>
        <div class="resume-header-info mt-6">
          <span>${icons.mapPin} Berlin, Germany</span>
          <span>${icons.building} Available for Projects</span>
        </div>
      </section>

      <div class="resume-content">
        <section class="mb-12">
          <h2 class="section-heading"><span class="hash">#</span> Executive Summary</h2>
          <div class="card">
            <p>
              Berlin-based product professional, software developer, and entrepreneur ("Maker").
              Specializing in bridging the gap between technical development and business strategy,
              with a strong focus on rapid prototyping, lean startup methodology, and product management.
              Experience ranges from co-founding startups to working with large corporations like
              Volkswagen and Hubert Burda Media.
            </p>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="section-heading mb-6"><span class="hash">#</span> Experience</h2>
          <div class="timeline">
            ${experiences.map(exp => `
              <div class="timeline-item">
                <div class="timeline-header">
                  <div class="timeline-date">${icons.calendar} ${exp.period}</div>
                  <div class="timeline-content">
                    <h3 class="timeline-title">
                      ${exp.title}
                      ${exp.current ? '<span class="tag current">current</span>' : ''}
                    </h3>
                    <p class="timeline-company">${exp.company}</p>
                    <p class="timeline-location">${icons.mapPin} ${exp.location}</p>
                    <p class="timeline-desc">${exp.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="mb-12">
          <h2 class="section-heading mb-6"><span class="hash">#</span> Skills</h2>
          <div class="skills-grid">
            ${skills.map(skillGroup => `
              <div class="skill-card">
                <h3 class="skill-category">${skillGroup.category}</h3>
                <div class="skill-tags">
                  ${skillGroup.items.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="cta-section">
          <p>Want a PDF version?</p>
          <button class="btn">
            Download Resume ${icons.chevronRight}
          </button>
        </section>
      </div>
    </div>
  `;
}

function renderServicesPage() {
  const services = [
    { icon: 'rocket', title: "Product Strategy", description: "Transform your vision into a roadmap. I help define product strategy, prioritize features, and align teams around clear objectives.", tags: ["Roadmapping", "OKRs", "User Research"] },
    { icon: 'code', title: "Rapid Prototyping", description: "From idea to working prototype in weeks, not months. Validate concepts quickly with functional MVPs.", tags: ["MVP Development", "POC", "Technical Validation"] },
    { icon: 'users', title: "Stakeholder Alignment", description: "Bridge the gap between technical teams and business stakeholders. Clear communication, aligned goals.", tags: ["Communication", "Negotiation", "Workshops"] },
    { icon: 'lightbulb', title: "Technical Consulting", description: "Architecture decisions, technology selection, and technical due diligence for startups and enterprises.", tags: ["Architecture", "Tech Stack", "Code Review"] },
  ];

  const philosophy = [
    { icon: 'target', title: "Approach", content: "Combines rapid prototyping with deep technical understanding. Speed without sacrificing quality." },
    { icon: 'zap', title: "Key Strength", content: "Communicating and negotiating between stakeholders to balance speed and quality." },
    { icon: 'rocket', title: "Mindset", content: '"I am the one who builds products and drives them to success!"', highlight: true },
  ];

  return `
    <div class="container page-section">
      <section class="page-header fade-in">
        <code class="page-code-comment">// services.config.ts</code>
        <h1 class="page-title">Services</h1>
        <p class="page-subtitle">How I can help bring your product vision to life</p>
      </section>

      <div class="services-content">
        <section class="mb-16">
          <div class="services-grid stagger-children">
            ${services.map(service => `
              <div class="service-card">
                <div class="service-card-icon">${icons[service.icon]}</div>
                <h3 class="service-card-title">${service.title}</h3>
                <p class="service-card-desc">${service.description}</p>
                <div class="service-card-tags">
                  ${service.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="mb-16">
          <h2 class="section-heading mb-6"><span class="hash">#</span> Professional Philosophy</h2>
          <div class="philosophy-list">
            ${philosophy.map(item => `
              <div class="philosophy-item ${item.highlight ? 'highlight' : ''}">
                <div class="philosophy-icon">${icons[item.icon]}</div>
                <div>
                  <h3 class="philosophy-title">${item.title}</h3>
                  <p class="philosophy-content">${item.content}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="mb-16">
          <h2 class="section-heading mb-6"><span class="hash">#</span> Working Process</h2>
          <div class="code-block">
            <pre>function buildProduct(idea: Idea): Success {
  const validated = discover(idea);      // 1. Understand the problem
  const prototype = design(validated);   // 2. Rapid prototyping
  const mvp = develop(prototype);        // 3. Build & iterate
  const product = launch(mvp);           // 4. Ship & learn

  return optimize(product);              // 5. Continuous improvement
}</pre>
          </div>
        </section>

        <section class="cta-section">
          <h3>Ready to build something great?</h3>
          <p>Let's discuss how I can help with your next project</p>
          <a href="mailto:hello@florian.dev" class="btn">
            Get in Touch ${icons.arrowRight}
          </a>
        </section>
      </div>
    </div>
  `;
}

function renderBlogPage() {
  let posts = blogPosts;
  let title = "All Posts";
  let description = "Thoughts on product, engineering, and building things.";

  if (currentCategory && currentSubcategory) {
    posts = getPostsBySubcategory(currentCategory, currentSubcategory);
    const category = getCategoryById(currentCategory);
    const subcategory = getSubcategoryById(currentCategory, currentSubcategory);
    title = subcategory?.name || title;
    description = `${category?.name} / ${subcategory?.name}`;
  } else if (currentCategory) {
    posts = getPostsByCategory(currentCategory);
    const category = getCategoryById(currentCategory);
    title = category?.name || title;
    description = category?.description || description;
  }

  return `
    <div class="container page-section">
      <section class="page-header fade-in" style="max-width: 56rem;">
        <code class="page-code-comment">// blog/index.tsx</code>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${description}</p>
      </section>

      <div class="blog-layout">
        ${renderCategorySidebar()}

        <div class="blog-posts">
          ${posts.length > 0 ? `
            <div class="blog-posts-list stagger-children">
              ${posts.map(post => renderBlogCard(post)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <p>No posts found in this category.</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderCategorySidebar() {
  return `
    <aside class="category-sidebar">
      <h3 class="category-title">Categories</h3>
      <ul class="category-list">
        <li class="category-item">
          <a href="#blog" class="category-link ${!currentCategory ? 'active' : ''}">
            ${icons.folder} All Posts
          </a>
        </li>
        ${categories.map(cat => `
          <li class="category-item">
            <a href="#blog/category/${cat.id}" class="category-link ${currentCategory === cat.id && !currentSubcategory ? 'active' : ''}">
              ${icons.folder} ${cat.name}
            </a>
            ${cat.subcategories ? `
              <ul class="subcategory-list">
                ${cat.subcategories.map(sub => `
                  <li>
                    <a href="#blog/category/${cat.id}/${sub.id}" class="subcategory-link ${currentCategory === cat.id && currentSubcategory === sub.id ? 'active' : ''}">
                      ${sub.name}
                    </a>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </li>
        `).join('')}
      </ul>
    </aside>
  `;
}

function renderBlogCard(post) {
  const category = getCategoryById(post.categoryId);
  return `
    <a href="#blog/post/${post.slug}" class="blog-card">
      <div class="blog-card-tags">
        ${category ? `<span class="tag">${category.name}</span>` : ''}
        ${post.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <h2 class="blog-card-title">
        ${post.title}
        <span class="blog-card-arrow">${icons.arrowRight}</span>
      </h2>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <div class="blog-card-meta">
        <span>${icons.calendar} ${formatDate(post.date)}</span>
        <span>${icons.clock} ${post.readTime} read</span>
      </div>
    </a>
  `;
}

function renderBlogPostPage() {
  const post = getPostBySlug(currentPost);

  if (!post) {
    return `
      <div class="container page-section not-found">
        <h1>Post not found</h1>
        <a href="#blog">&larr; Back to blog</a>
      </div>
    `;
  }

  const category = getCategoryById(post.categoryId);
  const subcategory = post.subcategoryId ? getSubcategoryById(post.categoryId, post.subcategoryId) : null;

  return `
    <article class="container page-section">
      <nav class="breadcrumb" style="max-width: 56rem; margin: 0 auto 2rem;">
        <a href="#blog">Blog</a>
        ${category ? `
          ${icons.chevronRight}
          <a href="#blog/category/${category.id}">${category.name}</a>
        ` : ''}
        ${subcategory ? `
          ${icons.chevronRight}
          <a href="#blog/category/${category.id}/${subcategory.id}">${subcategory.name}</a>
        ` : ''}
      </nav>

      <div class="blog-post-layout">
        <div class="blog-post-main">
          <header class="blog-post-header">
            <h1 class="blog-post-title">${post.title}</h1>
            <div class="blog-post-meta">
              <span>${icons.calendar} ${formatDate(post.date)}</span>
              <span>${icons.clock} ${post.readTime} read</span>
            </div>
            <div class="blog-post-tags">
              ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </header>

          <div class="divider"></div>

          <div class="mobile-toc">
            <details>
              <summary>Table of Contents</summary>
              <ul class="mobile-toc-list">
                ${post.headings.map(heading => `
                  <li style="padding-left: ${(heading.level - 2) * 12}px;">
                    <a href="#${heading.id}">${heading.title}</a>
                  </li>
                `).join('')}
              </ul>
            </details>
          </div>

          <div class="blog-post-content">
            ${renderBlogContent(post.content)}
          </div>

          <div class="divider"></div>

          <a href="#blog" class="back-link">
            ${icons.arrowLeft} Back to all posts
          </a>
        </div>

        <aside class="desktop-toc">
          <div class="toc-sticky">
            <h3 class="toc-title">On this page</h3>
            <ul class="toc-list" id="toc-list">
              ${post.headings.map(heading => `
                <li style="padding-left: ${(heading.level - 2) * 12}px;">
                  <a href="#${heading.id}" data-heading="${heading.id}">${heading.title}</a>
                </li>
              `).join('')}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  `;
}

function renderBlogContent(content) {
  const lines = content.trim().split('\n');
  let html = '';
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      html += `<ul>${currentList.map(item => `<li>${item}</li>`).join('')}</ul>`;
      currentList = [];
    }
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.replace('## ', '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html += `<h2 id="${id}">${text}</h2>`;
    } else if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.replace('### ', '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html += `<h3 id="${id}">${text}</h3>`;
    } else if (trimmed.startsWith('- ')) {
      currentList.push(trimmed.replace('- ', ''));
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      html += `<p>${trimmed}</p>`;
    }
  });

  flushList();
  return html;
}

function initBlogPostObserver() {
  const post = getPostBySlug(currentPost);
  if (!post) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('#toc-list a').forEach(link => {
            link.classList.toggle('active', link.dataset.heading === id);
          });
        }
      });
    },
    { rootMargin: '-100px 0px -66% 0px' }
  );

  post.headings.forEach((heading) => {
    const element = document.getElementById(heading.id);
    if (element) observer.observe(element);
  });
}

function renderNotFoundPage() {
  return `
    <div class="container page-section not-found">
      <h1>404 - Page Not Found</h1>
      <a href="#home">&larr; Return to home</a>
    </div>
  `;
}
