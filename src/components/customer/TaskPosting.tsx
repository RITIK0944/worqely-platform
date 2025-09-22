import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { PlusCircle, Clock, MapPin, DollarSign, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Task } from '../../App';

interface TaskPostingProps {
  user: any;
  onTaskPosted: (task: Task) => void;
  selectedCategory?: string;
}

const workCategories = [
  'Plumber',
  'Carpenter', 
  'Mason',
  'Construction Labour',
  'Maid',
  'Cook/Chef',
  'Gardener',
  'Security Guard',
  'General Labour',
  'Painter',
  'Delivery Boy',
  'Electrician',
  'Welder',
  'Waiter',
  'Care Taker',
  'Other'
];

const urgencyLevels = [
  { value: 'low', label: 'Low - Within a week', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium - Within 2-3 days', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High - Urgent (Today/Tomorrow)', color: 'bg-red-100 text-red-800' }
];

export function TaskPosting({ user, onTaskPosted, selectedCategory }: TaskPostingProps) {
  const [isPostingMode, setIsPostingMode] = useState(selectedCategory ? true : false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: selectedCategory || '',
    location: '',
    budget: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    deadline: '',
    requirements: ['']
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [postedTasks, setPostedTasks] = useState<Task[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.description.trim()) newErrors.description = 'Task description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Valid budget amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now().toString(),
        customerId: user.id,
        customerName: user.fullName,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        budget: Number(formData.budget),
        urgency: formData.urgency,
        createdAt: new Date().toISOString(),
        deadline: formData.deadline || undefined,
        status: 'posted',
        requirements: formData.requirements.filter(req => req.trim()),
        contactInfo: {
          phone: user.mobile,
          email: user.email
        }
      };

      setPostedTasks(prev => [newTask, ...prev]);
      onTaskPosted(newTask);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        budget: '',
        urgency: 'medium',
        deadline: '',
        requirements: ['']
      });
      setIsPostingMode(false);
      setLoading(false);
    }, 1000);
  };

  const getUrgencyConfig = (urgency: string) => {
    return urgencyLevels.find(level => level.value === urgency) || urgencyLevels[1];
  };

  if (!isPostingMode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Post a Task
            </CardTitle>
            <CardDescription>
              Post tasks for workers to view and apply. Get your work done efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsPostingMode(true)}
              className="w-full"
              size="lg"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Task
            </Button>
          </CardContent>
        </Card>

        {/* Posted Tasks */}
        {postedTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Posted Tasks</CardTitle>
              <CardDescription>Track and manage your posted tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {postedTasks.map((task) => {
                  const urgencyConfig = getUrgencyConfig(task.urgency);
                  return (
                    <div key={task.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                        <Badge className={urgencyConfig.color}>
                          {task.urgency.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {task.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ₹{task.budget}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{task.category}</Badge>
                        <Badge 
                          className={task.status === 'posted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                        >
                          {task.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create New Task</CardTitle>
            <CardDescription>
              Provide detailed information about your task requirements
            </CardDescription>
          </div>
          {!selectedCategory && (
            <Button 
              variant="outline" 
              onClick={() => setIsPostingMode(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Task Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Fix leaking kitchen faucet"
                required
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Task Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the work you need done in detail..."
                rows={4}
                required
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('category', value)}
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work category" />
                  </SelectTrigger>
                  <SelectContent>
                    {workCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Area"
                  required
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Budget and Timeline */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Budget & Timeline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (₹) *</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="1"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
                {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Preferred Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Urgency Level *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {urgencyLevels.map(level => (
                  <Button
                    key={level.value}
                    type="button"
                    variant={formData.urgency === level.value ? "default" : "outline"}
                    className="justify-start h-auto p-3"
                    onClick={() => handleSelectChange('urgency', level.value)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{level.value.toUpperCase()}</div>
                      <div className="text-xs opacity-70">{level.label.split(' - ')[1]}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Requirements</h3>
            
            <div className="space-y-2">
              <Label>Task Requirements</Label>
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Enter a requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting Task...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Post Task
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}