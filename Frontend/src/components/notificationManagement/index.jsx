import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, CheckCheck } from "lucide-react";

const NotificationManagement = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Đơn hàng mới",
      description: "Bàn 3 vừa đặt 4 món",
      time: "2 phút trước",
      isRead: false,
      isNew: true,
      category: "recent",
      icon: "clock",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      type: "service",
      title: "Yêu cầu phục vụ",
      description: "Bàn 5 cần hỗ trợ",
      time: "5 phút trước",
      isRead: false,
      isNew: true,
      category: "recent",
      icon: "users",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      id: 3,
      type: "ready",
      title: "Món đã sẵn sàng",
      description: "Phở bò tái - Bàn 2",
      time: "8 phút trước",
      isRead: true,
      isNew: false,
      category: "recent",
      icon: "check",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      type: "order",
      title: "Đơn hàng mới",
      description: "Bàn 1 vừa đặt 2 món",
      time: "2 giờ trước",
      isRead: true,
      isNew: false,
      category: "today",
      icon: "clock",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      id: 5,
      type: "payment",
      title: "Yêu cầu thanh toán",
      description: "Bàn 7 yêu cầu thanh toán",
      time: "5 giờ trước",
      isRead: true,
      isNew: false,
      category: "today",
      icon: "users",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      id: 6,
      type: "ready",
      title: "Món đã sẵn sàng",
      description: "Cơm gà xối mỡ - Bàn 4",
      time: "1 ngày trước",
      isRead: true,
      isNew: false,
      category: "yesterday",
      icon: "check",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const totalCount = notifications.length;

  const getIcon = (iconType) => {
    switch (iconType) {
      case "clock":
        return <Clock className="w-4 h-4" />;
      case "users":
        return <Users className="w-4 h-4" />;
      case "check":
        return <Check className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderNotifications = (category) => {
    return notifications
      .filter((n) => n.category === category)
      .map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-lg transition-all border cursor-pointer ${
            !notification.isRead
              ? "bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10"
              : "bg-card border-transparent hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center justify-center w-3 pt-1 shrink-0">
            {!notification.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            )}
          </div>
          <div
            className={`p-2 rounded-full shrink-0 ${notification.iconBg} ${notification.iconColor}`}
          >
            {getIcon(notification.icon)}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p
              className={`text-sm ${
                !notification.isRead
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {notification.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {notification.description}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {notification.time}
            </p>
          </div>
          {notification.isNew && (
            <div className="shrink-0 self-center">
              <Badge className="text-xs bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                Mới
              </Badge>
            </div>
          )}
        </div>
      ));
  };

  return (
    <main>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Thông báo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Quản lý tất cả thông báo của nhà hàng
            </p>
          </div>
          <Button variant="outline" className="gap-2 self-start">
            <CheckCheck className="w-4 h-4" />
            Đọc tất cả
          </Button>
        </div>

        <Tabs defaultValue="all" className="overflow-x-auto">
          <TabsList className="w-fit justify-start bg-gray-200">
            <TabsTrigger
              value="all"
              className="gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
            >
              Tất cả
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {totalCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
            >
              Chưa đọc
              <Badge
                variant="destructive"
                className="h-5 px-1.5 text-xs bg-red-500"
              >
                {unreadCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card className="rounded-lg border">
              <div className="p-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                      VỪA XONG
                    </p>
                    <div className="space-y-1">
                      {renderNotifications("recent")}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                      HÔM NAY
                    </p>
                    <div className="space-y-1">
                      {renderNotifications("today")}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                      HÔM QUA
                    </p>
                    <div className="space-y-1">
                      {renderNotifications("yesterday")}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card className="rounded-lg border">
              <div className="p-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                      VỪA XONG
                    </p>
                    <div className="space-y-1">
                      {notifications
                        .filter((n) => !n.isRead)
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start gap-3 p-4 rounded-lg transition-all border cursor-pointer bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10"
                          >
                            <div className="flex items-center justify-center w-3 pt-1 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                            </div>
                            <div
                              className={`p-2 rounded-full shrink-0 ${notification.iconBg} ${notification.iconColor}`}
                            >
                              {getIcon(notification.icon)}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="text-sm font-semibold text-foreground">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground/60">
                                {notification.time}
                              </p>
                            </div>
                            {notification.isNew && (
                              <div className="shrink-0 self-center">
                                <Badge className="text-xs bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                                  Mới
                                </Badge>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default NotificationManagement;
