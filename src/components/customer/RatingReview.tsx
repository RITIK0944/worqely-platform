import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Star, User, Calendar, MessageSquare } from 'lucide-react';
import { User as UserType } from '../../App';

interface RatingReviewProps {
  user: UserType;
}

// Mock data for workers to review
const mockWorkersToReview = [
  {
    id: 'W001',
    name: 'Rajesh Kumar',
    service: 'Plumber',
    bookingId: 'BK001',
    date: '2024-01-15',
    hasReview: false
  },
  {
    id: 'W002',
    name: 'Suresh Patel',
    service: 'Electrician',
    bookingId: 'BK002',
    date: '2024-01-12',
    hasReview: false
  }
];

// Mock previous reviews
const mockPreviousReviews = [
  {
    id: 'R001',
    workerName: 'Amit Singh',
    service: 'Carpenter',
    rating: 5,
    review: 'Excellent work! Very professional and completed the job perfectly.',
    date: '2024-01-10',
    helpful: 12
  },
  {
    id: 'R002',
    workerName: 'Manoj Sharma',
    service: 'Painter',
    rating: 4,
    review: 'Good work, completed on time. Could improve on cleanliness.',
    date: '2024-01-08',
    helpful: 8
  }
];

export function RatingReview({ user }: RatingReviewProps) {
  const [activeReview, setActiveReview] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [reviews, setReviews] = useState<{[key: string]: string}>({});

  const handleRatingChange = (workerId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [workerId]: rating
    }));
  };

  const handleReviewChange = (workerId: string, review: string) => {
    setReviews(prev => ({
      ...prev,
      [workerId]: review
    }));
  };

  const handleSubmitReview = (workerId: string, workerName: string) => {
    const rating = ratings[workerId];
    const review = reviews[workerId];
    
    if (rating) {
      alert(`Review submitted for ${workerName}!\nRating: ${rating} stars\nReview: ${review || 'No written review'}`);
      
      // Clear the form
      setRatings(prev => {
        const newRatings = { ...prev };
        delete newRatings[workerId];
        return newRatings;
      });
      setReviews(prev => {
        const newReviews = { ...prev };
        delete newReviews[workerId];
        return newReviews;
      });
      setActiveReview(null);
    }
  };

  const renderStarRating = (workerId: string, currentRating: number = 0, interactive: boolean = true) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 ${
              star <= currentRating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => handleRatingChange(workerId, star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rating & Reviews</CardTitle>
          <CardDescription>Rate workers and share your experience</CardDescription>
        </CardHeader>
      </Card>

      {/* Pending Reviews */}
      {mockWorkersToReview.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Reviews</CardTitle>
            <CardDescription>
              Please rate and review these workers you've recently worked with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWorkersToReview.map((worker) => (
                <Card key={worker.id} className="border-dashed border-yellow-300 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {worker.service} • {worker.date} • Booking #{worker.bookingId}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                        Review Pending
                      </Badge>
                    </div>

                    {activeReview === worker.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Rate your experience (1-5 stars)
                          </label>
                          {renderStarRating(worker.id, ratings[worker.id] || 0, true)}
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Write a review (optional)
                          </label>
                          <Textarea
                            placeholder="Share your experience to help other customers..."
                            value={reviews[worker.id] || ''}
                            onChange={(e) => handleReviewChange(worker.id, e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleSubmitReview(worker.id, worker.name)}
                            disabled={!ratings[worker.id]}
                          >
                            Submit Review
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveReview(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => setActiveReview(worker.id)}
                        className="w-full"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Rate & Review
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Previous Reviews</CardTitle>
          <CardDescription>Reviews you've submitted for workers</CardDescription>
        </CardHeader>
        <CardContent>
          {mockPreviousReviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You haven't submitted any reviews yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockPreviousReviews.map((review) => (
                <Card key={review.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{review.workerName}</h3>
                          <p className="text-sm text-muted-foreground">{review.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStarRating(review.id, review.rating, false)}
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3">"{review.review}"</p>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Review Submitted
                      </Badge>
                      <span className="text-muted-foreground">
                        {review.helpful} people found this helpful
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Review Guidelines</h3>
          </div>
          <ul className="text-sm space-y-2 text-blue-800">
            <li>• Be honest and specific about your experience</li>
            <li>• Focus on the quality of work and professionalism</li>
            <li>• Mention punctuality and communication skills</li>
            <li>• Help other customers make informed decisions</li>
            <li>• Keep reviews respectful and constructive</li>
          </ul>
        </CardContent>
      </Card>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockPreviousReviews.length}</div>
            <div className="text-sm text-muted-foreground">Reviews Written</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {mockPreviousReviews.length > 0 
                ? (mockPreviousReviews.reduce((sum, r) => sum + r.rating, 0) / mockPreviousReviews.length).toFixed(1)
                : '0'
              }⭐
            </div>
            <div className="text-sm text-muted-foreground">Average Rating Given</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {mockPreviousReviews.reduce((sum, r) => sum + r.helpful, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Helpful Votes Received</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}