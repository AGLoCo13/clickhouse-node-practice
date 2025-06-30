/* src/components/DonutChart.js ----------------------------------------- */
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const PALETTE = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',
                 '#845EC2', '#4D8076', '#F9A52C', '#D65DB1',
                 '#FFC75F', '#2C73D2'];                          // ≤ 10 colours

export default function DonutChart({ data, dataKey, nameKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          label
        >
          {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
