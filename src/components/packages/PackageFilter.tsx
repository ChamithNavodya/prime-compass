'use client';

import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterOptions } from '@/types';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'beach', label: 'Beach' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
];

interface PackageFilterProps {
  filters: FilterOptions;
  onChange: (f: FilterOptions) => void;
}

export default function PackageFilter({ filters, onChange }: PackageFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
      {/* Category tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Tabs
          value={filters.category}
          onChange={(_, v) => onChange({ ...filters, category: v })}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--secondary)',
              height: 3,
              borderRadius: 2,
            },
            '& .MuiTab-root': {
              color: 'var(--text-secondary)',
              '&.Mui-selected': {
                color: 'var(--primary)',
                fontWeight: 700,
              },
            },
          }}
        >
          {CATEGORIES.map((cat) => (
            <Tab key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Tabs>

        <button
          onClick={() => setShowAdvanced((p) => !p)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
            showAdvanced
              ? 'bg-primary text-white'
              : 'border border-gray-200 text-[var(--text-secondary)] hover:border-primary hover:text-primary'
          }`}
        >
          <FilterListIcon fontSize="small" />
          Filters
        </button>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Price range */}
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-3">
              Price Range: ${filters.minPrice} – ${filters.maxPrice}
            </p>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={(_, val) => {
                const [min, max] = val as number[];
                onChange({ ...filters, minPrice: min, maxPrice: max });
              }}
              min={0}
              max={5000}
              step={100}
              sx={{
                color: 'var(--primary)',
                '& .MuiSlider-thumb': { width: 16, height: 16 },
              }}
            />
          </div>

          {/* Sort */}
          <FormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) =>
                onChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
              }
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>

          {/* Reset */}
          <div className="flex items-end">
            <button
              onClick={() =>
                onChange({
                  category: 'all',
                  minPrice: 0,
                  maxPrice: 5000,
                  duration: '',
                  sortBy: 'popularity',
                })
              }
              className="px-4 py-2 text-sm text-[var(--text-secondary)] border border-gray-200 rounded-lg cursor-pointer hover:border-red-300 hover:text-red-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
