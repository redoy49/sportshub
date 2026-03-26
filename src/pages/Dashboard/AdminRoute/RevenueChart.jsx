import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download, ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 9500 },
  { month: "Mar", revenue: 8500 },
  { month: "Apr", revenue: 10000 },
  { month: "May", revenue: 13721 },
  { month: "Jun", revenue: 9000 },
  { month: "Jul", revenue: 8000 },
  { month: "Aug", revenue: 9500 },
  { month: "Sep", revenue: 7000 },
  { month: "Oct", revenue: 8500 },
  { month: "Nov", revenue: 7500 },
  { month: "Dec", revenue: 6000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Annual Revenue
        </h3>

        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-xs border px-3 py-1 rounded-lg">
            Year <ChevronDown size={14} />
          </button>
          <Download size={16} className="text-gray-500" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
          <Tooltip formatter={(v) => [`৳${v}`, "Revenue"]} />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#84B179"
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;