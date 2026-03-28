import React from "react";
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from "recharts";

const funnelData = [
  { stage: "Visitors", value: 1000 },
  { stage: "Leads", value: 800 },
  { stage: "Opportunities", value: 600 },
  { stage: "Customers", value: 400 },
];

const ConversionFunnelScreen = () => {
  return (
    <div style={{ width: "100%", minHeight: "400px", background: "#222222", padding: "20px", borderRadius: "10px" }}>
     
      <p style={{ color: "#EBBE4D", marginBottom: "20px" }}>
        Purpose: This funnel shows how visitors progress through different stages of the sales process, 
        highlighting where potential customers drop off. It helps in optimizing conversions.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <FunnelChart>
          <Tooltip 
            cursor={{ fill: "rgba(235, 190, 77, 0.2)" }} 
            formatter={(value) => [`${value}`, "Users"]} 
          />
          <Funnel 
            dataKey="value" 
            data={funnelData} 
            isAnimationActive 
            fill="#EBBE4D"
          >
            <LabelList position="right" fill="#EBBE4D" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionFunnelScreen;
