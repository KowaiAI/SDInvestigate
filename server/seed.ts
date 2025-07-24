import { db } from "./db";
import {
  categories,
  tools,
  type InsertCategory,
  type InsertTool,
} from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // First, seed categories
  const defaultCategories: InsertCategory[] = [
    {
      name: "Social Media Intelligence",
      slug: "social-media",
      description:
        "Tools for investigating social media platforms, profiles, and content",
      icon: "fas fa-users",
      color: "blue",
    },
    {
      name: "Network Analysis",
      slug: "network",
      description:
        "Tools for network reconnaissance and infrastructure analysis",
      icon: "fas fa-network-wired",
      color: "green",
    },
    {
      name: "Geospatial Intelligence",
      slug: "geospatial",
      description: "Tools for location intelligence and geographic analysis",
      icon: "fas fa-globe",
      color: "red",
    },
    {
      name: "Search Engines",
      slug: "search",
      description: "Specialized search engines and discovery tools",
      icon: "fas fa-search",
      color: "purple",
    },
    {
      name: "Image Analysis",
      slug: "images",
      description: "Tools for reverse image search and visual analysis",
      icon: "fas fa-images",
      color: "pink",
    },
    {
      name: "Email Investigation",
      slug: "email",
      description: "Tools for email verification and investigation",
      icon: "fas fa-envelope",
      color: "orange",
    },
    {
      name: "Phone Numbers",
      slug: "phone",
      description: "Tools for phone number investigation and verification",
      icon: "fas fa-phone",
      color: "indigo",
    },
    {
      name: "Document Analysis",
      slug: "documents",
      description: "Tools for document analysis and metadata extraction",
      icon: "fas fa-file-alt",
      color: "gray",
    },
    {
      name: "Financial Intelligence",
      slug: "financial",
      description: "Tools for financial investigation and analysis",
      icon: "fas fa-dollar-sign",
      color: "yellow",
    },
    {
      name: "Threat Intelligence",
      slug: "threat",
      description: "Tools for threat detection and security analysis",
      icon: "fas fa-shield-alt",
      color: "red",
    },
    {
      name: "Dark Web",
      slug: "dark-web",
      description: "Tools for dark web monitoring and investigation",
      icon: "fas fa-user-secret",
      color: "black",
    },
  ];

  // Clear existing data
  await db.delete(tools);
  await db.delete(categories);

  // Insert categories
  const insertedCategories = await db
    .insert(categories)
    .values(defaultCategories)
    .returning();
  console.log(`Inserted ${insertedCategories.length} categories`);

  // Create category map for tools
  const categoryMap = new Map();
  insertedCategories.forEach((cat) => {
    categoryMap.set(cat.slug, cat.id);
  });

  // Now seed tools with correct category IDs
  const osintTools: InsertTool[] = [
    // Social Media Intelligence Tools
    {
      name: "TweetDeck",
      description:
        "Advanced Twitter monitoring and analytics tool for tracking conversations, hashtags, and user activity across multiple accounts.",
      fullDescription:
        "TweetDeck is Twitter's official professional social media dashboard for managing multiple Twitter accounts. It provides real-time tracking, advanced filtering, and scheduling capabilities that make it an essential tool for OSINT investigators working with Twitter data.",
      url: "https://tweetdeck.twitter.com",
      categoryId: categoryMap.get("social-media"),
      pricing: "free",
      platform: "web",
      rating: 48,
      userCount: 12000,
      features: [
        "Real-time tweet monitoring",
        "Advanced search and filtering",
        "Multiple account management",
        "Custom column organization",
        "Tweet scheduling",
      ],
      useCases: [
        {
          title: "Social Media Monitoring",
          description: "Track hashtags and mentions in real-time",
          color: "blue",
        },
        {
          title: "Account Analysis",
          description: "Monitor multiple accounts simultaneously",
          color: "green",
        },
      ],
      tags: ["twitter", "social-media", "monitoring", "real-time"],
      isOfficial: true,
      hasApi: false,
      iconType: "fab",
      iconName: "fa-twitter",
      iconColor: "blue",
    },
    {
      name: "Social Searcher",
      description:
        "Real-time social media search engine for monitoring mentions, hashtags, and content across Facebook, Twitter, Instagram, and more.",
      fullDescription:
        "Social Searcher is a comprehensive social media monitoring tool that provides real-time search capabilities across multiple platforms. It's designed for OSINT investigators who need to track mentions, monitor brand reputation, and gather intelligence from social media sources.",
      url: "https://www.social-searcher.com",
      categoryId: categoryMap.get("social-media"),
      pricing: "freemium",
      platform: "web",
      rating: 46,
      userCount: 8200,
      features: [
        "Multi-platform social media search",
        "Real-time monitoring and alerts",
        "Sentiment analysis",
        "Export capabilities",
        "API access",
      ],
      useCases: [
        {
          title: "Brand Monitoring",
          description: "Track mentions across platforms",
          color: "blue",
        },
        {
          title: "Threat Detection",
          description: "Monitor for security-related mentions",
          color: "orange",
        },
      ],
      tags: ["social-media", "monitoring", "multi-platform", "sentiment"],
      isOfficial: false,
      hasApi: true,
      iconType: "fab",
      iconName: "fa-facebook",
      iconColor: "indigo",
    },
    {
      name: "Pipl",
      description:
        "Professional people search engine for finding comprehensive background information, social profiles, and contact details.",
      fullDescription:
        "Pipl is a professional-grade people search engine that aggregates data from hundreds of sources to provide comprehensive background information. It's widely used by investigators, recruiters, and security professionals for person-of-interest research.",
      url: "https://pipl.com",
      categoryId: categoryMap.get("social-media"),
      pricing: "premium",
      platform: "web",
      rating: 45,
      userCount: 5600,
      features: [
        "Deep web search",
        "Identity verification",
        "Contact information",
        "Social media aggregation",
        "Professional API",
      ],
      useCases: [
        {
          title: "Background Checks",
          description: "Comprehensive person research",
          color: "purple",
        },
        {
          title: "Identity Verification",
          description: "Verify person identity and details",
          color: "green",
        },
      ],
      tags: ["people-search", "background-check", "identity", "professional"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-user-search",
      iconColor: "purple",
    },

    // Network Analysis Tools
    {
      name: "Shodan",
      description:
        "Search engine for Internet-connected devices, providing insights into exposed services, vulnerabilities, and network infrastructure.",
      fullDescription:
        "Shodan is the world's first search engine for Internet-connected devices. It allows cybersecurity professionals and researchers to discover devices exposed to the internet, including webcams, servers, and IoT devices.",
      url: "https://www.shodan.io",
      categoryId: categoryMap.get("network"),
      pricing: "freemium",
      platform: "web",
      rating: 47,
      userCount: 15000,
      features: [
        "Internet-wide device discovery",
        "Service and banner information",
        "Vulnerability detection",
        "Geographic mapping",
        "API access",
      ],
      useCases: [
        {
          title: "Infrastructure Reconnaissance",
          description: "Discover exposed devices and services",
          color: "blue",
        },
        {
          title: "Vulnerability Assessment",
          description: "Identify potential security risks",
          color: "orange",
        },
      ],
      tags: ["network", "scanning", "iot", "security", "reconnaissance"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-network-wired",
      iconColor: "green",
    },
    {
      name: "Censys",
      description:
        "Internet scanning and attack surface management platform for discovering and monitoring internet-facing assets.",
      fullDescription:
        "Censys provides comprehensive internet scanning capabilities, helping security teams discover and monitor their internet-facing assets. It offers detailed information about services, certificates, and vulnerabilities across the entire IPv4 space.",
      url: "https://censys.io",
      categoryId: categoryMap.get("network"),
      pricing: "freemium",
      platform: "web",
      rating: 46,
      userCount: 9200,
      features: [
        "Comprehensive internet scanning",
        "Certificate monitoring",
        "Attack surface management",
        "API integration",
        "Historical data",
      ],
      useCases: [
        {
          title: "Asset Discovery",
          description: "Find all internet-facing assets",
          color: "blue",
        },
        {
          title: "Security Monitoring",
          description: "Monitor for new exposures",
          color: "orange",
        },
      ],
      tags: ["network", "scanning", "certificates", "attack-surface"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-search",
      iconColor: "blue",
    },

    // Search Engines
    {
      name: "Google Dorking",
      description:
        "Advanced Google search techniques using specific operators to find sensitive information and hidden content.",
      fullDescription:
        "Google Dorking involves using advanced search operators to find information that might not be easily accessible through normal searches. These techniques are essential for OSINT investigators to uncover hidden files, sensitive information, and specific content types.",
      url: "https://www.google.com",
      categoryId: categoryMap.get("search"),
      pricing: "free",
      platform: "web",
      rating: 50,
      userCount: 25000,
      features: [
        "Advanced search operators",
        "File type searching",
        "Site-specific searches",
        "Cache searching",
        "Wildcard searches",
      ],
      useCases: [
        {
          title: "Information Discovery",
          description: "Find hidden or sensitive files",
          color: "blue",
        },
        {
          title: "Site Analysis",
          description: "Analyze website structure and content",
          color: "green",
        },
      ],
      tags: [
        "google",
        "dorking",
        "search",
        "operators",
        "information-gathering",
      ],
      isOfficial: true,
      hasApi: false,
      iconType: "fab",
      iconName: "fa-google",
      iconColor: "red",
    },
    {
      name: "DuckDuckGo",
      description:
        "Privacy-focused search engine that doesn't track users, useful for anonymous OSINT research.",
      fullDescription:
        "DuckDuckGo is a privacy-focused search engine that doesn't track users or store personal information. This makes it valuable for OSINT investigators who need to conduct research without leaving digital footprints or having results influenced by previous searches.",
      url: "https://duckduckgo.com",
      categoryId: categoryMap.get("search"),
      pricing: "free",
      platform: "web",
      rating: 44,
      userCount: 18000,
      features: [
        "No user tracking",
        "Bang searches",
        "Instant answers",
        "Safe search",
        "Anonymous browsing",
      ],
      useCases: [
        {
          title: "Anonymous Research",
          description: "Conduct searches without tracking",
          color: "purple",
        },
        {
          title: "Unbiased Results",
          description: "Get results without personalization",
          color: "green",
        },
      ],
      tags: ["privacy", "search", "anonymous", "untracked"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-search",
      iconColor: "orange",
    },

    // Image Analysis
    {
      name: "TinEye",
      description:
        "Reverse image search engine for finding where images appear online and detecting image manipulation.",
      fullDescription:
        "TinEye is a reverse image search engine that helps you find where an image came from, how it's being used, if modified versions exist, or if there's a higher resolution version available. It's essential for verifying image authenticity in investigations.",
      url: "https://tineye.com",
      categoryId: categoryMap.get("images"),
      pricing: "freemium",
      platform: "web",
      rating: 46,
      userCount: 12500,
      features: [
        "Reverse image search",
        "Image modification detection",
        "High-resolution finding",
        "Historical tracking",
        "API access",
      ],
      useCases: [
        {
          title: "Image Verification",
          description: "Verify authenticity of images",
          color: "blue",
        },
        {
          title: "Source Detection",
          description: "Find original source of images",
          color: "green",
        },
      ],
      tags: ["reverse-search", "images", "verification", "manipulation"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-images",
      iconColor: "pink",
    },
    {
      name: "Google Images",
      description:
        "Google's reverse image search for finding similar images and identifying objects, places, and people.",
      fullDescription:
        "Google Images provides powerful reverse image search capabilities, allowing investigators to find similar images, identify objects, places, and people in photos. It's integrated with Google's vast image database and AI recognition capabilities.",
      url: "https://images.google.com",
      categoryId: categoryMap.get("images"),
      pricing: "free",
      platform: "web",
      rating: 48,
      userCount: 22000,
      features: [
        "Reverse image search",
        "Object recognition",
        "Similar image finding",
        "Text extraction from images",
        "Location identification",
      ],
      useCases: [
        {
          title: "Image Investigation",
          description: "Find similar or related images",
          color: "blue",
        },
        {
          title: "Object Identification",
          description: "Identify objects in images",
          color: "green",
        },
      ],
      tags: ["google", "reverse-search", "images", "recognition"],
      isOfficial: true,
      hasApi: false,
      iconType: "fab",
      iconName: "fa-google",
      iconColor: "red",
    },

    // Email Investigation
    {
      name: "Hunter.io",
      description:
        "Professional email finder and verifier for discovering and validating email addresses associated with domains.",
      fullDescription:
        "Hunter.io is a professional email finder that helps you find and verify email addresses. It's widely used for lead generation, but also valuable for OSINT investigators to find contact information and verify email addresses during investigations.",
      url: "https://hunter.io",
      categoryId: categoryMap.get("email"),
      pricing: "freemium",
      platform: "web",
      rating: 47,
      userCount: 8900,
      features: [
        "Email finding",
        "Email verification",
        "Domain search",
        "Bulk operations",
        "API integration",
      ],
      useCases: [
        {
          title: "Email Discovery",
          description: "Find email addresses for domains",
          color: "blue",
        },
        {
          title: "Email Verification",
          description: "Verify if emails are valid",
          color: "green",
        },
      ],
      tags: ["email", "finder", "verification", "domain"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-envelope",
      iconColor: "orange",
    },
    {
      name: "EmailHippo",
      description:
        "Email address verification and validation service for checking email deliverability and detecting disposable emails.",
      fullDescription:
        "EmailHippo provides comprehensive email verification services, helping investigators validate email addresses, check deliverability, and detect disposable or temporary email addresses. It's useful for verifying the legitimacy of email addresses during investigations.",
      url: "https://emailhippo.com",
      categoryId: categoryMap.get("email"),
      pricing: "freemium",
      platform: "web",
      rating: 43,
      userCount: 4200,
      features: [
        "Email validation",
        "Disposable email detection",
        "Risk scoring",
        "Bulk verification",
        "Real-time API",
      ],
      useCases: [
        {
          title: "Email Validation",
          description: "Check if emails are legitimate",
          color: "green",
        },
        {
          title: "Risk Assessment",
          description: "Assess email risk levels",
          color: "orange",
        },
      ],
      tags: ["email", "validation", "verification", "disposable"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-envelope-check",
      iconColor: "green",
    },

    // Phone Numbers
    {
      name: "TrueCaller",
      description:
        "Phone number lookup and caller identification service for finding owner information and blocking spam calls.",
      fullDescription:
        "TrueCaller is a comprehensive phone number lookup service that provides caller identification, spam detection, and contact information. It's useful for OSINT investigators to identify phone number owners and verify contact information.",
      url: "https://www.truecaller.com",
      categoryId: categoryMap.get("phone"),
      pricing: "freemium",
      platform: "web",
      rating: 45,
      userCount: 16000,
      features: [
        "Caller identification",
        "Spam detection",
        "Contact search",
        "Number lookup",
        "Mobile app",
      ],
      useCases: [
        {
          title: "Number Identification",
          description: "Identify phone number owners",
          color: "blue",
        },
        {
          title: "Spam Detection",
          description: "Detect spam and fraudulent calls",
          color: "orange",
        },
      ],
      tags: ["phone", "caller-id", "spam", "lookup"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-phone",
      iconColor: "indigo",
    },

    // Geospatial Intelligence
    {
      name: "Google Earth",
      description:
        "Satellite imagery and geographical information system for location analysis and geographical intelligence gathering.",
      fullDescription:
        "Google Earth provides access to high-resolution satellite imagery, historical imagery, and geographical information. It's essential for geospatial intelligence gathering, location verification, and geographical analysis in OSINT investigations.",
      url: "https://earth.google.com",
      categoryId: categoryMap.get("geospatial"),
      pricing: "free",
      platform: "web",
      rating: 49,
      userCount: 20000,
      features: [
        "Satellite imagery",
        "Historical imagery",
        "3D visualization",
        "Measurement tools",
        "Location sharing",
      ],
      useCases: [
        {
          title: "Location Analysis",
          description: "Analyze geographical locations",
          color: "blue",
        },
        {
          title: "Historical Comparison",
          description: "Compare locations over time",
          color: "green",
        },
      ],
      tags: ["satellite", "imagery", "geospatial", "maps"],
      isOfficial: true,
      hasApi: false,
      iconType: "fas",
      iconName: "fa-globe",
      iconColor: "red",
    },

    // Document Analysis
    {
      name: "FOCA",
      description:
        "Document metadata analysis tool for extracting hidden information from files and discovering network infrastructure.",
      fullDescription:
        "FOCA (Fingerprinting Organizations with Collected Archives) is a tool for extracting metadata from documents. It can discover users, folders, printers, operating systems and applications from document metadata, making it valuable for OSINT investigations.",
      url: "https://github.com/ElevenPaths/FOCA",
      categoryId: categoryMap.get("documents"),
      pricing: "free",
      platform: "desktop",
      rating: 44,
      userCount: 3200,
      features: [
        "Metadata extraction",
        "Document analysis",
        "Network discovery",
        "User enumeration",
        "Technology fingerprinting",
      ],
      useCases: [
        {
          title: "Metadata Analysis",
          description: "Extract hidden information from documents",
          color: "blue",
        },
        {
          title: "Network Discovery",
          description: "Discover network infrastructure from documents",
          color: "green",
        },
      ],
      tags: ["metadata", "documents", "analysis", "fingerprinting"],
      isOfficial: false,
      hasApi: false,
      iconType: "fas",
      iconName: "fa-file-alt",
      iconColor: "gray",
    },

    // Financial Intelligence
    {
      name: "OpenCorporates",
      description:
        "Global database of company information for investigating corporate structures, ownership, and business relationships.",
      fullDescription:
        "OpenCorporates is the largest open database of company data in the world. It provides detailed information about companies globally, including ownership structures, filing history, and business relationships, making it essential for financial investigations.",
      url: "https://opencorporates.com",
      categoryId: categoryMap.get("financial"),
      pricing: "freemium",
      platform: "web",
      rating: 46,
      userCount: 7800,
      features: [
        "Company database",
        "Ownership tracking",
        "Filing history",
        "Business relationships",
        "API access",
      ],
      useCases: [
        {
          title: "Corporate Investigation",
          description: "Research company structures and ownership",
          color: "blue",
        },
        {
          title: "Due Diligence",
          description: "Verify business information",
          color: "green",
        },
      ],
      tags: ["corporate", "companies", "ownership", "business"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-building",
      iconColor: "yellow",
    },

    // Threat Intelligence
    {
      name: "VirusTotal",
      description:
        "File and URL analysis service for detecting malware, viruses, and malicious content using multiple antivirus engines.",
      fullDescription:
        "VirusTotal is a free service that analyzes files and URLs for viruses, worms, trojans and other kinds of malicious content. It uses multiple antivirus engines and website scanners to provide comprehensive threat analysis.",
      url: "https://www.virustotal.com",
      categoryId: categoryMap.get("threat"),
      pricing: "freemium",
      platform: "web",
      rating: 48,
      userCount: 14000,
      features: [
        "Multi-engine scanning",
        "URL analysis",
        "File analysis",
        "Threat intelligence",
        "API access",
      ],
      useCases: [
        {
          title: "Malware Detection",
          description: "Detect malicious files and URLs",
          color: "orange",
        },
        {
          title: "Threat Analysis",
          description: "Analyze security threats",
          color: "red",
        },
      ],
      tags: ["malware", "antivirus", "security", "threat"],
      isOfficial: false,
      hasApi: true,
      iconType: "fas",
      iconName: "fa-shield-alt",
      iconColor: "red",
    },
  ];

  // Insert tools
  const insertedTools = await db.insert(tools).values(osintTools).returning();
  console.log(`Inserted ${insertedTools.length} tools`);

  console.log("Database seeding completed!");
}

// Run the seed function
seedDatabase().catch(console.error);

export { seedDatabase };
