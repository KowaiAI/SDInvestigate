import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Star, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@shared/schema";

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
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
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const getPricingBadgeClass = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return 'pricing-badge pricing-free';
      case 'freemium':
        return 'pricing-badge pricing-freemium';
      case 'premium':
        return 'pricing-badge pricing-premium';
      default:
        return 'pricing-badge bg-gray-100 text-gray-800';
    }
  };

  const getFeatureBadgeClass = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'official':
        return 'feature-badge feature-official';
      case 'api':
        return 'feature-badge feature-api';
      case 'cli':
        return 'feature-badge feature-cli';
      case 'python':
        return 'feature-badge feature-python';
      case 'online':
        return 'feature-badge feature-online';
      default:
        return 'feature-badge bg-gray-100 text-gray-800';
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

  return (
    <div className="tool-card cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-${tool.iconColor}-100 rounded-lg flex items-center justify-center`}>
              <i className={`${tool.iconType} ${tool.iconName} text-${tool.iconColor}-600`}></i>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{tool.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={getPricingBadgeClass(tool.pricing)}>
                  {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                </span>
                {tool.isOfficial && (
                  <span className={getFeatureBadgeClass('official')}>
                    Official
                  </span>
                )}
                {tool.hasApi && (
                  <span className={getFeatureBadgeClass('api')}>
                    API
                  </span>
                )}
                {tool.platform === 'cli' && (
                  <span className={getFeatureBadgeClass('cli')}>
                    CLI
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={`p-1 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`}
            disabled={addFavoriteMutation.isPending || removeFavoriteMutation.isPending}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
              {formatRating(tool.rating)}
            </span>
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {formatUserCount(tool.userCount)} users
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenTool}
            className="text-primary hover:text-primary/80 text-sm font-medium p-0 h-auto"
          >
            Open Tool
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
