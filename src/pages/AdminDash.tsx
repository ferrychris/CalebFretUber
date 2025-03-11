import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanels,
  TabPanel,
  Metric,
  AreaChart,
  BadgeDelta,
  Flex,
  Select,
  SelectItem,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from "@tremor/react";
import { 
  ShoppingCartIcon, 
  TruckIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  HomeIcon,
  UsersIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

interface KpiData {
  title: string;
  metric: string;
  icon: any;
  delta: string;
  deltaType: "increase" | "decrease" | "moderateIncrease" | "moderateDecrease";
}

interface FreterData {
  id: string;
  firstName: string;
  lastName: string;
  vehicleType: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  completedDeliveries: number;
}

interface ShipmentData {
  id: string;
  pickup: {
    address: string;
  };
  delivery: {
    address: string;
  };
  status: 'pending' | 'accepted' | 'in-transit' | 'delivered';
  cargo: {
    description: string;
  };
}

interface ShoppingOrder {
  id: number;
  store: string;
  items: string[];
  total: number;
  status: 'pending' | 'transit' | 'delivered';
  deliveryTime: string;
  address: string;
  shopper?: string;
}

interface PerformanceData {
  date: string;
  orders: number;
  deliveries: number;
  revenue: number;
}

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const menuItems = [
    { icon: HomeIcon, text: "Dashboard", path: "/admin" },
    { icon: UsersIcon, text: "Users", path: "/admin/users" },
    { icon: TruckIcon, text: "Deliveries", path: "/admin/deliveries" },
    { icon: ShoppingCartIcon, text: "Orders", path: "/admin/orders" },
    { icon: UserGroupIcon, text: "Freters", path: "/admin/freters" },
    { icon: CogIcon, text: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 w-64 shadow-lg transform transition-transform duration-200 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin</h2>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminNav({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4 ml-auto">
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [freters, setFreters] = useState<FreterData[]>([]);
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [orders, setOrders] = useState<ShoppingOrder[]>([]);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState("7");

  useEffect(() => {
    fetchDashboardData();
    fetchPerformanceData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      // Fetch Freters
      const { data: fretersData, error: fretersError } = await supabase
        .from('freters')
        .select('*');
      
      if (fretersError) throw fretersError;
      setFreters(fretersData || []);

      // Fetch Shipments
      const { data: shipmentsData, error: shipmentsError } = await supabase
        .from('shipments')
        .select('*');
      
      if (shipmentsError) throw shipmentsError;
      setShipments(shipmentsData || []);

      // Fetch Shopping Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('shopping_orders')
        .select('*');
      
      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Update KPI Data
      const newKpiData: KpiData[] = [
        {
          title: "Active Freters",
          metric: fretersData?.filter(f => f.verificationStatus === 'verified').length.toString() || "0",
          icon: UserGroupIcon,
          delta: "+12.3%",
          deltaType: "increase",
        },
        {
          title: "Pending Shipments",
          metric: shipmentsData?.filter(s => s.status === 'pending').length.toString() || "0",
          icon: TruckIcon,
          delta: "+8.1%",
          deltaType: "increase",
        },
        {
          title: "Active Orders",
          metric: ordersData?.filter(o => o.status === 'transit').length.toString() || "0",
          icon: ShoppingCartIcon,
          delta: "+3.2%",
          deltaType: "moderateIncrease",
        },
        {
          title: "Total Revenue",
          metric: `$${calculateTotalRevenue(ordersData || [])}`,
          icon: ChartBarIcon,
          delta: "+15.2%",
          deltaType: "increase",
        },
      ];
      setKpiData(newKpiData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      // This would normally fetch from your database with proper date filtering
      // For now, we'll generate sample data
      const days = parseInt(timeRange);
      const data: PerformanceData[] = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return {
          date: date.toISOString().split('T')[0],
          orders: Math.floor(Math.random() * 50) + 20,
          deliveries: Math.floor(Math.random() * 40) + 15,
          revenue: Math.floor(Math.random() * 5000) + 1000,
        };
      });
      setPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const calculateTotalRevenue = (orders: ShoppingOrder[]) => {
    return orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'delivered':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'transit':
      case 'in-transit':
        return 'blue';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:ml-64">
        <AdminNav onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="p-6">
          <Title>Admin Dashboard</Title>
          <Text>Monitor and manage your platform's operations</Text>

          <TabGroup className="mt-6">
            <TabList>
              <Tab icon={ChartBarIcon}>Overview</Tab>
              <Tab icon={UserGroupIcon}>Freters</Tab>
              <Tab icon={ClipboardDocumentListIcon}>Orders</Tab>
              <Tab icon={CogIcon}>Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* KPI Cards */}
                <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
                  {kpiData.map((item) => (
                    <Card key={item.title}>
                      <Flex alignItems="start">
                        <div className="truncate">
                          <Text>{item.title}</Text>
                          <Metric className="truncate">{item.metric}</Metric>
                        </div>
                        <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
                      </Flex>
                      <item.icon className="h-12 w-12 text-gray-400 mt-4" />
                    </Card>
                  ))}
                </Grid>

                {/* Performance Chart */}
                <Card className="mt-6">
                  <div className="md:flex justify-between">
                    <div>
                      <Title>Performance Metrics</Title>
                      <Text>Track orders, deliveries, and revenue</Text>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                      </Select>
                    </div>
                  </div>
                  <AreaChart
                    className="h-72 mt-4"
                    data={performanceData}
                    index="date"
                    categories={["orders", "deliveries", "revenue"]}
                    colors={["blue", "green", "purple"]}
                  />
                </Card>

                {/* Recent Activities */}
                <Card className="mt-6">
                  <Title>Recent Activities</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Details</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Time</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...shipments, ...orders].slice(0, 5).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.cargo ? 'Shipment' : 'Order'}</TableCell>
                          <TableCell>
                            {item.cargo 
                              ? `${item.pickup.address} → ${item.delivery.address}`
                              : `${item.store}: ${item.items.join(', ')}`
                            }
                          </TableCell>
                          <TableCell>
                            <Badge color={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.deliveryTime || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabPanel>

              <TabPanel>
                {/* Freters Management */}
                <Card className="mt-6">
                  <Title>Freters Management</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Vehicle Type</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Deliveries</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {freters.map((freter) => (
                        <TableRow key={freter.id}>
                          <TableCell>{`${freter.firstName} ${freter.lastName}`}</TableCell>
                          <TableCell>{freter.vehicleType}</TableCell>
                          <TableCell>
                            <Badge color={getStatusColor(freter.verificationStatus)}>
                              {freter.verificationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{freter.completedDeliveries}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabPanel>

              <TabPanel>
                {/* Orders Management */}
                <Card className="mt-6">
                  <Title>Orders Management</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Order ID</TableHeaderCell>
                        <TableHeaderCell>Store</TableHeaderCell>
                        <TableHeaderCell>Items</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.store}</TableCell>
                          <TableCell>{order.items.join(', ')}</TableCell>
                          <TableCell>
                            <Badge color={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${order.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabPanel>

              <TabPanel>
                {/* Settings Panel */}
                <Card className="mt-6">
                  <Title>Admin Settings</Title>
                  <div className="mt-4 space-y-4">
                    <Text>Platform configuration and settings will go here</Text>
                  </div>
                </Card>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </div>
    </div>
  );
}