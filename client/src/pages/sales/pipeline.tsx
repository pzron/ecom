import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, DollarSign, Plus, ArrowRight,
  Building, Calendar, User, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

const pipelineStages = [
  {
    name: "Lead",
    color: "blue",
    deals: [
      { id: 1, name: "New Enterprise Deal", company: "TechVentures Inc.", value: "৳250,000", owner: "Ahmed", daysInStage: 2 },
      { id: 2, name: "Cloud Migration Project", company: "Digital Dynamics", value: "৳180,000", owner: "Fatima", daysInStage: 5 },
      { id: 3, name: "IoT Solution Package", company: "Smart Systems BD", value: "৳320,000", owner: "Rafiq", daysInStage: 1 },
    ]
  },
  {
    name: "Qualified",
    color: "cyan",
    deals: [
      { id: 4, name: "Bulk Hardware Order", company: "MegaRetail Inc.", value: "৳420,000", owner: "Marium", daysInStage: 8 },
      { id: 5, name: "Annual Support Contract", company: "E-Commerce Plus", value: "৳95,000", owner: "Ahmed", daysInStage: 3 },
    ]
  },
  {
    name: "Proposal",
    color: "purple",
    deals: [
      { id: 6, name: "Data Center Upgrade", company: "Cloud Solutions Ltd.", value: "৳550,000", owner: "Fatima", daysInStage: 12 },
      { id: 7, name: "Security Suite Package", company: "FinTech Corp", value: "৳185,000", owner: "Rafiq", daysInStage: 6 },
      { id: 8, name: "Network Infrastructure", company: "StartUp Hub BD", value: "৳280,000", owner: "Marium", daysInStage: 4 },
    ]
  },
  {
    name: "Negotiation",
    color: "orange",
    deals: [
      { id: 9, name: "Enterprise License Deal", company: "Innovation Labs", value: "৳620,000", owner: "Ahmed", daysInStage: 15 },
      { id: 10, name: "Premium Support Package", company: "Tech Solutions BD", value: "৳145,000", owner: "Fatima", daysInStage: 7 },
    ]
  },
  {
    name: "Closed Won",
    color: "green",
    deals: [
      { id: 11, name: "Software Bundle Deal", company: "Digital First", value: "৳125,000", owner: "Rafiq", daysInStage: 0 },
      { id: 12, name: "Hardware Refresh", company: "Retail Max", value: "৳72,000", owner: "Marium", daysInStage: 0 },
    ]
  }
];

export default function SalesPipeline() {
  const getColorClasses = (color: string) => {
    const classes: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400" },
      cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400" },
      purple: { bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-400" },
      orange: { bg: "bg-orange-500/20", border: "border-orange-500/30", text: "text-orange-400" },
      green: { bg: "bg-green-500/20", border: "border-green-500/30", text: "text-green-400" },
    };
    return classes[color] || classes.blue;
  };

  const calculateStageValue = (deals: typeof pipelineStages[0]['deals']) => {
    return deals.reduce((sum, deal) => {
      const value = parseInt(deal.value.replace(/[৳,]/g, ''));
      return sum + value;
    }, 0);
  };

  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + calculateStageValue(stage.deals), 0);

  return (
    <DashboardLayout role="sales">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Sales Pipeline</h1>
            <p className="text-white/60">Visual overview of your sales opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5">
              <Target className="w-4 h-4 mr-2" />
              Pipeline: ৳{(totalPipelineValue / 1000000).toFixed(2)}M
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-cyan-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage, stageIndex) => {
            const colors = getColorClasses(stage.color);
            const stageValue = calculateStageValue(stage.deals);
            
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stageIndex * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <Card className={`bg-white/5 border-white/10 ${colors.border} border-t-2`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className={`text-base ${colors.text}`}>{stage.name}</CardTitle>
                        <Badge className="bg-white/10 text-white">{stage.deals.length}</Badge>
                      </div>
                      <span className="text-sm font-medium text-white">৳{(stageValue / 1000).toFixed(0)}K</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stage.deals.map((deal) => (
                      <div 
                        key={deal.id} 
                        className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">{deal.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-white/60 mt-1">
                              <Building className="w-3 h-3" />
                              <span className="truncate">{deal.company}</span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-6 w-6 p-0 border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-400">{deal.value}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                              {deal.owner[0]}
                            </div>
                            <span className="text-xs text-white/40">{deal.daysInStage}d</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full h-8 border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Deal
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <CardTitle className="text-white">Pipeline Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => {
                  const colors = getColorClasses(stage.color);
                  const stageValue = calculateStageValue(stage.deals);
                  const percentage = (stageValue / totalPipelineValue) * 100;
                  
                  return (
                    <div key={stage.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className={colors.text}>{stage.name}</span>
                          <span className="text-white/40">{stage.deals.length} deals</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white">৳{(stageValue / 1000).toFixed(0)}K</span>
                          <span className="text-white/40 w-12 text-right">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${colors.bg} rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white font-medium">Total Pipeline Value</span>
                <span className="text-xl font-bold text-green-400">৳{(totalPipelineValue / 1000000).toFixed(2)}M</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
