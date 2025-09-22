import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Sun, 
  Moon, 
  Sunset,
  Settings,
  Save
} from 'lucide-react';
import { User as UserType } from '../../App';

interface ShiftSelectionProps {
  user: UserType | null;
}

const shiftTypes = [
  {
    id: 'full-time',
    name: 'Full Time',
    description: '8-10 hours daily',
    hours: 'Full day availability',
    icon: Sun,
    color: 'bg-blue-500'
  },
  {
    id: 'half-time',
    name: 'Half Time',
    description: '4-5 hours daily',
    hours: 'Half day availability',
    icon: Sunset,
    color: 'bg-orange-500'
  },
  {
    id: 'part-time',
    name: 'Part Time',
    description: '2-3 hours daily',
    hours: 'Flexible timing',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    id: 'task-based',
    name: 'Task Based',
    description: 'Per job basis',
    hours: 'As per requirement',
    icon: CheckCircle,
    color: 'bg-purple-500'
  }
];

const timeSlots = [
  { id: 'morning', label: 'Morning', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', icon: Sunset },
  { id: 'evening', label: 'Evening', icon: Moon }
];

export function ShiftSelection({ user }: ShiftSelectionProps) {
  const [selectedShift, setSelectedShift] = useState(user?.shiftType || 'full-time');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(['morning', 'afternoon']);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleShiftChange = (shiftId: string) => {
    setSelectedShift(shiftId);
  };

  const handleTimeSlotToggle = (slotId: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleSavePreferences = () => {
    alert('Shift preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Current Status</span>
            </div>
            <Badge className={isAvailable ? 'bg-green-500' : 'bg-red-500'}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">You are currently marked as:</p>
              <p className="font-medium">
                {isAvailable ? 'Available for work' : 'Not available for work'}
              </p>
            </div>
            <Button 
              variant={isAvailable ? "destructive" : "default"}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              {isAvailable ? 'Mark Unavailable' : 'Mark Available'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shift Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Shift Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shiftTypes.map(shift => {
              const IconComponent = shift.icon;
              const isSelected = selectedShift === shift.id;
              
              return (
                <Card 
                  key={shift.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => handleShiftChange(shift.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${shift.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{shift.name}</h3>
                          {isSelected && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{shift.description}</p>
                        <p className="text-xs text-muted-foreground">{shift.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slot Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>Preferred Time Slots</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeSlots.map(slot => {
              const IconComponent = slot.icon;
              const isSelected = selectedTimeSlots.includes(slot.id);
              
              return (
                <div 
                  key={slot.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTimeSlotToggle(slot.id)}
                >
                  <div className={`p-2 rounded ${isSelected ? 'bg-primary text-white' : 'bg-muted'}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{slot.label}</p>
                  </div>
                  {isSelected && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[
              { day: 'Mon', key: 'monday' },
              { day: 'Tue', key: 'tuesday' },
              { day: 'Wed', key: 'wednesday' },
              { day: 'Thu', key: 'thursday' },
              { day: 'Fri', key: 'friday' },
              { day: 'Sat', key: 'saturday' },
              { day: 'Sun', key: 'sunday' }
            ].map(({ day, key }) => {
              const isAvailableDay = availableDays.includes(key);
              return (
                <div key={day} className="text-center">
                  <p className="text-sm font-medium mb-2">{day}</p>
                  <div 
                    className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                      isAvailableDay ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                    onClick={() => {
                      setAvailableDays(prev => 
                        prev.includes(key) 
                          ? prev.filter(d => d !== key)
                          : [...prev, key]
                      );
                    }}
                  >
                    {isAvailableDay ? 'Available' : 'Off'}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Click on any day to toggle your availability. Use the calendar below to mark specific dates as unavailable.
          </p>
        </CardContent>
      </Card>

      {/* Calendar for specific dates */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Unavailable Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={unavailableDates}
            onSelect={(dates) => setUnavailableDates(dates || [])}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Select specific dates when you won't be available for work. This will help us not assign tasks on those days.
            </p>
            {unavailableDates.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Unavailable dates:</p>
                <div className="flex flex-wrap gap-2">
                  {unavailableDates.map((date, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {date.toLocaleDateString()}
                      <button
                        onClick={() => setUnavailableDates(prev => prev.filter((_, i) => i !== index))}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSavePreferences} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Preferences</span>
        </Button>
      </div>
    </div>
  );
}