import { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Select,
  SelectItem,
  DateRangePicker,
  DateRangePickerValue,
  Button,
} from "@tremor/react";
import { 
  ShoppingCartIcon, 
  EyeIcon,
  TruckIcon,
  CheckCircleIcon 
} from "@heroicons/react/24/outline";
import supabase from '../utils/supabase';
interface Order {
  id: number;
  store: string;
  items: string[];
  total: number;
  status: 'pending' | 'transit' | 'delivered';
  deliveryTime: string;
  address: string;
  shopper?: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, dateRange]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('shopping_orders')
        .select('*')
        .order('createdAt', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (dateRange.from && dateRange.to) {
        query = query
          .gte('createdAt', dateRange.from.toISOString())
          .lte('createdAt', dateRange.to.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('shopping_orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'pending': return 'yellow';
      case 'transit': return 'blue';
      default: return 'gray';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <div>
          <Title>Orders Management</Title>
          <Text>Track and manage customer orders</Text>
        </div>
        <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
            className="max-w-md mx-auto"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </Select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Store & Items</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{order.customerName}</div>
                  <div className="text-gray-500">{order.customerPhone}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{order.store}</div>
                  <div className="text-gray-500 truncate max-w-xs">
                    {order.items.join(', ')}
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>
                <Badge color={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={EyeIcon}
                    tooltip="View Details"
                  />
                  {order.status === 'pending' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="blue"
                      icon={TruckIcon}
                      onClick={() => updateOrderStatus(order.id, 'transit')}
                      tooltip="Mark In Transit"
                    />
                  )}
                  {order.status === 'transit' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="green"
                      icon={CheckCircleIcon}
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      tooltip="Mark Delivered"
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}