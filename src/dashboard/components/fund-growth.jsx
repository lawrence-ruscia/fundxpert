import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import fundgrowth from '../data/fund-growth.json';
export const description = 'An interactive area chart';

const chartConfig = {
  personal: {
    label: 'Personal',
    color: 'var(--chart-1)',
  },
  employer: {
    label: 'Employer',
    color: 'var(--chart-2)',
  },
  interest: {
    label: 'Interest',
    color: 'var(--chart-3)',
  },
  total: {
    label: 'Total',
    color: 'var(--chart-4)',
  },
};

export function FundGrowthChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('3m');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('3m');
    }
  }, [isMobile]);

  const fundMockData = fundgrowth;

  const filteredData = fundMockData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2025-04-01');

    // Default to showing all data
    if (timeRange === 'all') {
      return true;
    }

    let monthsToSubtract = 3;
    if (timeRange === '1y') {
      monthsToSubtract = 12;
    } else if (timeRange === '6m') {
      monthsToSubtract = 6;
    } else if (timeRange === '3m') {
      monthsToSubtract = 3;
    }

    const startDate = new Date(referenceDate);
    startDate.setMonth(startDate.getMonth() - monthsToSubtract);
    return date >= startDate;
  });

  const getTimeRangeLabel = (range) => {
    switch (range) {
      case 'all':
        return 'All Time';
      case '1y':
        return '1 Year';
      case '6m':
        return '6 Months';
      case '3m':
        return '3 Months';
      default:
        return '3 Months';
    }
  };

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Provident Fund Growth</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Total fund value: ₱
            {filteredData.length > 0
              ? filteredData[filteredData.length - 1].total.toLocaleString()
              : 0}{' '}
            ({getTimeRangeLabel(timeRange)})
          </span>
          <span className='@[540px]/card:hidden'>
            ₱
            {filteredData.length > 0
              ? filteredData[filteredData.length - 1].total.toLocaleString()
              : 0}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={setTimeRange}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem value='all'>All Time</ToggleGroupItem>
            <ToggleGroupItem value='1y'>1 Year</ToggleGroupItem>
            <ToggleGroupItem value='6m'>6 Months</ToggleGroupItem>
            <ToggleGroupItem value='3m'>3 Months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Select a value'
            >
              <SelectValue placeholder={getTimeRangeLabel(timeRange)} />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='all' className='rounded-lg'>
                All Time
              </SelectItem>
              <SelectItem value='1y' className='rounded-lg'>
                1 Year
              </SelectItem>
              <SelectItem value='6m' className='rounded-lg'>
                6 Months
              </SelectItem>
              <SelectItem value='3m' className='rounded-lg'>
                3 Months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[350px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillPersonal' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--chart-1)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--chart-1)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillEmployer' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--chart-2)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--chart-2)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillInterest' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--chart-3)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--chart-3)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: '2-digit',
                });
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : filteredData.length - 1}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    });
                  }}
                  valueFormatter={(value) => `₱${value.toLocaleString()}`}
                  indicator='dot'
                />
              }
            />

            <ChartLegend content={<ChartLegendContent />} />

            <Area
              dataKey='personal'
              type='natural'
              fill='url(#fillPersonal)'
              stroke='var(--chart-1)'
              stackId='a'
            />
            <Area
              dataKey='employer'
              type='natural'
              fill='url(#fillEmployer)'
              stroke='var(--chart-2)'
              stackId='a'
            />
            <Area
              dataKey='interest'
              type='natural'
              fill='url(#fillInterest)'
              stroke='var(--chart-3)'
              stackId='a'
            />
            <Area
              dataKey='total'
              type='natural'
              fill='none'
              stroke='var(--chart-4)'
              strokeWidth={2}
              strokeDasharray='5 5'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
