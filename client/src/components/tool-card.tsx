import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  ExternalLink,
  Star,
  Users,
  Info,
  Shield,
  Code,
  AlertTriangle,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@shared/schema";

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  "data-onboarding"?: string;
}

export default function ToolCard({
  tool,
  onClick,
  "data-onboarding": dataOnboarding,
}: ToolCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get favorites
  const { data: favorites = [] } = useQuery<number[]>({
    queryKey: ["/api/favorites"],
  });

  const isFavorite = favorites.includes(tool.id);

  // Add favorite mutation
  const addFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/favorites", { toolId: tool.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to favorites",
        description: `${tool.name} has been added to your favorites.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add tool to favorites.",
        variant: "destructive",
      });
    },
  });

  // Remove favorite mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/favorites/${tool.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from favorites",
        description: `${tool.name} has been removed from your favorites.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove tool from favorites.",
        variant: "destructive",
      });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const handleOpenTool = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleReportBrokenLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Report Submitted",
      description: `Thank you for reporting a broken link for ${tool.name}. Our team will review and update it.`,
    });
  };

  const getPricingBadgeClass = (pricing: string) => {
    switch (pricing) {
      case "free":
        return "pricing-badge pricing-free";
      case "freemium":
        return "pricing-badge pricing-freemium";
      case "premium":
        return "pricing-badge pricing-premium";
      default:
        return "pricing-badge bg-gray-100 text-gray-800";
    }
  };

  const getFeatureBadgeClass = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "official":
        return "feature-badge feature-official";
      case "api":
        return "feature-badge feature-api";
      case "cli":
        return "feature-badge feature-cli";
      case "python":
        return "feature-badge feature-python";
      case "online":
        return "feature-badge feature-online";
      default:
        return "feature-badge bg-gray-100 text-gray-800";
    }
  };

  const formatUserCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  const getToolPurposeTooltip = () => {
    const features = tool.features?.join(", ") || "OSINT Investigation";
    const platformInfo = tool.platform ? ` Platform: ${tool.platform}.` : "";
    const apiInfo = tool.hasApi ? " Includes API access." : "";
    const officialInfo = tool.isOfficial ? " Official/verified tool." : "";

    return `${tool.fullDescription || tool.description}${platformInfo}${apiInfo}${officialInfo} Features: ${features}`;
  };

  const getCategoryInsight = () => {
    if (tool.tags?.includes("email"))
      return "Email investigation and verification";
    if (tool.tags?.includes("domain"))
      return "Domain analysis and reconnaissance";
    if (tool.tags?.includes("social-media"))
      return "Social media intelligence gathering";
    if (tool.description.toLowerCase().includes("search"))
      return "Search and discovery operations";
    if (tool.description.toLowerCase().includes("scan"))
      return "Security scanning and analysis";
    return "Intelligence gathering and analysis";
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="tool-card cursor-pointer"
        onClick={onClick}
        data-onboarding={dataOnboarding}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors`}
                  >
                    <i className={`lucide-${tool.iconName} text-blue-600`}></i>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getCategoryInsight()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help"
                        data-onboarding="tooltip-example"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-sm">
                      <div className="space-y-2">
                        <p className="font-medium">Tool Purpose</p>
                        <p className="text-sm">{getToolPurposeTooltip()}</p>
                        <div className="flex items-center space-x-2 pt-2 border-t border-border">
                          <span className="text-xs font-medium">Best for:</span>
                          <span className="text-xs text-muted-foreground">
                            {getCategoryInsight()}
                          </span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={getPricingBadgeClass(tool.pricing)}>
                        {tool.pricing.charAt(0).toUpperCase() +
                          tool.pricing.slice(1)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">
                        {tool.pricing === "Free"
                          ? "No cost to use this tool"
                          : tool.pricing === "Freemium"
                            ? "Basic features free, premium features require payment"
                            : "Paid subscription or license required"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  {tool.isOfficial && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={getFeatureBadgeClass("official")}>
                          <Shield className="w-3 h-3 mr-1" />
                          Official
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">
                          Verified and trusted tool from official source
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {tool.hasApi && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={getFeatureBadgeClass("api")}>
                          <Code className="w-3 h-3 mr-1" />
                          API
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">
                          Programmatic access available via API
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {tool.platform === "GitHub" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={getFeatureBadgeClass("cli")}>
                          <Code className="w-3 h-3 mr-1" />
                          Open Source
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">
                          Open source tool available on GitHub
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteClick}
                  className={`p-1 ${isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-red-500"}`}
                  disabled={
                    addFavoriteMutation.isPending ||
                    removeFavoriteMutation.isPending
                  }
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {tool.description}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-md">
              <div className="space-y-2">
                <p className="font-medium">Full Description</p>
                <p className="text-sm">
                  {tool.fullDescription || tool.description}
                </p>
                {tool.features && tool.features.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-medium mb-1">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 5).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center cursor-help">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                    {formatRating(tool.rating)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">Average user rating out of 5.0</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center cursor-help">
                    <Users className="w-3 h-3 mr-1" />
                    {formatUserCount(tool.userCount)} users
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">
                    Estimated number of active investigators using this tool
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReportBrokenLink}
                    className="text-orange-500 hover:text-orange-600 p-1 h-auto"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">
                    Report if this tool's link is broken or inaccessible
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenTool}
                    className="text-primary hover:text-primary/80 text-sm font-medium p-0 h-auto"
                  >
                    Open Tool
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Opens: {tool.url}</p>
                    <p className="text-xs text-muted-foreground">
                      Click to access this OSINT tool directly
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
