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
} from "@tremor/react";
import {
  UserIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import supabase  from '../utils/supabase';

interface Freter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  completedDeliveries: number;
}

export default function FretersManagement() {
  const [freters, setFreters] = useState<Freter[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchFreters();
  }, [statusFilter]);

  const fetchFreters = async () => {
    try {
      let query = supabase
        .from('freters')
        .select('*')
        .order('createdAt', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('verificationStatus', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setFreters(data || []);
    } catch (error) {
      console.error('Error fetching freters:', error);
    }
  };

  const updateFreterStatus = async (freterId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('freters')
        .update({ verificationStatus: newStatus })
        .eq('id', freterId);

      if (error) throw error;
      fetchFreters();
    } catch (error) {
      console.error('Error updating freter status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'green';
      case 'pending': return 'yellow';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <div>
          <Title>Freters Management</Title>
          <Text>Manage and verify freter accounts</Text>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </Select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Freter</TableHeaderCell>
            <TableHeaderCell>Contact</TableHeaderCell>
            <TableHeaderCell>Vehicle Type</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Deliveries</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {freters.map((freter) => (
            <TableRow key={freter.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <div className="text-sm">
                    <div className="font-medium">{`${freter.firstName} ${freter.lastName}`}</div>
                    <div className="text-gray-500">{freter.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{freter.email}</div>
                  <div className="text-gray-500">{freter.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge color="blue">
                  {freter.vehicleType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(freter.verificationStatus)}>
                  {freter.verificationStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">
                  {freter.completedDeliveries} deliveries
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {freter.verificationStatus === 'pending' && (
                    <>
                      <Button
                        size="xs"
                        variant="secondary"
                        color="green"
                        icon={CheckCircleIcon}
                        onClick={() => updateFreterStatus(freter.id, 'verified')}
                        tooltip="Verify Freter"
                      />
                      <Button
                        size="xs"
                        variant="secondary"
                        color="red"
                        icon={XMarkIcon}
                        onClick={() => updateFreterStatus(freter.id, 'rejected')}
                        tooltip="Reject Freter"
                      />
                    </>
                  )}
                  {freter.verificationStatus === 'rejected' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="yellow"
                      icon={ExclamationTriangleIcon}
                      onClick={() => updateFreterStatus(freter.id, 'pending')}
                      tooltip="Move to Pending"
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