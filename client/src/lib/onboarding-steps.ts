import { HelpStep } from "@/components/help-bubble";

export const onboardingSteps: HelpStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to S&D Intel Investigator',
    content: 'This platform provides access to 1,169 professional OSINT tools across 33 investigation categories. Let\'s take a quick tour to get you started.',
    target: '[data-onboarding="main-header"]',
    position: 'bottom',
    nextStep: 'categories',
  },
  {
    id: 'categories',
    title: 'Investigation Categories',
    content: 'Browse tools by investigation type. Each category contains specialized tools for different aspects of OSINT work, from social media to network analysis.',
    target: '[data-onboarding="category-list"]',
    position: 'right',
    prevStep: 'welcome',
    nextStep: 'search',
  },
  {
    id: 'search',
    title: 'Search & Filter Tools',
    content: 'Use the search bar to quickly find specific tools by name, description, or functionality. Perfect for when you know exactly what you need.',
    target: '[data-onboarding="search-bar"]',
    position: 'bottom',
    prevStep: 'categories',
    nextStep: 'tool-card',
  },
  {
    id: 'tool-card',
    title: 'Understanding Tool Cards',
    content: 'Each card shows tool details, ratings, user counts, and use cases. Click "Open Tool" to access the actual OSINT resource, or use the orange triangle to report broken links.',
    target: '[data-onboarding="tool-card"]:first-child',
    position: 'top',
    prevStep: 'search',
    nextStep: 'export',
  },
  {
    id: 'export',
    title: 'Export Your Findings',
    content: 'Export your search results and selected tools as CSV or JSON files for documentation and reporting purposes.',
    target: '[data-onboarding="export-button"]',
    position: 'left',
    prevStep: 'tool-card',
    nextStep: 'tooltips',
  },
  {
    id: 'tooltips',
    title: 'Interactive Tooltips',
    content: 'Hover over any element with additional information to see detailed tooltips. These provide context about ratings, user counts, and tool capabilities.',
    target: '[data-onboarding="tooltip-example"]',
    position: 'top',
    prevStep: 'export',
    nextStep: 'complete',
  },
  {
    id: 'complete',
    title: 'You\'re Ready to Investigate!',
    content: 'You now know the basics of using S&D Intel Investigator. Remember, you can always click the "Help & Tips" button for assistance or to replay this tour.',
    target: '[data-onboarding="help-button"]',
    position: 'top',
    prevStep: 'tooltips',
    isLast: true,
  },
];

// Quick tips that can be shown contextually
export const quickTips = {
  firstTimeUser: {
    title: 'New User Detected',
    content: 'Welcome! This appears to be your first visit. Would you like a guided tour of our OSINT investigation platform?',
  },
  noResultsFound: {
    title: 'No Results Found',
    content: 'Try broadening your search terms or selecting a different category. Our tools cover a wide range of OSINT disciplines.',
  },
  categorySelection: {
    title: 'Category Selected',
    content: 'You\'re now viewing tools specific to this investigation type. Use the search bar to narrow down further or browse all available tools.',
  },
  exportSuccess: {
    title: 'Export Successful',
    content: 'Your data has been exported successfully. You can now use this information in your investigation reports or documentation.',
  },
};