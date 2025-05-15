import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import fundgrowth from '../data/fund-growth.json';

export function SectionCards() {
  // Get the latest and previous month data for percentage change calculation
  const latestData = fundgrowth.slice(-1)[0];
  const previousMonthData = fundgrowth.slice(-2, -1)[0];

  // Calculate cumulative totals (all-time accumulation)
  const totalPersonal = fundgrowth
    .map((month) => month.personal)
    .reduce((total, personal) => total + personal);
  const totalEmployer = fundgrowth
    .map((month) => month.employer)
    .reduce((total, employer) => total + employer);
  const totalInterest = fundgrowth
    .map((month) => month.interest)
    .reduce((total, interest) => total + interest);
  const totalSavings = totalPersonal + totalEmployer + totalInterest;

  // Calculate the current month's individual contributions
  const currentMonthPersonal = latestData.personal;
  const currentMonthEmployer = latestData.employer;
  const currentMonthInterest = latestData.interest;

  const currentMonthTotal =
    currentMonthPersonal + currentMonthEmployer + currentMonthInterest;

  // Calculate percentage changes from previous month to current month
  const calculatePercentChange = (current, previous) => {
    if (previous === 0) return 0;
    const change = ((current - previous) / previous) * 100;
    return Math.round(change * 10) / 10;
  };

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate month-to-month percentage changes for each category
  const personalPercentChange = calculatePercentChange(
    latestData.personal,
    previousMonthData?.personal || 0
  );
  const employerPercentChange = calculatePercentChange(
    latestData.employer,
    previousMonthData?.employer || 0
  );
  const interestPercentChange = calculatePercentChange(
    latestData.interest,
    previousMonthData?.interest || 0
  );
  const totalPercentChange = calculatePercentChange(
    latestData.total,
    previousMonthData?.total || 0
  );

  // Helper function to determine if trend is up or down and render appropriate icon
  const renderTrendIcon = (percentChange) => {
    const numChange = parseFloat(percentChange);
    if (numChange > 0) {
      return <IconTrendingUp className='size-4' />;
    } else if (numChange < 0) {
      return <IconTrendingDown className='size-4' />;
    }
    return null;
  };

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Personal Contributions</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₱{formatNumber(totalPersonal)}
          </CardTitle>
          <div className='text-sm text-muted-foreground mt-1'>
            This month: ₱{formatNumber(currentMonthPersonal)}
          </div>
          <CardAction>
            <Badge
              variant={
                parseFloat(personalPercentChange) >= 0
                  ? 'outline'
                  : 'destructive'
              }
            >
              {renderTrendIcon(personalPercentChange)}
              {personalPercentChange > 0 ? '+' : ''}
              {personalPercentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {personalPercentChange > 0 ? '+' : ''}
            {personalPercentChange}% from last month{' '}
            {renderTrendIcon(personalPercentChange)}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Employer Matches</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₱{formatNumber(totalEmployer)}
          </CardTitle>
          <div className='text-sm text-muted-foreground mt-1'>
            This month: ₱{formatNumber(currentMonthEmployer)}
          </div>
          <CardAction>
            <Badge
              variant={
                parseFloat(employerPercentChange) >= 0
                  ? 'outline'
                  : 'destructive'
              }
            >
              {renderTrendIcon(employerPercentChange)}
              {employerPercentChange > 0 ? '+' : ''}
              {employerPercentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {employerPercentChange > 0 ? '+' : ''}
            {employerPercentChange}% from last month{' '}
            {renderTrendIcon(employerPercentChange)}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Interest Earned</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₱{formatNumber(totalInterest)}
          </CardTitle>
          <div className='text-sm text-muted-foreground mt-1'>
            This month: ₱{formatNumber(currentMonthInterest)}
          </div>
          <CardAction>
            <Badge
              variant={
                parseFloat(interestPercentChange) >= 0
                  ? 'outline'
                  : 'destructive'
              }
            >
              {renderTrendIcon(interestPercentChange)}
              {interestPercentChange > 0 ? '+' : ''}
              {interestPercentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {interestPercentChange > 0 ? '+' : ''}
            {interestPercentChange}% from last month{' '}
            {renderTrendIcon(interestPercentChange)}
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Savings</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₱{formatNumber(totalSavings)}
          </CardTitle>
          <div className='text-sm text-muted-foreground mt-1'>
            This month: ₱{formatNumber(currentMonthTotal)}
          </div>
          <CardAction>
            <Badge
              variant={
                parseFloat(totalPercentChange) >= 0 ? 'outline' : 'destructive'
              }
            >
              {renderTrendIcon(totalPercentChange)}
              {totalPercentChange > 0 ? '+' : ''}
              {totalPercentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {totalPercentChange > 0 ? '+' : ''}
            {totalPercentChange}% from last month{' '}
            {renderTrendIcon(totalPercentChange)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
