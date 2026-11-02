import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
        <li>
          <button 
            onClick={() => onNavigate('/')}
            className="hover:text-[#0D47A1] transition-colors"
          >
            Home
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-slate-400">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                {item.path && !isLast ? (
                  <button
                    onClick={() => onNavigate(item.path!)}
                    className="hover:text-[#0D47A1] transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="font-semibold text-slate-900" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
