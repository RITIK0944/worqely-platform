import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe, Languages } from 'lucide-react';
import { useLanguage, Language } from '../App';
import { Button } from './ui/button';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' }
];

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'button';
  showLabel?: boolean;
}

export function LanguageSelector({ variant = 'default', showLabel = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  if (variant === 'button') {
    return (
      <div className="flex items-center space-x-2">
        {showLabel && <span className="text-sm font-medium">Language:</span>}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 min-w-28"
        >
          <Languages className="h-4 w-4" />
          <span className="text-sm">{currentLanguage?.flag}</span>
          <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
            <SelectTrigger className="border-0 bg-transparent p-0 h-auto shadow-none">
              <SelectValue>
                {currentLanguage?.native}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="min-w-48">
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.native}</span>
                      <span className="text-xs text-muted-foreground">{lang.name}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-24 h-8">
          <SelectValue>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{currentLanguage?.flag}</span>
              <span className="text-xs">{currentLanguage?.code.toUpperCase()}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-48">
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center space-x-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.native}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {showLabel && <span className="text-sm font-medium">Language:</span>}
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-36">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{currentLanguage?.flag}</span>
              <span>{currentLanguage?.native}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-48">
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center space-x-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.native}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}