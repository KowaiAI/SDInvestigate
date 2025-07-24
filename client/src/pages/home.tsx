import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ToolCard from "@/components/tool-card";
import ExportModal from "@/components/export-modal";
import ToolDetailModal from "@/components/tool-detail-modal";
import { HelpBubble, useHelpBubble } from "@/components/help-bubble";
import { OnboardingTrigger, HelpButton } from "@/components/onboarding-trigger";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-steps";
import { apiRequest } from "@/lib/queryClient";
import type { Category, Tool, UserOnboarding } from "@shared/schema";

interface HomeProps {
  params?: { slug?: string };
}

export default function Home({ params }: HomeProps) {
  const [location] = useLocation();
  const categorySlug = params?.slug || 'social-media';
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    pricing: "",
    hasApi: false,
    isFree: false,
    isPremium: false
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 6;

  // Help bubble state
  const {
    currentStep,
    isOnboarding,
    startOnboarding,
    nextStep,
    skipOnboarding,
    completeOnboarding,
  } = useHelpBubble();

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch current category
  const { data: currentCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${categorySlug}`],
    enabled: !!categorySlug,
  });

  // Build filters for API call
  const buildFilters = () => {
    const filters: any = {};
    
    if (currentCategory) {
      filters.categoryId = currentCategory.id;
    }
    
    if (searchQuery.trim()) {
      filters.search = searchQuery.trim();
    }
    
    if (selectedFilters.pricing) {
      filters.pricing = selectedFilters.pricing;
    }
    
    if (selectedFilters.hasApi) {
      filters.hasApi = true;
    }
    
    return filters;
  };

  // Fetch tools
  const { data: allTools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools", buildFilters()],
  });

  // Fetch user onboarding status
  const { data: onboardingData } = useQuery<UserOnboarding>({
    queryKey: ["/api/onboarding"],
  });

  // Update onboarding step mutation
  const updateOnboardingMutation = useMutation({
    mutationFn: (step: string) => apiRequest(`/api/onboarding/${step}`, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/onboarding"] });
    },
  });

  // Check if user should see onboarding
  useEffect(() => {
    if (onboardingData && !onboardingData.completedOnboarding && !isOnboarding) {
      // Auto-start onboarding for new users after a short delay
      const timer = setTimeout(() => {
        startOnboarding('welcome');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onboardingData, isOnboarding, startOnboarding]);

  // Handle onboarding step changes
  const handleStepChange = (stepId: string | null) => {
    if (stepId) {
      updateOnboardingMutation.mutate(stepId);
    }
    nextStep(stepId);
  };

  const handleOnboardingComplete = () => {
    updateOnboardingMutation.mutate('complete');
    completeOnboarding();
  };

  const handleSkipOnboarding = () => {
    updateOnboardingMutation.mutate('complete');
    skipOnboarding();
  };

  const handleStartTour = () => {
    startOnboarding('welcome');
  };

  // Sort and paginate tools
  const sortedTools = [...allTools].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "recent":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTools.length / toolsPerPage);
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const currentTools = sortedTools.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters: typeof selectedFilters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate stats for header
  const totalToolsCount = categories.reduce((sum, cat) => {
    const categoryTools = allTools.filter(tool => tool.categoryId === cat.id);
    return sum + categoryTools.length;
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header toolCount={0} onExport={handleExport} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-slate-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Help system components */}
      <HelpBubble
        steps={onboardingSteps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onComplete={handleOnboardingComplete}
        onSkip={handleSkipOnboarding}
      />
      
      <OnboardingTrigger
        onStartOnboarding={handleStartTour}
        isVisible={!onboardingData?.completedOnboarding && !isOnboarding}
      />
      
      <HelpButton onStartOnboarding={handleStartTour} data-onboarding="help-button" />
      <Header toolCount={totalToolsCount} onExport={handleExport} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            categories={categories}
            currentCategorySlug={categorySlug}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            filters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
          
          <main className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {currentCategory?.name || "OSINT Tools"}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {currentCategory?.description || "Open Source Intelligence Investigation Tools"}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Sort by Relevance</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="rating">Sort by Rating</SelectItem>
                      <SelectItem value="recent">Sort by Recent</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-slate-600">
                    {sortedTools.length} tools found
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            {currentTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => handleToolClick(tool)}
                    data-onboarding={index === 0 ? "tool-card" : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <i className="fas fa-search text-4xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-600">
                  {searchQuery 
                    ? `No tools match your search for "${searchQuery}"`
                    : "No tools available in this category"
                  }
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedTools.length)} of {sortedTools.length} results
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {isExportModalOpen && (
        <ExportModal
          toolCount={sortedTools.length}
          onClose={() => setIsExportModalOpen(false)}
          filters={buildFilters()}
        />
      )}

      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          category={currentCategory}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
