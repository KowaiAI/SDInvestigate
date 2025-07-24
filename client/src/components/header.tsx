import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

interface HeaderProps {
  toolCount: number;
  onExport: () => void;
}

export default function Header({ toolCount, onExport }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3" data-onboarding="main-header">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Search className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">S&D Intel Investigator</h1>
              <p className="text-xs text-slate-500">OSINT Tool Directory</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-slate-600">
              <i className="fas fa-database mr-2"></i>
              <span>{toolCount.toLocaleString()}</span> Tools Available
            </div>
            <Button onClick={onExport} className="bg-accent hover:bg-accent/90" data-onboarding="export-button">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
