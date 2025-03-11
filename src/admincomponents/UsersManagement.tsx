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
  TextInput,
  Select,
  SelectItem,
} from "@tremor/react";
import {
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import supabase  from '../utils/supabase';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'freter';
  status: 'active' | 'suspended';
  createdAt: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      let query = supabase
        .from('users')
        .select('*')
        .order('createdAt', { ascending: false });

      if (searchQuery) {
        query = query.or(`firstName.ilike.%${searchQuery}%,lastName.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }
      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: 'active' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'red';
      case 'freter': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <div>
          <Title>Users Management</Title>
          <Text>Manage user accounts and permissions</Text>
        </div>
        <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="freter">Freter</SelectItem>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </Select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <div className="text-sm">
                    <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="text-gray-500">{user.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge color={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={user.status === 'active' ? 'green' : 'red'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {user.status === 'active' ? (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="red"
                      icon={XMarkIcon}
                      onClick={() => updateUserStatus(user.id, 'suspended')}
                      tooltip="Suspend User"
                    />
                  ) : (
                    <Button
                      size="xs"
                      variant="secondary"
                      color="green"
                      icon={CheckCircleIcon}
                      onClick={() => updateUserStatus(user.id, 'active')}
                      tooltip="Activate User"
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