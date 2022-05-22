import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from "recharts";
import numeral from "numeral";
import { format } from "date-fns";

const PriceChart = ({ data }: { data: { date: number; price: number }[] }) => {
    // Calculate Y Axis Range
    const minPrice = data.reduce((previous, current) => (previous.price < current.price ? previous : current)).price;

    const maxPrice = data.reduce((previous, current) => (previous.price > current.price ? previous : current)).price;

    const yAxisRange = [minPrice - (maxPrice - minPrice) / 2, maxPrice + (maxPrice - minPrice) / 2];

    return (
        <ResponsiveContainer width={"95%"} height={250}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y="0" x2="0" y2="1">
                        <stop offset={"0%"} stopColor="#ffa500" stopOpacity={0.4}></stop>
                        <stop offset={"75%"} stopColor="#ffa500" stopOpacity={0.05}></stop>
                    </linearGradient>
                </defs>

                <Area dataKey={"price"} stroke={"#ffa500"} fill={"url(#color)"}></Area>

                <XAxis
                    dataKey={"date"}
                    axisLine={false}
                    tickLine={false}
                    tickCount={4}
                    tickFormatter={(timestamp) => {
                        return format(new Date(timestamp), "          MMM, d          ");
                    }}
                ></XAxis>
                <YAxis
                    dataKey={"price"}
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `${numeral(number).format("0a")}`}
                    domain={yAxisRange}
                ></YAxis>
                <Tooltip content={<CustomToolTip />} />
                <CartesianGrid opacity={0.3} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const CustomToolTip = ({ active, payload, label }: any) => {
    if (active) {
        return (
            <div className="tooltip">
                <p>₹ {numeral(payload[0].value).format("0,0")}</p>
                <small>{format(new Date(label), "MMM d, yyyy")}</small>
            </div>
        );
    }
    return <></>;
};

export default PriceChart;
