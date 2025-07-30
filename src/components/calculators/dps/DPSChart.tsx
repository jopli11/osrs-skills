'use client';

import React from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Badge 
} from '@chakra-ui/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useDPSStore } from '@/stores/dpsStore';

// Generate hit distribution data
const generateHitDistribution = (maxHit: number, accuracy: number) => {
  if (maxHit === 0) return [];
  
  const data = [];
  const hitChance = accuracy / 100;
  const missChance = 1 - hitChance;
  
  // Miss chance
  data.push({
    hit: 0,
    probability: missChance * 100,
    damage: 0,
  });
  
  // Hit distribution (assuming uniform distribution for simplicity)
  const hitProbability = hitChance / maxHit;
  for (let i = 1; i <= maxHit; i++) {
    data.push({
      hit: i,
      probability: hitProbability * 100,
      damage: i,
    });
  }
  
  return data;
};



// Custom tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="rgba(42, 30, 15, 0.95)"
        p={3}
        borderRadius="md"
        border="1px solid #ffcb2f"
        boxShadow="lg"
      >
        <Text color="#ffcb2f" fontSize="sm" fontWeight="bold">
          {label === 0 ? 'Miss' : `Hit: ${label}`}
        </Text>
        <Text color="#e0d0b0" fontSize="xs">
          Probability: {payload[0].value.toFixed(2)}%
        </Text>
        {label > 0 && (
          <Text color="#e0d0b0" fontSize="xs">
            Damage: {label}
          </Text>
        )}
      </Box>
    );
  }
  return null;
};

// Hit distribution chart component
const HitDistributionChart: React.FC = () => {
  const { results } = useDPSStore();
  const data = generateHitDistribution(results.maxHit, results.accuracy);
  
  if (data.length === 0) {
    return (
      <VStack spacing={4} py={8}>
        <Text color="#7a7060" fontSize="sm">
          No data to display. Configure your setup to see hit distribution.
        </Text>
      </VStack>
    );
  }
  
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="md" fontWeight="bold" color="#ffcb2f" textAlign="center">
        Hit Distribution
      </Text>
      
      <Box height="300px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3b2914" />
            <XAxis 
              dataKey="hit" 
              stroke="#e0d0b0"
              fontSize={12}
              tickFormatter={(value) => value === 0 ? 'Miss' : value.toString()}
            />
            <YAxis 
              stroke="#e0d0b0"
              fontSize={12}
              label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#e0d0b0' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="probability" 
              fill="#ffcb2f"
              stroke="#211305"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

// DPS breakdown pie chart
const DPSBreakdownChart: React.FC = () => {
  const { results } = useDPSStore();
  
  const data = [
    { name: 'Hit Damage', value: results.dps * (results.accuracy / 100), color: '#ffcb2f' },
    { name: 'Missed Attacks', value: results.dps * (1 - results.accuracy / 100), color: '#8b4513' },
  ];
  
  if (results.dps === 0) {
    return (
      <VStack spacing={4} py={8}>
        <Text color="#7a7060" fontSize="sm">
          No DPS data to display.
        </Text>
      </VStack>
    );
  }
  
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="md" fontWeight="bold" color="#ffcb2f" textAlign="center">
        DPS Breakdown
      </Text>
      
      <Box height="300px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(42, 30, 15, 0.95)',
                border: '1px solid #ffcb2f',
                borderRadius: '6px',
                color: '#e0d0b0',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${value.toFixed(2)}`, 'DPS']}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

// Main chart component with tabs
const DPSChart: React.FC = () => {
  return (
    <Box 
      bg="rgba(42, 30, 15, 0.85)" 
      borderRadius="md" 
      p={6}
      border="2px solid black"
      boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
      backdropFilter="blur(4px)"
      position="relative"
      _after={{
        content: '""',
        position: 'absolute',
        top: '1px',
        left: '1px',
        right: '1px',
        height: '1px',
        backgroundColor: 'rgba(255, 203, 47, 0.2)'
      }}
    >
      <Badge 
        bg="#361f0e" 
        color="#ffcb2f" 
        px={3} 
        py={1.5} 
        borderRadius="sm" 
        mb={4}
        fontWeight="medium"
        border="1px solid black"
        boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
      >
        Analysis Charts
      </Badge>

      <Tabs variant="soft-rounded" colorScheme="yellow" size="sm">
        <TabList mb={4}>
          <Tab color="#e0d0b0" _selected={{ bg: '#ffcb2f', color: '#211305' }}>
            Hit Distribution
          </Tab>
          <Tab color="#e0d0b0" _selected={{ bg: '#ffcb2f', color: '#211305' }}>
            DPS Breakdown
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <HitDistributionChart />
          </TabPanel>
          
          <TabPanel p={0}>
            <DPSBreakdownChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DPSChart; 