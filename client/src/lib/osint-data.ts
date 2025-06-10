import type { InsertTool } from "@shared/schema";

// Sample OSINT tools data that would be loaded into the application
// This represents the kind of data structure the app expects
export const sampleOsintTools: InsertTool[] = [
  // Social Media Intelligence Tools
  {
    name: "TweetDeck",
    description: "Advanced Twitter monitoring and analytics tool for tracking conversations, hashtags, and user activity across multiple accounts.",
    fullDescription: "TweetDeck is Twitter's official professional social media dashboard for managing multiple Twitter accounts. It provides real-time tracking, advanced filtering, and scheduling capabilities that make it an essential tool for OSINT investigators working with Twitter data. The platform allows you to monitor hashtags, track mentions, and organize content into customizable columns for efficient information gathering.",
    url: "https://tweetdeck.twitter.com",
    categoryId: 1, // Social Media Intelligence
    pricing: "free",
    platform: "web",
    rating: 48, // 4.8 * 10
    userCount: 12000,
    features: [
      "Real-time tweet monitoring and alerts",
      "Advanced search and filtering options",
      "Multiple account management",
      "Custom column organization",
      "Tweet scheduling and automation"
    ],
    useCases: [
      {
        title: "Social Media Monitoring",
        description: "Track hashtags and mentions in real-time",
        color: "blue"
      },
      {
        title: "Account Analysis",
        description: "Monitor multiple accounts simultaneously",
        color: "green"
      },
      {
        title: "Trend Analysis",
        description: "Identify emerging topics and conversations",
        color: "purple"
      },
      {
        title: "Evidence Collection",
        description: "Organize and save relevant tweets",
        color: "orange"
      }
    ],
    tags: ["twitter", "social-media", "monitoring", "real-time"],
    isOfficial: true,
    hasApi: false,
    iconType: "fab",
    iconName: "fa-twitter",
    iconColor: "blue"
  },
  
  {
    name: "Social Searcher",
    description: "Real-time social media search engine for monitoring mentions, hashtags, and content across Facebook, Twitter, Instagram, and more.",
    fullDescription: "Social Searcher is a comprehensive social media monitoring tool that provides real-time search capabilities across multiple platforms. It's designed for OSINT investigators who need to track mentions, monitor brand reputation, and gather intelligence from social media sources. The platform offers both free and premium tiers with varying levels of functionality.",
    url: "https://www.social-searcher.com",
    categoryId: 1,
    pricing: "freemium",
    platform: "web",
    rating: 46,
    userCount: 8200,
    features: [
      "Multi-platform social media search",
      "Real-time monitoring and alerts",
      "Sentiment analysis",
      "Export capabilities",
      "API access for premium users"
    ],
    useCases: [
      {
        title: "Brand Monitoring",
        description: "Track mentions across platforms",
        color: "blue"
      },
      {
        title: "Threat Detection",
        description: "Monitor for security-related mentions",
        color: "orange"
      }
    ],
    tags: ["social-media", "monitoring", "multi-platform", "sentiment"],
    isOfficial: false,
    hasApi: true,
    iconType: "fab",
    iconName: "fa-facebook",
    iconColor: "indigo"
  },

  // Add more sample tools for other categories...
  {
    name: "Shodan",
    description: "Search engine for Internet-connected devices, providing insights into exposed services, vulnerabilities, and network infrastructure.",
    fullDescription: "Shodan is the world's first search engine for Internet-connected devices. It allows cybersecurity professionals and researchers to discover devices exposed to the internet, including webcams, servers, and IoT devices. For OSINT investigators, Shodan provides valuable intelligence about network infrastructure and potential security vulnerabilities.",
    url: "https://www.shodan.io",
    categoryId: 2, // Network Analysis
    pricing: "freemium",
    platform: "web",
    rating: 47,
    userCount: 15000,
    features: [
      "Internet-wide device discovery",
      "Service and banner information",
      "Vulnerability detection",
      "Geographic mapping",
      "API access"
    ],
    useCases: [
      {
        title: "Infrastructure Reconnaissance",
        description: "Discover exposed devices and services",
        color: "blue"
      },
      {
        title: "Vulnerability Assessment",
        description: "Identify potential security risks",
        color: "orange"
      }
    ],
    tags: ["network", "scanning", "iot", "security", "reconnaissance"],
    isOfficial: false,
    hasApi: true,
    iconType: "fas",
    iconName: "fa-network-wired",
    iconColor: "green"
  }
];
