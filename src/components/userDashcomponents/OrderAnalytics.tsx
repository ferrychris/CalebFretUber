import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface OrderAnalyticsProps {
  orders: Order[];
}

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ orders }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Process orders data for charts
        const monthlyOrders = Array(6).fill(0);
        const today = new Date();
        
        orders.forEach(order => {
          const orderDate = new Date(order.date);
          const monthDiff = today.getMonth() - orderDate.getMonth() + 
            (today.getFullYear() - orderDate.getFullYear()) * 12;
          if (monthDiff >= 0 && monthDiff < 6) {
            monthlyOrders[5 - monthDiff]++;
          }
        });

        const statusCount = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const destinationCount = orders.reduce((acc, order) => {
          acc[order.destination] = (acc[order.destination] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topDestinations = Object.entries(destinationCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 4);

        setAnalytics({
          monthlyOrders,
          statusCount,
          topDestinations
        });
      } catch (error) {
        console.error('Error processing analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [orders]);

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunset"></div>
      </div>
    );
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(-6);
  
  const orderTrendsData = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: analytics.monthlyOrders,
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const orderStatusData = {
    labels: Object.keys(analytics.statusCount),
    datasets: [
      {
        data: Object.values(analytics.statusCount),
        backgroundColor: [
          '#4CAF50',  // active
          '#FF6B6B',  // in-transit
          '#9C27B0',  // completed
        ],
      },
    ],
  };

  const popularDestinationsData = {
    labels: analytics.topDestinations.map(([dest]) => dest),
    datasets: [
      {
        data: analytics.topDestinations.map(([,count]) => count),
        backgroundColor: [
          '#FF6B6B',
          '#4CAF50',
          '#9C27B0',
          '#2196F3',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <motion.div
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Order Analytics</h1>
        <Link 
          to="/dashboard/place-order"
          className="px-3 py-1.5 bg-sunset hover:bg-sunset-light text-white rounded-lg 
                   flex items-center gap-2 transition-colors duration-300 text-sm"
        >
          <FaPlus className="text-sm" />
          <span>New Order</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Order Trends Chart */}
        <motion.div
          className="bg-midnight-800 rounded-lg p-4 border border-stone-600/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-base font-semibold text-white mb-3">Order Trends</h3>
          <div className="h-72">
            <Line data={orderTrendsData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          className="bg-midnight-800 rounded-lg p-4 border border-stone-600/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-base font-semibold text-white mb-3">Order Status</h3>
          <div className="h-72">
            <Doughnut data={orderStatusData} options={doughnutOptions} />
          </div>
        </motion.div>

        {/* Popular Destinations */}
        <motion.div
          className="bg-midnight-800 rounded-lg p-4 border border-stone-600/10 lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-base font-semibold text-white mb-3">Popular Destinations</h3>
          <div className="h-72">
            <Bar 
              data={popularDestinationsData}
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderAnalytics;