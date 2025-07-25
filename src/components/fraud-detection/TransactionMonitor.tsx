
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  merchant: string;
  location: string;
  riskScore: number;
  status: 'approved' | 'flagged' | 'blocked';
  paymentMethod: string;
  userId: string;
}

export const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Generate mock transactions
  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const merchants = ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Starbucks', 'Gas Station', 'ATM Withdrawal'];
      const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'];
      const paymentMethods = ['Credit Card', 'Debit Card', 'Mobile Payment', 'Bank Transfer'];
      
      const amount = Math.random() * 2000 + 10;
      const riskScore = Math.random() * 100;
      
      let status: 'approved' | 'flagged' | 'blocked';
      if (riskScore > 80) status = 'blocked';
      else if (riskScore > 60) status = 'flagged';
      else status = 'approved';

      return {
        id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        amount: Math.round(amount * 100) / 100,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        riskScore: Math.round(riskScore),
        status,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        userId: `USER-${Math.random().toString(36).substr(2, 6)}`
      };
    };

    // Generate initial transactions
    const initialTransactions = Array.from({ length: 10 }, generateTransaction);
    setTransactions(initialTransactions);

    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]); // Keep last 20
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'flagged': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'flagged': return <Badge className="bg-yellow-100 text-yellow-800">Flagged</Badge>;
      case 'blocked': return <Badge className="bg-red-100 text-red-800">Blocked</Badge>;
      default: return null;
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 80) return 'text-red-600 font-bold';
    if (score > 60) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Transaction Monitoring</CardTitle>
          <CardDescription>
            Live feed of transactions with ML-based risk scoring and fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Live Transactions</h3>
              <div className="flex gap-2">
                <Badge variant="outline">{transactions.length} Total</Badge>
                <Badge className="bg-red-100 text-red-800">
                  {transactions.filter(t => t.status === 'blocked').length} Blocked
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {transactions.filter(t => t.status === 'flagged').length} Flagged
                </Badge>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">
                        {transaction.id.split('-')[1]}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>{transaction.location}</TableCell>
                      <TableCell className={getRiskColor(transaction.riskScore)}>
                        {transaction.riskScore}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          {getStatusBadge(transaction.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Detailed analysis for transaction {selectedTransaction.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Transaction Info</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>ID:</strong> {selectedTransaction.id}</div>
                  <div><strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}</div>
                  <div><strong>Merchant:</strong> {selectedTransaction.merchant}</div>
                  <div><strong>Payment Method:</strong> {selectedTransaction.paymentMethod}</div>
                  <div><strong>User ID:</strong> {selectedTransaction.userId}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Risk Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Risk Score:</strong> <span className={getRiskColor(selectedTransaction.riskScore)}>{selectedTransaction.riskScore}%</span></div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedTransaction.status)}</div>
                  <div><strong>Location:</strong> {selectedTransaction.location}</div>
                  <div><strong>Timestamp:</strong> {new Date(selectedTransaction.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={() => setSelectedTransaction(null)}>Close</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
