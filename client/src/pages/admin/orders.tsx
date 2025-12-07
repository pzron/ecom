import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, TrendingUp, Clock, CheckCircle, XCircle, Truck, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      } else {
        console.error("Failed to fetch orders:", res.status);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status });
        }
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || o.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o: any) => o.status === "pending").length,
    processing: orders.filter((o: any) => o.status === "processing").length,
    completed: orders.filter((o: any) => o.status === "completed" || o.status === "delivered").length,
    cancelled: orders.filter((o: any) => o.status === "cancelled").length,
    totalRevenue: orders.reduce((sum: number, o: any) => sum + (parseFloat(o.total) || 0), 0)
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      delivered: "bg-green-500/20 text-green-400 border-green-500/30",
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return styles[status] || styles.pending;
  };

  if (loading) return <div className="text-white text-center py-12">Loading...</div>;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Order Management</h1>
            <p className="text-white/60 mt-1">Track and manage all customer orders</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <Package className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Processing</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">{stats.processing}</p>
              </div>
              <Truck className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">৳{(stats.totalRevenue / 1000).toFixed(1)}K</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                filter === f 
                  ? "bg-purple-500 text-white" 
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardHeader className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Orders ({filteredOrders.length})</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input 
                      placeholder="Search orders..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 bg-black/20 border-white/10" 
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-white/5 text-xs uppercase text-white/60">
                    <tr>
                      <th className="px-6 py-3 text-left">Order</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Total</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-white/60">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order: any, i: number) => (
                        <motion.tr 
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`hover:bg-white/5 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? 'bg-purple-500/10' : ''}`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-white">{order.orderNumber}</p>
                              <p className="text-xs text-white/50">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white">{order.customerName || "Guest"}</p>
                              <p className="text-xs text-white/50">{order.customerEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-green-400 font-semibold">৳{parseFloat(order.total || 0).toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusBadge(order.status)}>
                              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                              className="text-purple-400 hover:bg-purple-500/10"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-md sticky top-24">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">
                  {selectedOrder ? `Order ${selectedOrder.orderNumber}` : "Select an Order"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 text-xs mb-1">Customer</p>
                      <p className="text-white font-medium">{selectedOrder.customerName || "Guest"}</p>
                      <p className="text-white/60 text-sm">{selectedOrder.customerEmail}</p>
                      {selectedOrder.customerPhone && (
                        <p className="text-white/60 text-sm">{selectedOrder.customerPhone}</p>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 text-xs mb-1">Shipping Address</p>
                      <p className="text-white text-sm">
                        {selectedOrder.shippingAddress || "N/A"}<br/>
                        {selectedOrder.shippingCity && `${selectedOrder.shippingCity}, `}
                        {selectedOrder.shippingCountry || ""}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 text-xs mb-1">Order Total</p>
                      <p className="text-2xl font-bold text-green-400">৳{parseFloat(selectedOrder.total || 0).toLocaleString()}</p>
                      <p className="text-white/40 text-xs mt-1">
                        Subtotal: ৳{parseFloat(selectedOrder.subtotal || 0).toLocaleString()} | 
                        Shipping: ৳{parseFloat(selectedOrder.shipping || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 text-xs mb-2">Update Status</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["pending", "processing", "shipped", "delivered", "cancelled"].map(status => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                              selectedOrder.status === status
                                ? "bg-purple-500 text-white"
                                : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-white/60 text-xs mb-1">Payment</p>
                      <p className="text-white font-medium capitalize">{selectedOrder.paymentMethod || "N/A"}</p>
                      <Badge className={selectedOrder.paymentStatus === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {selectedOrder.paymentStatus || "pending"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 mx-auto mb-3 text-white/20" />
                    <p className="text-white/40">Select an order to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
