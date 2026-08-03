"use client";

import React from "react";
import rawStats from "@/data/propertyManagersStats.json";
import { StatItem } from "./types";

interface PropertyManagersStatsProps {
  stats?: StatItem[];
}

export default function PropertyManagersStats({
  stats = rawStats as StatItem[],
}: PropertyManagersStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between"
        >
          <h2 className={`text-3xl font-bold ${item.textColor}`}>{item.value}</h2>
          <p className="text-xs font-medium text-gray-600 mt-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
