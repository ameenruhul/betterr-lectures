
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  CreditCard, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PaymentHistoryPage = () => {
  // Mock data for invoices
  const invoices = [
    {
      id: "INV-001",
      date: "Oct 12, 2023",
      amount: "$19.99",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-002",
      date: "Sep 12, 2023",
      amount: "$19.99",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-003",
      date: "Aug 12, 2023",
      amount: "$19.99",
      status: "refunded",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-004",
      date: "Jul 12, 2023",
      amount: "$19.99",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-005",
      date: "Jun 12, 2023",
      amount: "$19.99",
      status: "failed",
      description: "Professional Plan - Monthly",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 hover:bg-green-100">
            <CheckCircle className="h-3 w-3" />
            Paid
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1 hover:bg-blue-100">
            <CreditCard className="h-3 w-3" />
            Refunded
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1 hover:bg-red-100">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            View and download your past invoices and payment receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left font-medium">Invoice</th>
                  <th className="h-12 px-4 text-left font-medium">Date</th>
                  <th className="h-12 px-4 text-left font-medium">Description</th>
                  <th className="h-12 px-4 text-left font-medium">Amount</th>
                  <th className="h-12 px-4 text-left font-medium">Status</th>
                  <th className="h-12 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="p-4 font-medium">{invoice.id}</td>
                    <td className="p-4">{invoice.date}</td>
                    <td className="p-4">{invoice.description}</td>
                    <td className="p-4">{invoice.amount}</td>
                    <td className="p-4">{getStatusBadge(invoice.status)}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1-5 of 12 invoices
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistoryPage;
