import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SDGWheel = () => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const sdgGoals = [
    { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere", color: "bg-sdg-1" },
    { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security", color: "bg-sdg-2" },
    { id: 3, title: "Good Health", description: "Ensure healthy lives and promote well-being", color: "bg-sdg-3" },
    { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education", color: "bg-sdg-4" },
    { id: 5, title: "Gender Equality", description: "Achieve gender equality and empower women", color: "bg-sdg-5" },
    { id: 6, title: "Clean Water", description: "Ensure availability of clean water and sanitation", color: "bg-sdg-6" },
    { id: 7, title: "Clean Energy", description: "Ensure access to affordable, reliable energy", color: "bg-sdg-7" },
    { id: 8, title: "Decent Work", description: "Promote sustained, inclusive economic growth", color: "bg-sdg-8" },
    { id: 9, title: "Innovation", description: "Build resilient infrastructure, promote innovation", color: "bg-sdg-9" },
    { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries", color: "bg-sdg-10" },
    { id: 11, title: "Sustainable Cities", description: "Make cities and human settlements sustainable", color: "bg-sdg-11" },
    { id: 12, title: "Responsible Consumption", description: "Ensure sustainable consumption patterns", color: "bg-sdg-12" },
    { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change", color: "bg-sdg-13" },
    { id: 14, title: "Life Below Water", description: "Conserve and use the oceans sustainably", color: "bg-sdg-14" },
    { id: 15, title: "Life on Land", description: "Protect, restore and promote terrestrial ecosystems", color: "bg-sdg-15" },
    { id: 16, title: "Peace & Justice", description: "Promote peaceful and inclusive societies", color: "bg-sdg-16" },
    { id: 17, title: "Partnerships", description: "Strengthen the means of implementation", color: "bg-sdg-17" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* SDG Wheel Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {sdgGoals.slice(0, 16).map((goal) => (
          <Button
            key={goal.id}
            variant="ghost"
            className={`
              aspect-square p-0 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg
              ${goal.color} hover:opacity-90 text-white font-bold text-lg
              ${selectedGoal === goal.id ? 'scale-110 shadow-lg ring-2 ring-white' : ''}
            `}
            onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
          >
            {goal.id}
          </Button>
        ))}
      </div>

      {/* Center Goal 17 */}
      <div className="flex justify-center mb-6">
        <Button
          variant="ghost"
          className={`
            w-16 h-16 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg
            ${sdgGoals[16].color} hover:opacity-90 text-white font-bold text-xl
            ${selectedGoal === 17 ? 'scale-110 shadow-lg ring-2 ring-white' : ''}
          `}
          onClick={() => setSelectedGoal(selectedGoal === 17 ? null : 17)}
        >
          17
        </Button>
      </div>

      {/* Selected Goal Info */}
      {selectedGoal && (
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold ${sdgGoals[selectedGoal - 1].color}`}>
                {selectedGoal}
              </div>
              <h3 className="text-lg font-semibold">{sdgGoals[selectedGoal - 1].title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {sdgGoals[selectedGoal - 1].description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Default Message */}
      {!selectedGoal && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 sdg-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">SDG</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Explore the 17 Goals</h3>
            <p className="text-muted-foreground text-sm">
              Click on any goal to learn how we're making an impact
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SDGWheel;