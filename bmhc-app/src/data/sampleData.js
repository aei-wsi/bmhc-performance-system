// Sample contract data for demonstration
export const sampleContract = {
  id: 1,
  contractor: "Jordan Martinez",
  role: "Community Engagement Specialist",
  startDate: "2024-01-15",
  obligations: [
    {
      id: 1,
      clause: "Submit weekly engagement reports documenting partner interactions, outreach activity, and follow-through actions",
      frequency: "Weekly",
      category: "Documentation"
    },
    {
      id: 2,
      clause: "Collect client service feedback and submit engagement documentation for each client interaction",
      frequency: "Per interaction",
      category: "Client Engagement"
    },
    {
      id: 3,
      clause: "Maintain positive engagement quality and client satisfaction",
      frequency: "Ongoing",
      category: "Quality"
    }
  ]
};

// Sample KPI data for demonstration
export const sampleKPIs = [
  {
    id: 1,
    obligationId: 1,
    name: "Weekly Engagement Reports",
    target: 46,
    actual: 43,
    percentage: 93,
    status: "meeting",
    evidence: "43 reports submitted, 41 approved",
    trend: "stable"
  },
  {
    id: 2,
    obligationId: 2,
    name: "Client Survey Completion",
    target: 70,
    actual: 56,
    percentage: 56,
    status: "needs-improvement",
    evidence: "72 of 128 engagements (56%)",
    trend: "declining"
  },
  {
    id: 3,
    obligationId: 3,
    name: "Client Satisfaction Score",
    target: 4.0,
    actual: 4.6,
    percentage: 115,
    status: "exceeds",
    evidence: "4.6 avg, 88% rated 4+ stars",
    trend: "improving"
  }
];
