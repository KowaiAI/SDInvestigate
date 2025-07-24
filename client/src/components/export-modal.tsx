import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ExportModalProps {
  toolCount: number;
  onClose: () => void;
  filters: any;
}

export default function ExportModal({
  toolCount,
  onClose,
  filters,
}: ExportModalProps) {
  const { toast } = useToast();
  const [format, setFormat] = useState("json");
  const [options, setOptions] = useState({
    includeDescriptions: true,
    includeLinks: true,
    includeStatistics: false,
    includeCategoryInfo: false,
  });

  const exportMutation = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/export", {
        format,
        filters,
        options,
      }),
    onSuccess: async (response) => {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `osint-tools-export-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      onClose();
      toast({
        title: "Export successful",
        description: `${toolCount} tools exported successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Export failed",
        description: "Failed to export tools. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExport = () => {
    exportMutation.mutate();
  };

  const handleOptionChange = (key: string, value: boolean) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Export Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Export Format
            </label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON Data</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                <SelectItem value="xlsx">Excel Workbook</SelectItem>
                <SelectItem value="pdf">PDF Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Include
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="descriptions"
                  checked={options.includeDescriptions}
                  onCheckedChange={(checked) =>
                    handleOptionChange(
                      "includeDescriptions",
                      checked as boolean,
                    )
                  }
                />
                <label
                  htmlFor="descriptions"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  Tool descriptions
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="links"
                  checked={options.includeLinks}
                  onCheckedChange={(checked) =>
                    handleOptionChange("includeLinks", checked as boolean)
                  }
                />
                <label
                  htmlFor="links"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  Direct links
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="statistics"
                  checked={options.includeStatistics}
                  onCheckedChange={(checked) =>
                    handleOptionChange("includeStatistics", checked as boolean)
                  }
                />
                <label
                  htmlFor="statistics"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  Usage statistics
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category"
                  checked={options.includeCategoryInfo}
                  onCheckedChange={(checked) =>
                    handleOptionChange(
                      "includeCategoryInfo",
                      checked as boolean,
                    )
                  }
                />
                <label
                  htmlFor="category"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  Category information
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center text-sm text-slate-600">
              <Info className="w-4 h-4 mr-2 flex-shrink-0" />
              Export will include{" "}
              <span className="font-medium mx-1">{toolCount} tools</span> from
              current search results
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="bg-accent hover:bg-accent/90"
          >
            <Download className="w-4 h-4 mr-2" />
            {exportMutation.isPending ? "Exporting..." : "Export Results"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
