import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Store, 
  Globe, 
  Check, 
  CornerDownLeft, 
  Layers, 
  Sliders, 
  FileCheck2, 
  PackageCheck, 
  Boxes, 
  Microscope, 
  FileText, 
  Truck, 
  Repeat, 
  User, 
  Command, 
  Sparkles,
  Tag
} from 'lucide-react';
import { PortalView, ScreenDefinition } from '../../types';
import { SCREENS } from '../../data/screensData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: PortalView;
  onSelectView: (view: PortalView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Central Regulatory' | 'Dispensary Partner OS' | 'Patient Web Portal'>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Icon mapping for screens
  const getScreenIcon = (id: PortalView) => {
    switch (id) {
      case 'regulatory-overview':
        return <ShieldCheck className="w-4 h-4 text-sky-400" />;
      case 'regulatory-salt-mapping':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'regulatory-orders-audit':
        return <FileCheck2 className="w-4 h-4 text-sky-400" />;
      case 'regulatory-settings':
        return <Sliders className="w-4 h-4 text-sky-400" />;
      case 'dispensary-fulfillment':
        return <PackageCheck className="w-4 h-4 text-emerald-400" />;
      case 'dispensary-catalogue':
        return <Store className="w-4 h-4 text-emerald-400" />;
      case 'dispensary-grn':
        return <Search className="w-4 h-4 text-emerald-400" />;
      case 'dispensary-inventory':
        return <Boxes className="w-4 h-4 text-emerald-400" />;
      case 'dispensary-form13':
        return <Microscope className="w-4 h-4 text-emerald-400" />;
      case 'dispensary-earnings':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'customer-search':
        return <Search className="w-4 h-4 text-indigo-400" />;
      case 'customer-detail':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'customer-cart':
        return <FileText className="w-4 h-4 text-indigo-400" />;
      case 'customer-tracking':
        return <Truck className="w-4 h-4 text-indigo-400" />;
      case 'customer-refill':
        return <Repeat className="w-4 h-4 text-indigo-400" />;
      case 'customer-account':
        return <User className="w-4 h-4 text-indigo-400" />;
      default:
        return <Globe className="w-4 h-4 text-slate-400" />;
    }
  };

  // Filtered screens by query and selected category
  const filteredScreens = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    
    return SCREENS.filter((screen) => {
      // Category filter
      if (selectedCategory !== 'All' && screen.category !== selectedCategory) {
        return false;
      }

      if (!trimmed) return true;

      // Match name
      if (screen.name.toLowerCase().includes(trimmed)) return true;

      // Match category
      if (screen.category.toLowerCase().includes(trimmed)) return true;

      // Match badge
      if (screen.badge.toLowerCase().includes(trimmed)) return true;

      // Match description
      if (screen.description && screen.description.toLowerCase().includes(trimmed)) return true;

      // Match keywords
      if (screen.keywords && screen.keywords.some((k) => k.toLowerCase().includes(trimmed))) return true;

      // Match id
      if (screen.id.toLowerCase().includes(trimmed)) return true;

      return false;
    });
  }, [query, selectedCategory]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredScreens.length, query, selectedCategory]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      // Lock background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard events when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          filteredScreens.length > 0 ? (prev + 1) % filteredScreens.length : 0
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          filteredScreens.length > 0 ? (prev - 1 + filteredScreens.length) % filteredScreens.length : 0
        );
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredScreens[selectedIndex]) {
          handleSelect(filteredScreens[selectedIndex].id);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredScreens, selectedIndex]);

  // Scroll selected element into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelect = (id: PortalView) => {
    onSelectView(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Screen Search Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 16 screens by name, category, or badge identifier..."
            className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0 font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-mono"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 font-semibold shadow-inner">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
          {(['All', 'Central Regulatory', 'Dispensary Partner OS', 'Patient Web Portal'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' 
              ? SCREENS.length 
              : SCREENS.filter(s => s.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat === 'All' ? 'All Screens' : cat}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-sky-700 text-sky-100' : 'bg-slate-800 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div 
          ref={listRef} 
          className="flex-1 overflow-y-auto divide-y divide-slate-850 p-2 space-y-1 max-h-[50vh] sm:max-h-[55vh]"
        >
          {filteredScreens.length === 0 ? (
            <div className="py-12 text-center px-4 space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300 font-display-heading">
                No matching screens found
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No screens match "<span className="text-sky-400">{query}</span>". Try searching by name (e.g. <span className="text-slate-300">"Inventory"</span>, <span className="text-slate-300">"Fulfillment"</span>), category, or badge identifier (e.g. <span className="text-slate-300">"Rule 65"</span>, <span className="text-slate-300">"FEFO"</span>, <span className="text-slate-300">"IoT"</span>).
              </p>
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-mono font-medium border border-slate-700 inline-block transition-colors"
                >
                  Clear Filters & Show All 16 Screens
                </button>
              )}
            </div>
          ) : (
            filteredScreens.map((screen, index) => {
              const isSelected = index === selectedIndex;
              const isCurrent = screen.id === currentView;

              return (
                <div
                  key={screen.id}
                  data-index={index}
                  onClick={() => handleSelect(screen.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-3.5 py-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 border ${
                    isSelected
                      ? 'bg-slate-800/90 border-sky-500/50 shadow-md ring-1 ring-sky-500/30'
                      : 'bg-slate-900/40 hover:bg-slate-850 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${
                      screen.category === 'Central Regulatory'
                        ? 'bg-sky-950/60 border-sky-500/30'
                        : screen.category === 'Dispensary Partner OS'
                        ? 'bg-emerald-950/60 border-emerald-500/30'
                        : 'bg-indigo-950/60 border-indigo-500/30'
                    }`}>
                      {getScreenIcon(screen.id)}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-display-heading truncate">
                          {screen.name}
                        </h4>

                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30 flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" />
                            <span>ACTIVE SCREEN</span>
                          </span>
                        )}
                      </div>

                      {screen.description && (
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {screen.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        {/* Category Pill */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                          screen.category === 'Central Regulatory'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            : screen.category === 'Dispensary Partner OS'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          {screen.category}
                        </span>

                        {/* Badge Identifier */}
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5 text-amber-400" />
                          <span>{screen.badge}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 self-center text-xs font-mono">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-sky-400 bg-sky-950/60 px-2 py-1 rounded-lg border border-sky-500/40 text-[11px] font-semibold">
                        <span>Jump</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Footer with Hotkey Legend */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↵</kbd>
              <span>to jump</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd>
              <span>to close</span>
            </span>
          </div>

          <div className="text-slate-500">
            Showing <span className="text-white font-bold">{filteredScreens.length}</span> of 16 screens
          </div>
        </div>
      </div>
    </div>
  );
};
