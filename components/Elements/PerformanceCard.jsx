import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone, PhoneOff, Clock, CheckCircle2, Star } from "lucide-react"

const employees = [
  {
    name: "Diya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "E2965",
    callsAnswered: 150,
    callsMissed: 10,
    avgCallDuration: "4m 30s",
    resolutionRate: 95,
    satisfaction: 4.8,
  },
  {
    name: "Neha Chauhan",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "E3927",
    callsAnswered: 130,
    callsMissed: 15,
    avgCallDuration: "6m 15s",
    resolutionRate: 92,
    satisfaction: 4.7,
  },
  {
    name: "Aarav Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "E9363",
    callsAnswered: 100,
    callsMissed: 5,
    avgCallDuration: "8m 45s",
    resolutionRate: 88,
    satisfaction: 4.9,
  },
]

export default function PerformanceCard() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Top Performing Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <ul className="space-y-6">
            {employees.map((employee, index) => (
              <li key={index}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Answered</span>
                          </div>
                          <span className="text-sm font-medium">{employee.callsAnswered}</span>
                        </div>
                        <Progress value={(employee.callsAnswered / (employee.callsAnswered + employee.callsMissed)) * 100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PhoneOff className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Missed</span>
                          </div>
                          <span className="text-sm font-medium">{employee.callsMissed}</span>
                        </div>
                        <Progress value={(employee.callsMissed / (employee.callsAnswered + employee.callsMissed)) * 100} className="h-2" indicatorColor="bg-red-500" />
                      </div>
                      <div className="flex items-center justify-between col-span-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Avg. Duration</span>
                        </div>
                        <span className="text-sm font-medium">{employee.avgCallDuration}</span>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Resolution Rate</span>
                          </div>
                          <span className="text-sm font-medium">{employee.resolutionRate}%</span>
                        </div>
                        <Progress value={employee.resolutionRate} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between col-span-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Satisfaction</span>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {employee.satisfaction}
                          <Star className="h-3 w-3 fill-primary text-primary" />
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}