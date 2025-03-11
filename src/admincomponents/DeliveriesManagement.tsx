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
  Button,
  Select,
  SelectItem,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import { 
  MapPinIcon,
  UserIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import supabase  from '../utils/supabase';

interface Delivery {
  id: string;
  freter: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  pickup: {
    address: string;
    lat: number;
    lng: number;
    time: string;
  };
  delivery: {
    address: string;
    lat: number;
    lng: number;
    time: string;
  };
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  type: 'shopping' | 'shipment';
  orderId: string;
  createdAt: string;
  estimatedTime: number; // in minutes
  distance: number; // in kilometers
  price: number;
}

export default function DeliveriesManagement() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  useEffect(() => {
    fetchDeliveries();
  }, [statusFilter, typeFilter, dateRange]);

  const fetchDeliveries = async () => {
    try {
      let query = supabase
        .from('deliveries')
        .select(`
          *,
          freter (
            id,
            firstName,
            lastName,
            phone
          )
        `)
        .order('createdAt', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (typeFilter !== 'all') {
        query = query.eq('type', typeFilter);
      }
      if (dateRange.from && dateRange.to) {
        query = query
          .gte('createdAt', dateRange.from.toISOString())
          .lte('createdAt', dateRange.to.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      setDeliveries(data || []);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .update({ status: newStatus })
        .eq('id', deliveryId);

      if (error) throw error;
      fetchDeliveries();
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'pending': return 'yellow';
      case 'assigned': return 'blue';
      case 'picked_up': return 'purple';
      case 'in_transit': return 'blue';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <div>
          <Title>Deliveries Management</Title>
          <Text>Track and manage all deliveries</Text>
        </div>
        <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
            className="max-w-md"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="shipment">Shipment</SelectItem>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </Select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID & Type</TableHeaderCell>
            <TableHeaderCell>Freter</TableHeaderCell>
            <TableHeaderCell>Locations</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Time & Distance</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">#{delivery.id}</div>
                  <Badge color={delivery.type === 'shopping' ? 'purple' : 'blue'}>
                    {delivery.type}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <div className="text-sm">
                    <div>{`${delivery.freter.firstName} ${delivery.freter.lastName}`}</div>
                    <div className="text-gray-500">{delivery.freter.phone}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm space-y-2">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4 text-green-500" />
                    <span className="truncate max-w-xs">{delivery.pickup.address}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4 text-red-500" />
                    <span className="truncate max-w-xs">{delivery.delivery.address}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(delivery.status)}>
                  {delivery.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>Est: {formatDuration(delivery.estimatedTime)}</div>
                  <div className="text-gray-500">{delivery.distance.toFixed(1)} km</div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(delivery.price)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={EyeIcon}
                    tooltip="View Details"
                  />
                  {delivery.status === 'in_transit' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="green"
                      icon={CheckCircleIcon}
                      onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                      tooltip="Mark Delivered"
                    />
                  )}
                  {['pending', 'assigned', 'in_transit'].includes(delivery.status) && (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="red"
                      icon={ExclamationTriangleIcon}
                      onClick={() => updateDeliveryStatus(delivery.id, 'failed')}
                      tooltip="Mark Failed"
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