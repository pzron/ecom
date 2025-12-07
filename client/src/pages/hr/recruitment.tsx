import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Users, Clock, CheckCircle2, XCircle,
  Calendar, MapPin, DollarSign, Plus, Eye, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const openPositions = [
  { id: 1, title: "Senior Sales Associate", department: "Sales", location: "Dhaka", type: "Full-time", salary: "৳45,000 - ৳55,000", applicants: 24, status: "open", postedDate: "Nov 15, 2024" },
  { id: 2, title: "Marketing Manager", department: "Marketing", location: "Dhaka", type: "Full-time", salary: "৳80,000 - ৳100,000", applicants: 18, status: "open", postedDate: "Nov 20, 2024" },
  { id: 3, title: "Customer Service Representative", department: "Customer Service", location: "Chittagong", type: "Full-time", salary: "৳25,000 - ৳35,000", applicants: 45, status: "open", postedDate: "Nov 22, 2024" },
  { id: 4, title: "Stock Keeper", department: "Operations", location: "Sylhet", type: "Full-time", salary: "৳30,000 - ৳40,000", applicants: 12, status: "open", postedDate: "Nov 25, 2024" },
  { id: 5, title: "Graphic Designer", department: "Marketing", location: "Remote", type: "Part-time", salary: "৳35,000 - ৳45,000", applicants: 32, status: "open", postedDate: "Nov 28, 2024" },
  { id: 6, title: "IT Support Specialist", department: "IT", location: "Dhaka", type: "Full-time", salary: "৳40,000 - ৳50,000", applicants: 8, status: "closed", postedDate: "Oct 15, 2024" },
];

const recentApplicants = [
  { id: 1, name: "Ahmed Rahman", position: "Senior Sales Associate", appliedDate: "Dec 3, 2024", status: "screening", experience: "5 years" },
  { id: 2, name: "Fatima Khan", position: "Marketing Manager", appliedDate: "Dec 2, 2024", status: "interview", experience: "7 years" },
  { id: 3, name: "Rafiq Islam", position: "Customer Service Rep", appliedDate: "Dec 2, 2024", status: "new", experience: "2 years" },
  { id: 4, name: "Marium Begum", position: "Graphic Designer", appliedDate: "Dec 1, 2024", status: "screening", experience: "4 years" },
  { id: 5, name: "Kamal Hossain", position: "Stock Keeper", appliedDate: "Nov 30, 2024", status: "offer", experience: "3 years" },
];

const pipelineStats = [
  { stage: "New Applications", count: 28, color: "blue" },
  { stage: "Screening", count: 15, color: "orange" },
  { stage: "Interview", count: 8, color: "purple" },
  { stage: "Offer Stage", count: 3, color: "green" },
];

export default function HRRecruitment() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: "bg-blue-500/20 text-blue-400",
      screening: "bg-orange-500/20 text-orange-400",
      interview: "bg-purple-500/20 text-purple-400",
      offer: "bg-green-500/20 text-green-400",
      rejected: "bg-red-500/20 text-red-400",
    };
    return styles[status] || "bg-white/10 text-white";
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Recruitment</h1>
            <p className="text-white/60">Manage job postings and applicants</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStats.map((stat, index) => (
            <motion.div
              key={stat.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{stat.stage}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.count}</p>
                    </div>
                    <div className={`w-3 h-12 rounded-full bg-${stat.color}-500/30`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">Open Positions</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {openPositions.filter(p => p.status === 'open').slice(0, 4).map((position) => (
                  <div key={position.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-white">{position.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {position.salary}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">{position.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {position.applicants} applicants
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Posted {position.postedDate}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 border-white/10">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="h-7 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                          Review
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Recent Applicants</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentApplicants.map((applicant) => (
                  <div key={applicant.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{applicant.name}</p>
                        <p className="text-xs text-white/60 truncate">{applicant.position}</p>
                      </div>
                      <Badge className={getStatusBadge(applicant.status)}>
                        {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-white/40">
                      <span>{applicant.experience} exp</span>
                      <span>{applicant.appliedDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
